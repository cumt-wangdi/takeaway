<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="头像" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classmap[seller.supports[0].type]"></span>
          <span class="description">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="detailShow = true">
        <span class="count">{{seller.supports.length}}个</span>
        <span class="iconfont right-arrow">&#xe65e;</span>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="iconfont right-arrow">&#xe65e;</span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail">
      <div class="detail-wrapper clearfix"></div>
        <div class="detail-main">
          <p>{{seller.bulletin}}</p>
        </div>
        <div class="detail-close"  @click="detailShow = false">
          <span class="iconfont icon-close">&#xe624;</span>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      classmap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      detailShow: false,
      seller: {}
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('../../../static/seller.json').then((res) => {
        if (res.status === 200) {
          const data = res.data
          this.seller = data.seller
        }
      })
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/stylus/mixin.styl'
  .header
    position relative
    overflow hidden
    color #ffffff
    background rgba(7,17,27,0.5)
    .content-wrapper
      padding 24px 12px 18px 24px
      font-size 0
      .avatar
        display inline-block
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        font-size 14px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .supports
          .icon
            vertical-align middle
            display inline-block
            width 12px
            height 12px
            margin-right 4px
            background-size 12px 12px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .description
            line-height 12px
            font-size 10px
      .support-count
        position absolute
        right 12px
        bottom 18px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background rgba(0,0,0,0.2)
        text-align center
        font-size 10px
        margin-bottom 22px
        .right-arrow
          font-size 10px
    .bulletin-wrapper
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space nowrap
      overflow hidden
      background-color rgba(7,17,27,0.2)
      text-overflow ellipsis
      .bulletin-title
        display inline-block
        width 22px
        height 12px
        vertical-align middle
        bg-image('bulletin')
        background-size 22px 12px
        background-repeat no-repeat
      .bulletin-text
        font-size 10px
    .background
      position absolute
      width 100%
      height 100%
      top 0px
      left 0px
      z-index -1
      filter blur(10px)
    .detail
      position fixed
      z-index 100
      width 100%
      height 100%
      overflow auto
      background rgba(7,17,27,0.8)
      top 0px
      left 0px
      .detail-wrapper
        min-height 100%
        &.after
          content " "
          display block
          clear both
        .detail-main
          margin-top 64px
          padding-bottom 64px
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
</style>
