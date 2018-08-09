<template>
  <div id="home">
    <v-header></v-header>
    <div class="tab">
      <router-link to="/goods" tag="div" class="tab-item" >商品</router-link>
      <router-link to="/remarks" tag="div" class="tab-item" >评价</router-link>
      <router-link to="/seller" tag="div" class="tab-item" >商家</router-link>
    </div>
    <keep-alive>
      <router-view :goods="goods" :seller="seller" :ratings="ratings"></router-view>
    </keep-alive>
  </div>
</template>

<script>
import header from '@/components/header/Header'
export default {
  name: 'home',
  data () {
    return {
      goods: [],
      seller: {},
      ratings: []
    }
  },
  components: {
    'v-header': header
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('../../static/data.json').then((res) => {
        if (res.status === 200) {
          let data = res.data
          this.goods = data.goods
          this.seller = data.seller
          this.ratings = data.ratings
        }
      })
    }
  }
}
</script>

<style lang="stylus">
@import '../assets/stylus/mixin.styl';
#home
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    border-1px(rgba(7,17,27,0.1))
    .tab-item
      flex 1
      text-align center
      font-size 14px
      &.router-link-active
        color rgb(240,20,20)
</style>
