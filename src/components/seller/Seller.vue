<template>
  <div class="seller" ref="seller">
    <div>
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc">
          <star class="star" :size="15" :score="seller.score"></star>
          <span class="text">{{seller.ratingCount}}人评论</span>
          <span class="text">月售{{seller.sellCount}}份</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite">
          <span class="iconfont icon-xin-" @click="collect" :class="{'active': favorite}"></span>
          <span class="text">{{collection}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <div class="title">公告与活动</div>
        <div class="content">{{seller.bulletin}}</div>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li class="pic-item" v-for="(pic, index) in seller.pics" :key="index">
              <img :src="pic" alt="" width="120px" height="90px">
            </li>
          </ul>
        </div>
      </div>
      <split></split>
      <div class="info">
        <div class="title">商家信息</div>
        <ul>
          <li class="info-item" v-for="(info, index) in seller.infos" :key="index">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import star from '../star/Star.vue'
import split from '../split/Split.vue'
import Bscroll from 'better-scroll'
import {setToLocal, getFromLocal} from '@/utils/storage.js'
export default {
  props: {
    seller: Object
  },
  components: {
    star,
    split
  },
  data () {
    return {
      favorite: (() => {
        return getFromLocal(123, 'favorite', false)
      })()
    }
  },
  computed: {
    collection () {
      return this.favorite ? '收藏' : '未收藏'
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.seller, {
        click: true
      })
      if (this.seller.pics) {
        this._initPicScroll()
      }
    })
  },
  watch: {
    seller: '_initPicScroll'
  },
  methods: {
    _initPicScroll () {
      let width = 126 * this.seller.pics.length
      this.$refs.picList.style.width = width + 'px'
      this.$nextTick(() => {
        this.picScroll = new Bscroll(this.$refs.picWrapper, {
          scrollX: true,
          eventPassthrough: 'vertical'
        })
      })
    },
    collect () {
      this.favorite = !this.favorite
      setToLocal(123, 'favorite', this.favorite)
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/stylus/mixin.styl'

  .seller
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      position relative
      padding 18px
      .title
        margin-bottom 8px
        line-height 14px
        color rgb(7,17,27)
        font-size 14px
      .desc
        padding-bottom 18px
        line-height 18px
        border-1px(rgba(7,17,27,0.1))
        font-size 0
        .star
          display inline-block
          vertical-align top
          margin-right 12px
        .text
          margin-right 12px
          display inline-block
          vertical-align top
          font-size 12px
          color rgb(77,85,93)
      .remark
        display flex
        padding-top 18px
        margin-bottom 18px
        .block
          flex 1
          text-align center
          border-right 1px solid rgba(7,17,27,0.1)
          &:last-child
            border none
          h2
            margin-bottom 4px
            line-height 10px
            font-size 12px
          .content
            line-height 24px
            color rgb(7,17,27)
            font-size 12px
            .stress
              font-size 24px
      .favorite
        position absolute
        width 36px
        top 18px
        right 18px
        text-align center
        .iconfont
          display block
          margin-bottom 4px
          &.active
            color red
        .text
          font-size 12px
    .bulletin
      padding 18px 18px 0 18px
      border-1px(rgba(7,17,27,0.1))
      .title
        margin-bottom 8px
        line-height 14px
        color rgb(7,17,27)
        font-size 14px
      .content
        padding 0 12px 16px 12px
        font-size 12px
        line-height 24px
        color rgb(240,20,20)
    .pics
      padding 18px
      .title
        margin-bottom 8px
        line-height 14px
        color rgb(7,17,27)
        font-size 14px
        margin-bottom 12px
      .pic-wrapper
        width 100%
        overflow hidden
        white-space nowrap
        .pic-list
          font-size 0
          .pic-item
            display inline-block
            margin-right 6px
            width 120px
            height 90px
            &:last-child
              margin 0
    .info
      padding 18px 18px 0 18px
      color rgb(7,17,27)
      .title
        padding-bottom 8px
        line-height 14px
        color rgb(7,17,27)
        font-size 14px
        border-1px(rgba(7,17,27,0.1))
      .info-item
        padding 16px 12px
        line-height 16px
        border-1px(rgba(7,17,27,0.1))
        font-size 12px
</style>
