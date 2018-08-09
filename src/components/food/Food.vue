<template>
  <transition name="fade">
    <div class="food" v-if="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image" class="food-image">
          <div class="back" @click="handleBack">
            <span class="iconfont icon-back">&#xe6bc;</span>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span>
            <span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}元</span>
            <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}元</span>
          </div>
          <div class="cartcontrol-wrapper" v-show="food.count && food.count > 0">
            <cart-control :food="food"></cart-control>
          </div>
          <transition name="buy-fade">
            <div class="buy" @click.stop="addFirst" v-show="!food.count || food.count <= 0">加入购物车</div>
          </transition>
        </div>
        <split v-show="food.info"></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{food.info}}</p>
        </div>
        <split></split>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <rating-select :only-content="onlyContent"
                  :select-type="selectType"
                  :ratings="food.ratings"
                  @changeType="changeType"
                  @changeOnlyContent="changeOnlyContent"
                  ></rating-select>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="isShow(rating.rateType, rating.text)"
                  v-for="(rating, index) in food.ratings"
                  :key="index" class="rating-item">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img :src="rating.avatar " class="avatar" width="12px" height="12px">
                </div>
                <div class="time">{{rating.rateTime | parseTime}}</div>
                <p class="text">
                  <span :class="{'iconfont icon-zan zanicon': rating.rateType === 0 , 'iconfont icon-zan1': rating.rateType === 1}"></span>
                  <span>{{rating.text}}</span>
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || food.ratings.length === 0">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
import Bscroll from 'better-scroll'
import cartControl from '../cartControl/cart-control.vue'
import split from '../split/Split.vue'
import ratingSelect from '../ratingSelect/RatingSelect.vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  components: {
    cartControl,
    split,
    ratingSelect
  },
  data () {
    return {
      showFlag: false,
      onlyContent: false,
      selectType: 0,
      desc: {
        all: '',
        positive: '',
        negative: ''
      }
    }
  },
  methods: {
    show () {
      this.showFlag = true
      this.onlyContent = false
      this.selectType = 2
      this.$nextTick(() => {
        this.scroll = new Bscroll(this.$refs.food, {
          click: true
        })
      })
    },
    handleBack () {
      this.showFlag = false
    },
    addFirst () {
      this.$set(this.food, 'count', 1)
    },
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
  }
}
</script>
<style lang="stylus">
@import '../../assets/stylus/mixin.styl'
  .fade-enter-active, .fade-leave-active
    transition all 0.2s linear
  .fade-enter, .fade-leave-to
    transform translate3d(100%, 0, 0)
  .food
    position fixed
    left 0
    top 0px
    bottom 48px
    z-index 30
    width 100%
    background #ffffff
    .food-content
      position relative
      .image-header
        position relative
        width 100%
        height 0
        padding-top 100%
        .food-image
          position absolute
          left 0
          top 0
          width 100%
          height 100%
        .back
          position absolute
          top 10px
          left 0
          .icon-back
            display block
            padding 10px
            font-size 15px
            color #ffffff
      .content
        position relative
        padding 18px
        .title
          line-height 14px
          margin-bottom 8px
          font-size 14px
          font-weight 700
          color rgb(7,17, 27)
        .detail
          margin-bottom 18px
          line-height 10px
          font-size 0
          .sell-count, .rating
            font-size 10px
            color rgb(147, 153, 159)
          .sell-count
            margin-right 12px
        .price
          font-weight 700
          line-height 24px
          .now
            margin-right 8px
            font-size 14px
            color rgb(240,20,20)
          .old
            font-size 10px
            color rgb(147,153,159)
            text-decoration line-through
        .cartcontrol-wrapper
          position absolute
          right 15px
          bottom 15px
        .buy
          position absolute
          right 18px
          bottom 18px
          z-index 10
          height 24px
          line-height 24px
          padding 0 12px
          box-sizing border-box
          border-radius 12px
          font-size 10px
          color #ffffff
          background rgb(0, 160, 220)
          &.buy-fade-enter-active, &.buy-fade-leave-active
            transition opacity  0.3s
          &.buy-fade-enter, &.buy-fade-leave-to
            opacity 0
      .info
        padding 18px
        .title
          line-height 14px
          margin-bottom 6px
          font-size 14px
          color rgb(7, 17, 27)
        .text
          line-height 24px
          padding 0 8px
          font-size 12px
          color rgb(77, 85, 93)
      .rating
        padding-top 18px
        .title
          line-height 14px
          margin-left 18px
          font-size 14px
          color rgb(7, 17, 27)
        .rating-wrapper
          padding 0 18px
          .rating-item
            position relative
            padding 16px 0
            border-1px(rgba(7, 17, 27, 0.1))
            .user
              position absolute
              right 0
              top 16px
              line-height 12px
              font-size 0
              .name
                display inline-block
                vertical-align top
                font-size 10px
                color rgb(147, 153, 159)
                margin-right 6px
              .avatar
                border-radius 50%
            .time
              margin-bottom 6px
              line-height 12px
              font-size 10px
              color rgb(147, 153, 159)
            .text
              line-height 16px
              font-size 12px
              color rgb(7,17,27)
              .icon-zan
                color #00a0dc
          .no-rating
            padding 18px 0
            font-size 12px
            color rgb(147,153,159)
            text-align center
</style>
