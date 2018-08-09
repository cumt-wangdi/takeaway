<template>
  <span class="icon" :class="classmap[type]"></span>
</template>
<script>
export default {
  props: {
    type: Number,
    size: Number
  },
  data () {
    return {
      classmap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../assets/stylus/mixin.styl'
  .icon
    vertical-align middle
    display inline-block
    width 12px
    height 12px
    margin-right 4px
    background-size 12px 12px
    background-repeat no-repeat
    &.decrease
      bg-image('decrease_3')
    &.discount
      bg-image('discount_3')
    &.guarantee
      bg-image('guarantee_3')
    &.invoice
      bg-image('invoice_3')
    &.special
      bg-image('special_3')
</style>
