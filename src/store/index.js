import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    role: '',
    languageKey: 'zh-HK',
    hasDispatchHandle: false, // 是否有过派单操作
    hasRejectHandle: false, // 我的任务里是否有退回操作
    hasSignFished: false, // 是否有订单已签到完成
    httpsNumber: 0, // 当前请求中的数量
  },
  mutations: {
    setRole(state, val){
      state.role = val
    },
    setDispatchStatus(state, val){ // 重置是否有过派单操作状态
      state.hasDispatchHandle = val
    },
    setRejectStatus(state,val){ // 我的任务里是否有退回操作控制
      state.hasRejectHandle = val
    },
    setHasSignFished(state,val){ // 我的任务里是否有退回操作控制
      state.hasSignFished = val
    },
    setHttpsNumber(state,val){ // 改变当前请求的数量
      state.httpsNumber = val
    }
  },
  actions: {

  },
  modules: {
    api,
  }
})
