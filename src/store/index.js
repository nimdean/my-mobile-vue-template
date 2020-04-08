import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    httpsNumber: 0, // 当前请求中的数量
    sessionId: '',
  },
  mutations: {
    setHttpsNumber(state,val){ // 改变当前请求的数量
      state.httpsNumber = val
    },
    setSessionId(state,val){ // 设置sessionId的值
      state.sessionId = val
    }
  },
  actions: {

  },
  modules: {
    api,
  }
})