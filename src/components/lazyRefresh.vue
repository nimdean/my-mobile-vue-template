<template>
  <div class="lazy-refresh" @scroll="scroll($event, debounce, 500)" ref="box">
    <div class="scroll-board" ref="board">
      <slot />
      <slot name="scope" :list="result.list" />
    </div>
    <no-data v-show="!result.total"></no-data>
    <van-loading size="20px" class="loading" color="#2F93EE" v-show="isRefreshing">{{tips.loading}}</van-loading>
    <div class="is-no-more" v-show="isNoMore">{{tips.noMore}}</div>
  </div>
</template>

<script>
/**
 * @FileDescription: 移动端懒加载组件
 * @Author: chengfengquan
 * @Date: 2020-11-04
 * @LastEditors: chengfengquan
 * @LastEditTime: 2020-11-04
 */
import noData from './noData'
export default {
  name: 'lazy-refresh',
  components: {
    noData
  },
  i18n: {
    messages: {
      'zh-CN': {
        loading: '加载中...',
        'no-more': '没有更多了'
      },
      'zh-HK': {
        loading: '加載中...',
        'no-more': '没有更多了'
      },
      'en-us': {
        loading: 'loading...',
        'no-more': 'No more'
      }
    }
  },
  data () {
    return {
      isRefreshing: false,
      scrollTimer: '', // 滚动事件的定时器id
      isNoMoreTimer: '', // 没有更多了的显示控制器id
      isNoMore: false,
      currentPage: 1,
      result: {
        list: [],
        total: 0
      }
    }
  },
  props: {
    xhr: String, // 要发送请求所封装的dispatch函数名
    params: Object, // 请求参数
    listString: { // 获取请求返回列表数据的路径
      type: String,
      default: 'list'
    },
    totalString: { // 获取请求返回总条数的路径
      type: String,
      default: 'total'
    },
    pageSize: { // 每次请求的条数
      type: Object,
      default: () => ({ pageSize: 5 })
    },
    currentPageString: {
      type: String,
      default: 'currentPage'
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.currentPage !== 1) { this.isRefreshing = true }
      this.$store.dispatch(this.xhr, Object.assign({
        [this.currentPageString]: this.currentPage
      }, this.params, this.pageSize)).then(rs => {
        const { result, data } = rs
        if (result === 'success') {
          this.result.list = this.result.list.concat(data[this.listString])
          this.result.total = data[this.totalString]
        }
      }).finally(() => {
        this.isRefreshing = false
      })
    },
    scroll (e, func, wait) {
      if (e.target.scrollTop + e.target.clientHeight + 5 > this.$refs.board.clientHeight) {
        typeof func === 'function' && func(wait)
      }
    },
    debounce (wait) { // 防抖操作
      if (!this.scrollTimer && !this.isRefreshing && !this.isNoMore) { // 没有定时器且正在加载状态未消失
        if (this.result.total <= this.result.list.length) {
          if (!this.isNoMoreTimer) {
            this.isNoMore = true
            this.isNoMoreTimer = setTimeout(() => { this.isNoMore = false }, 1500)
          } else {
            clearTimeout(this.isNoMoreTimer)
            this.isNoMoreTimer = setTimeout(() => {
              this.isNoMoreTimer = ''
            }, 600)
          }
        } else {
          this.currentPage++
          this.getData()
        }
      } else {
        clearTimeout(this.scrollTimer)
        this.scrollTimer = setTimeout(() => {
          this.scrollTimer = ''
        }, wait)
      }
    }
  },
  computed: {
    tips () {
      return this.$t ? {
        loading: this.$t('loading'),
        noMore: this.$t('no-more')
      } : {
        loading: '加载中...',
        noMore: '没有更多了'
      }
    }
  }
}
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
