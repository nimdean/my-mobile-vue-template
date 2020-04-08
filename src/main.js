import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from './store'
import noData from '@/components/noData'
import lazyRefresh from '@/components/lazyRefresh'
import time from '@/utils/'
import axios from 'axios'
import qs from 'qs'
import '@/assets/style/common.less'

if(process.env.VUE_APP_ENV === 'uat'){
  let vConsole = require('vconsole')
  new vConsole()
}

if(process.env.NODE_ENV === 'development'){ // 区分环境，这样即使打包时忘了把下面代码注释掉也不会影响生产环境
  require('./mock/index.js') // 开发环境不需要开启mock时注释
}

import {
  Button,
  Loading,
  Dialog,
  Notify,
} from 'vant';

import loadingMask from '@/components/loading'

Vue.config.productionTip = false
Vue.prototype.$dialog = Dialog
Vue.prototype.$notify = Notify

Vue.use(Button)
Vue.use(Loading)
Vue.use(loadingMask)
Vue.use(Dialog)
Vue.component('no-data', noData)
Vue.component('lazy-refresh', lazyRefresh)
Vue.use(time)

if(process.env.NODE_ENV === 'development'){ // 企业微信小应用开发环境添加模拟登录者信息
  let userInfo = {
    "orgname":"船務部",
    "name":"周佩儀",
    "sessionId": "c537ec13-a170-4227-95f4-c56f17244162",
    "avatar":"https://wework.qpic.cn/bizmail/cWT5OzHLt9bWnqQOhd3bG8tJRVhklTJaQKxZeticwxib2aILFvkDmkkw/0"
  }
  for(let i in userInfo){
    if(i === 'sessionId'){
      setTimeout(() => {
        store.commit('setSessionId', userInfo[i])
      },1000)
    }
    sessionStorage[i] = userInfo[i]
  }
}

router.beforeEach((to, from, next) => {
  // 企业微信小应用登录
  let urlSplit = window.location.href.split("?")
  if(urlSplit.length > 1 && urlSplit[1].indexOf("code=") > -1 && urlSplit[1].indexOf("state=") > -1 && !sessionStorage.sessionId){
    let queryArr = urlSplit[1].split("#/")[0].split("&")
    let code = queryArr.find(item => item.indexOf("code=") > -1).split("=")[1]
    let state = queryArr.find(item => item.indexOf("state=") > -1).split("=")[1]
    axios({ // 获取登录信息
      method: 'post',
      url: `${process.env.VUE_APP_BASEURL || ''}/api/entwechat/callback/qywxGetUserIdByCode`,
      data: qs.stringify({code,state})
    }).then(rs => {
      if(rs.status === 200){
        if(rs.data.result === 'success'){
          for(let i in rs.data.data){
            if(i === 'sessionId'){
              store.commit('setSessionId', rs.data.data[i])
            }
            sessionStorage[i] = rs.data.data[i]
          }
          next()
        }else{
          alert('登录失败: ' + rs.data.data)
        }
      }
    }).catch(() => {
      alert('登录失败！')
    })
  }else{
    next()
  }
})


const vm = new Vue({
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

export default vm;