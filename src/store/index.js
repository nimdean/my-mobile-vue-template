import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/assets/js/http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sessionId: '',
    login_success: undefined,
  },
  mutations: {
    setSessionId(state, val) { // 设置sessionId的值
      state.sessionId = val
    },
    setLoginSuccess(state,val) { // 设置登录状态是否成功
      state.login_success = val
    }
  },
  actions: {
    getWeatherInfo({
      commit
    }, cityCode) { // 获取天气信息接口，cityCode为天气城市代码
      return new Promise((resolve, reject) => {
        http({
          method: 'get',
          url: `/api/weather/city/${cityCode}`
        }).then(rs => {
          resolve(rs)
        }).catch(error => reject(error))
      })
    }
  },
  modules: {}
})