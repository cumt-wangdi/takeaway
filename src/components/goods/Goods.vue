<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
        <ul>
          <li v-for="(good, index) in goods" :key="index"
              class="menu-item"
              :class="{'current': currentIndex === index}"
              >
            <span class="text" @click="menuClick(index)">
              <icon v-show="good.type>0" :type="good.type"></icon>{{good.name}}
            </span>
          </li>
        </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li class="food-list food-list-hook" v-for="(good, index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul >
            <li class="food-item"
                v-for="(food, index) in good.foods"
                :key="index"
                @click="selectFood(food)"
                >
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <div class="count">月售{{food.sellCount}}份</div>
                  <div>好评率{{food.rating}}%</div>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="control-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <food :food="food" ref="food"></food>
    <cart :selectedFoods="selectedFoods"
          :seller="seller"
          :min-price="seller.deliveryPrice"
          @clearCart="clearCart"></cart>
  </div>
</template>
<script>
import Bscroll from 'better-scroll'
import cart from '../cart/Cart.vue'
import cartControl from '../cartControl/cart-control.vue'
import food from '../food/Food.vue'
import icon from '../icon/icon.vue'
export default {
  props: {
    goods: {
      type: Array
    },
    seller: {
      type: Object
    }
  },
  data () {
    return {
      classmap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
      // goods: [],
      scrollY: [],
      currentY: 0,
      food: {}
    }
  },
  components: {
    cart,
    cartControl,
    food,
    icon
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.scrollY.length - 1; i++) {
        let y1 = this.scrollY[i]
        let y2 = this.scrollY[i + 1]
        if (this.currentY >= y1 && this.currentY < y2) {
          return i
        } else {
          return 0
        }
      }
    },
    selectedFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.$nextTick(() => {
      this.initScroll()
      this.initPosition()
    })
  },
  methods: {
    initScroll () {
      this.menuScroll = new Bscroll(this.$refs.menu, {
        click: true
      })
      this.foodScroll = new Bscroll(this.$refs.foods, {
        probeType: 3,
        click: true
      })
      this.foodScroll.on('scroll', (position) => {
        this.currentY = Math.abs(Math.round(position.y))
      })
    },
    initPosition () {
      let foodList = this.$refs.foods.getElementsByClassName('food-list-hook')
      let height = 0
      this.scrollY.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.scrollY.push(height)
      }
    },
    menuClick (index) {
      let foodsList = this.$refs.foods.getElementsByClassName('food-list-hook')
      let el = foodsList[index]
      this.foodScroll.scrollToElement(el, 300)
    },
    selectFood (food) {
      this.food = food
      this.$refs.food.show()
    },
    clearCart () {
      this.selectedFoods = []
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/stylus/mixin.styl'
  .goods
    display flex
    position absolute
    top 176px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        height 54px
        width 74px
        line-height 14px
        padding 0 10px
        &.current
          position relative
          z-index 10
          margin-top -1px
          background #ffffff
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          border-1px(rgba(7,17,27,0.1))
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 1px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      .food-item
        display flex
        margin: 18px
        border-bottom  1px solid #d9dde1
        padding-bottom 18px
        .icon
          flex 0 0 57px
          margin-right 10px
        .content
          flex 1
          position relative
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            color rgb(7,17,27)
          .desc, .extra
            line-height 10px
            font-size 12px
            color rgb(147,153,159)
          .desc
            margin-bottom 8px
          .extra
            .count
              margin-bottom 8px
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
          .control-wrapper
            position absolute
            right 0
</style>
