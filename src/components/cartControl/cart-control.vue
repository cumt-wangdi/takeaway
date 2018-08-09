<template>
  <div class="cart-control">
    <div class="cart-decrease iconfont" v-show="food.count > 0" @click.stop.prevent="decreaseCart">&#xe6fa;</div>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-increase iconfont" @click.stop.prevent="addCart">&#xe602;</div>
  </div>
</template>
<script>
import bus from '../../utils/bus.js'
import vue from 'vue'
export default {
  props: {
    food: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    addCart (event) {
      if (!this.food.count) {
        vue.set(this.food, 'count', 1)
      } else {
        this.food.count += 1
      }
      bus.$emit('cart-add', event.target)
    },
    decreaseCart (event) {
      if (this.food.count > 0) {
        this.food.count -= 1
      }
    }
  }
}
</script>
<style lang="stylus">
  .cart-control
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      font-size 12px
      line-height 12px
      color rgb(0,160,220)
    .cart-count
      display inline-block
      font-size 12px
    .cart-increase
      display inline-block
      padding 6px
      font-size 12px
      line-height 12px
      color rgb(0,160,220)
</style>
