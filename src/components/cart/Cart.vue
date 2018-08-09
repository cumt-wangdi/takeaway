<template>
  <div class="cart">
    <div class="content">
      <div class="content-left" @click="handleFold">
        <div class="logo-wrapper">
          <div class="logo"
              :class="{'hightlight': totalCount > 0}">
            <span class="cart-icon iconfont"
                  :class="{'hightlight': totalCount > 0}">&#xe600;</span>
          </div>
          <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'hightlight': totalCount > 0}">￥{{totalPrice}}</div>
        <div class="desc">配送费用￥{{seller.deliveryPrice}}</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="[(totalPrice > minPrice) ? 'enough' : 'not-enough']">
          {{payDesc}}
        </div>
      </div>
      <div class="ball-container">
        <transition name="ball"
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"
                    >
          <div v-show="false" class="inner inner-hook"></div>
        </transition>
      </div>
      <transition name="fold">
        <div class="cart-list" v-show="showCartList">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="clearCart">清空</span>
          </div>
          <div class="list-content" ref="cartList">
            <ul>
              <li class="food-item" v-for="(food, index) in selectedFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <span class="price">￥{{food.price * food.count}}</span>
                <div class="cartControl-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="mask">
      <div class="list-mask" v-show="showCartList" @click="isShow = false"></div>
    </transition>
  </div>
</template>
<script>
import bus from '../../utils/bus.js'
import cartControl from '../cartControl/cart-control.vue'
import Bscroll from 'better-scroll'
export default {
  components: {
    cartControl
  },
  props: {
    selectedFoods: {
      type: Array,
      default () {
        return []
      }
    },
    seller: {
      type: Object,
      default () {
        return {}
      }
    },
    minPrice: {
      type: Number,
      default: 20
    }
  },
  data () {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBall: [],
      isShow: false
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectedFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectedFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrice === 0) {
        return `最少需要购买￥${this.minPrice}元`
      } else if (this.totalPrice < this.minPrice) {
        return `另需￥${this.minPrice - this.totalPrice}元`
      } else {
        return '去结算'
      }
    },
    showCartList () {
      if (!this.totalCount) {
        return false
      } else {
        this.$nextTick(() => {
          if (!this.scroll) {
            // eslint-disable-next-line
            this.scroll = new Bscroll(this.$refs.cartList, {
              click: true
            })
          } else {
            this.scroll.refresh()
          }
        })
        return this.isShow
      }
    }
  },
  methods: {
    clearCart () {
      // this.$emit('clearCart')
      this.selectedFoods.forEach((food) => {
        food.count = 0
      })
    },
    handleFold () {
      if (!this.totalCount) {
        return
      }
      this.isShow = !this.isShow
    },
    beforeEnter (el) {
      console.log(el)
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          let inner = el.getElementByClassName('inner-hood')[0]
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter (el) {
      /* eslint-disable unused-vars */
      let rf = el.offsetHeight
      console.log(rf)
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementByClassName('inner-hood')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
      })
    },
    afterEnter (el) {
      let ball = this.dropBall.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  mounted () {
    bus.$on('cart-add', (el) => {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBall.push(ball)
          return
        }
      }
    })
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/stylus/mixin.styl'
  .cart
    position fixed
    left 0
    bottom 0
    z-index 30
    width 100%
    height 48px
    .content
      z-index 50
      position relative
      display flex
      font-size 0
      background #141d27
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            &.hightlight
              background rgb(0,160,220)
            .cart-icon
              line-height 44px
              vertical-align middle
              color #80858a
              font-size 24px
              margin-left 8px
              &.hightlight
                color #ffffff
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #ffffff
            background rgb(240,20,20)
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
        .price
          display inline-block
          color #80858a
          font-size 16px
          font-weight 700
          line-height 24px
          margin-top 12px
          vertical-align top
          padding-right 10px
          box-sizing border-box
          border-right 1px solid rgba(255,255,255,0.1)
          &.hightlight
            color #ffffff
        .desc
          display inline-block
          vertical-align top
          padding-left 10px
          line-height 24px
          margin 12px 0
          color rgba(255,255,255,0.4)
          font-size 12px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          &.not-enough
            background #80858a
          &.enough
            background green
            color #ffffff
      .cart-list
        position absolute
        left 0
        top 0
        z-index -1
        width 100%
        background #ffffff
        transform translate3d(0,-100%,0)
        .list-header
          height 40px
          line-height 40px
          padding 0 18px
          background #f3f3f3
          border-bottom 1px solid rgba(7,17,27,0.1)
          .title
            float left
            font-size 14px
            color rgb(7,17,27)
          .empty
            float right
            font-size 12px
            color rgb(0,160,220)
        .list-content
          padding 0 18px
          max-height 217px
          overflow hidden
          background #ffffff
          .food-item
            position relative
            padding 12px 0
            box-sizing border-box
            border-1px(rgba(7,17,27,0.1))
            .name
              line-height 24px
              font-size 14px
              color rgb(7,17,27)
            .price
              display inline-block
              position absolute
              right 90px
              bottom 12px
              line-height 24px
              font-size 14px
              color red
              font-weight 700
            .cartControl-wrapper
              position absolute
              right 0
              bottom 16px
      .ball-container
        position fixed
        left 32px
        bottom 22px
        z-index 200
        .ball-enter-active
          transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0,160,220)
          transition all 0.4s linear
    .list-mask
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      background rgba(7,17,27,0.6)
      z-index 40
      .fold-enter-active, .fold-leave-active
        transition all 0.5s
        transform translate3d(0,-100%,0)
      .fold-enter, .fold-leave-to
        transform translate3d(0,0,0)
      .mask-enter-active, .mask-leave-active
        transition all 0.5s
        opacity 1
      .mask-enter, .mask-leave-to
        opacity 0
</style>
