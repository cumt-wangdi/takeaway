<template>
  <div class="star">
    <span class="iconfont icon-wujiaoxing1"
          :class="{'selectedStar': n <= starCount}"
          :style="{fontSize: size + 'px'}"
          v-for="n in 5"
          :key="n"></span>
  </div>
</template>
<script>
export default {
  props: {
    score: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 10
    }
  },
  computed: {
    starCount () {
      return Math.round(this.score)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .star
    .icon-wujiaoxing1
      margin-right 5px
      &.selectedStar
        color rgb(255,153,0)
</style>
