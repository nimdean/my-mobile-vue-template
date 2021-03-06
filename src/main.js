import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import noData from '@/components/noData'
import lazyRefresh from '@/components/lazyRefresh'
import { formatTime } from '@/utils/'
import '@/assets/style/common.less'
import {
  Loading,
  Dialog,
  Notify,
  Toast,
  Button
} from 'vant'

import loadingMask from '@/components/loading'

if (process.env.VUE_APP_ENV === 'uat') {
  const VConsole = require('vconsole')
  /* eslint-disable no-new */
  new VConsole()
}

if (process.env.NODE_ENV === 'development') { // 区分环境，这样即使打包时忘了把下面代码注释掉也不会影响生产环境
  // require('./mock/index.js') // 开发环境不需要开启mock时注释
}

Vue.config.productionTip = false
Vue.prototype.$dialog = Dialog
Vue.prototype.$notify = Notify

Vue.use(Loading)
Vue.use(loadingMask)
Vue.use(Dialog)
Vue.component('no-data', noData)
Vue.component('lazy-refresh', lazyRefresh)
Vue.use(formatTime)
Vue.use(Toast)
Vue.use(Button)

if (process.env.NODE_ENV === 'development') { // 企业微信小应用开发环境添加模拟登录者信息
  const userInfo = {
    orgname: '信息中心',
    name: '程峰全',
    sessionId: '380f1d03-462d-439a-a12f-7eea5b3c4f9c',
    avatar: 'https://wework.qpic.cn/bizmail/cWT5OzHLt9bWnqQOhd3bG8tJRVhklTJaQKxZeticwxib2aILFvkDmkkw/0'
  }
  for (const i in userInfo) {
    sessionStorage[i] = userInfo[i]
  }
  setTimeout(() => { // 定时器模拟登录时长
    store.commit('setLoginSuccess', true)
  }, 1000)
}

router.beforeEach((to, from, next) => {
  // 动态设置标题
  if (to.meta.title) document.title = to.meta.title
  // 企业微信小应用登录
  const urlSplit = window.location.search.split('?')
  if (urlSplit.length > 1 && urlSplit[1].indexOf('code=') > -1 && urlSplit[1].indexOf('state=') > -1 && !sessionStorage.sessionId) {
    const queryArr = urlSplit[1].split('#/')[0].split('&')
    const code = queryArr.find(item => item.indexOf('code=') > -1).split('=')[1]
    const state = queryArr.find(item => item.indexOf('state=') > -1).split('=')[1]
    store.dispatch('login', { code, state }).then(rs => {
      if (rs.status === 200) {
        if (rs.data.result === 'success') {
          store.commit('setLoginSuccess', true)
          for (const i in rs.data.data) {
            sessionStorage[i] = rs.data.data[i]
          }
          next()
        } else {
          store.commit('setLoginSuccess', false)
          Toast.fail('登录失败: ' + rs.data.data)
        }
      }
    }).catch(() => {
      Toast.fail('登录失败！')
      store.commit('setLoginSuccess', false)
    })
  } else {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

/**
 * 处理iOS 微信客户端6.7.4 键盘收起页面未下移bug
 */
;(/iphone|ipod|ipad/i.test(navigator.appVersion)) && document.addEventListener('blur', (e) => {
  // 这里加了个类型判断，因为a等元素也会触发blur事件
  ['input', 'textarea'].includes(e.target.localName) && document.body.scrollIntoView(false)
}, true)
