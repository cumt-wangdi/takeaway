<template>
  <div class="ratingSelect">
    <div class="rating-type">
      <span class="block positive"
            :class="{'active': localSelectType === 2}"
            @click="selectedType(2)"
            >
        {{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive"
            :class="{'active': localSelectType === 0}"
            @click="selectedType(0)"
            >
        {{desc.positive}}<span class="count">{{positiveRatings.length}}</span>
      </span>
      <span class="block negative"
            :class="{'active': localSelectType === 1}"
            @click="selectedType(1)"
            >
        {{desc.negative}}<span class="count">{{negativeRatings.length}}</span>
      </span>
    </div>
    <div class="swith"
        :class="{'on': localOnlyContent}"
        @click="toggleContent"
        >
      <span class="icon-check iconfont icon-xuanze"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script>
const ALL = 2
/* eslint-disable no-unused-vars */
const POSITIVE = 0
const NEGATIVE = 1

export default {
  props: {
    desc: {
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    ratings: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      localSelectType: this.selectType,
      localOnlyContent: this.onlyContent
    }
  },
  computed: {
    positiveRatings () {
      return this.ratings.filter((rating) => {
        return rating.rateType === POSITIVE
      })
    },
    negativeRatings () {
      return this.ratings.filter((rating) => {
        return rating.rateType === NEGATIVE
      })
    }
  },
  methods: {
    selectedType (type) {
      this.localSelectType = type
      this.$emit('changeType', type)
    },
    toggleContent () {
      this.localOnlyContent = !this.localOnlyContent
      this.$emit('changeOnlyContent', this.localOnlyContent)
    }
  }
}
</script>
<style lang="stylus">
@import '../../assets/stylus/mixin.styl'
  .ratingSelect
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        color rgb(77,85,93)
        font-size 12px
        .count
            margin-left 2px
            font-size 8px
        &.active
          color #ffffff
        &.positive
          background rgba(0, 160, 220, 0.2)
          &.active
            background rgb(0, 160, 220)
        &.negative
          background rgba(77, 85, 93, 0.2)
          &.active
            background rgb(77, 85, 93)
    .swith
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      color rgb(147, 153,159)
      font-size 0
      &.on
        .icon-check
          color green
      .icon-check
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 24px
      .text
        display inline-block
        vertical-align top
        font-size 12px
</style>
