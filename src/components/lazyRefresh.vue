<template>
  <div class="lazy-refresh" @scroll="scroll($event, debounce, 500)" ref="box">
    <div class="scroll-board" ref="board">
      <slot></slot>
    </div>
    <no-data v-show="!total"></no-data>
    <van-loading size="20px" class="loading" color="#2F93EE" v-show="isRefreshing">{{tips.loading}}</van-loading>
    <div class="is-no-more" v-show="isNoMore">{{tips.noMore}}</div>
  </div>
</template>

<script>
import noData from './noData'
export default {
  name: "lazy-refresh",
  components: {
    noData
  },
  i18n: {
    messages: {
      'zh-CN': {
        'loading': '加载中...',
        'no-more': '没有更多了',
      },
      'zh-HK': {
        'loading': '加載中...',
        'no-more': '没有更多了',
      },
      'en-us': {
        'loading': 'loading...',
        'no-more': 'No more',
      }
    }
  },
  data() {
    return {
      isRefreshing: false,
      scrollTimer: '', // 滚动事件的定时器id
      isNoMoreTimer: '', // 没有更多了的显示控制器id
      isNoMore: false
    };
  },
  props: {
    value: Boolean, // 控制加载中的显示
    total: Number, // 需要展示的数据总条数
    current: Number // 当前数据条数
  },
  created(){
    this.isRefreshing = this.value
  },
  methods: {
    scroll(e,func,wait){
      if(e.target.scrollTop + e.target.clientHeight + 5 > this.$refs['board'].clientHeight){
        typeof func === 'function' && func(wait)
      }
    },
    debounce(wait){ // 防抖操作
      if(!this.scrollTimer && !this.isRefreshing && !this.isNoMore){ // 没有定时器且正在加载状态未消失
        if(this.total <= this.current){
          if(!this.isNoMoreTimer){
            this.isNoMore = true
            this.isNoMoreTimer = setTimeout(() => this.isNoMore = false, 1500)
          }else{
            clearTimeout(this.isNoMoreTimer)
            this.isNoMoreTimer = setTimeout(() => {
              this.isNoMoreTimer = ''
            },600)
          }
        }else{
          this.$emit('update')
        }
      }else{
        clearTimeout(this.scrollTimer)
        this.scrollTimer = setTimeout(() => {
          this.scrollTimer = ''
        }, wait)
      }
    }
  },
  watch: {
    value(newVal){
      if(newVal !== this.isRefreshing){
        this.isRefreshing = newVal
      }
    },
    isRefreshing(newVal){
      this.$emit('input', newVal)
    }
  },
  computed: {
    tips(){
      return this.$t ? {
        'loading': this.$t('loading'),
        'noMore': this.$t('no-more')
      } : {
        'loading': '加载中...',
        'noMore': '没有更多了'
      }
    }
  }
};
</script>

<style lang="less" scoped>
.lazy-refresh {
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: relative;
  .loading {
    text-align: center;
    padding: 40px 0;
  }
  .is-no-more{
    padding: 20px;
    text-align: center;
    font-size: 28px;
    color: #999;
  }
}
</style>