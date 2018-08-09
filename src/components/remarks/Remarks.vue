<template>
  <div class="remark" ref="remark">
    <div class="remark-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size="13" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star class="star" :size="13" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select  :only-content="onlyContent"
                      :select-type="selectType"
                      :ratings="ratings"
                      @changeType="changeType"
                      @changeOnlyContent="changeOnlyContent"
                      ></rating-select>
      <div class="rating-wrapper" >
        <ul>
          <li class="rating-item"
              v-for="(rating,index) in ratings"
              :key="index"
              v-show="isShow (rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28px" height="28px">
            </div>
            <div class="content">
              <div class="time">{{rating.rateTime | parseTime}}</div>
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="10" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend">
                <span class="iconfont icon-zan" v-show="rating.recommend && rating.recommend.length > 0" style="color:#00a0dc"></span>
                <span class="item" v-for="(recommend, index) in rating.recommend" :key="index">{{recommend}}</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="no-rating" v-show="!ratings || ratings.length === 0">暂无评价</div>
      </div>
    </div>
  </div>
</template>
<script>
import star from '../star/Star.vue'
import split from '../split/Split.vue'
import ratingSelect from '../ratingSelect/RatingSelect.vue'
import Bscroll from 'better-scroll'
export default {
  props: {
    ratings: Array,
    seller: Object
  },
  components: {
    star,
    split,
    ratingSelect
  },
  data () {
    return {
      onlyContent: true,
      selectType: 2
    }
  },
  methods: {
    changeType (type) {
      this.selectType = type
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    changeOnlyContent (content) {
      this.onlyContent = content
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    },
    isShow (type, text) {
      if (this.onlyContent && !text) {
        return false
      }
      if (this.selectType === 2) {
        return true
      } else {
        return this.selectType === type
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new Bscroll(this.$refs.remark, {
        click: true
      })
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/stylus/mixin.styl'
  .remark
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        padding 6px 0
        flex 0 0 137px
        width 137px
        border-right 1px solid rgba(7,17,27,0.1)
        text-align center
        .score
          line-height 28px
          font-size 24px
          color rgb(255,153,0)
        .title
          line-height 12px
          margin-bottom 8px
          font-size 12px
          color rgb(7,17,27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147,153,159)
      .overview-right
        flex 1
        padding 0 12px
        .score-wrapper
          margin-bottom 8px
          line-height 18px
          font-size 0
          .title
            display inline-block
            vertical-align top
            font-size 12px
            color rgb(7,17,27)
          .star
            display inline-block
            vertical-align top
            margin 0 12px
          .score
            display inline-block
            vertical-align top
            font-size 12px
            color rgb(255,153,0)
        .delivery-wrapper
          .title
            display inline-block
            vertical-align top
            font-size 12px
            color rgb(7,17,27)
          .deliveryTime
            display inline-block
            vertical-align top
            font-size 12px
            color rgb(147,153,159)
            margin 0 12px
    .rating-wrapper
      .rating-item
        display flex
        padding 18px
        border-1px(rgba(7,17,27,0.1))
        .avatar
          flex 0 0 18px
          width 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          position relative
          flex 1
          .time
            position absolute
            top 0px
            right 0px
            font-size 10px
            line-height 12px
          .name
            margin-bottom 4px
            line-height 12px
            font-size 10px
            color rgb(7,17,27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              margin-right 6px
              vertical-align top
            .delivery
              display inline-block
              vertical-align top
              line-height 12px
              font-size 10px
              color rgb(147,153,159)
          .text
            line-height 18px
            color rgb(7,17,27)
            font-size 12px
            margin-bottom 8px
          .recommend
            line-height 16px
            .item
              display inline-block
              margin 0 8px 4px 0
              font-size 9px
              padding 0 6px
              border 1px solid rgb(147,153,159)
              border-radius 1px
              color rgb(147,153,159)
              background #ffffff
</style>
