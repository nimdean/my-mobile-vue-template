import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/assets/js/http'
import qs from 'qs'
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
    login({},data){ // 登录接口
      return new Promise((resolve, reject) => {
        http({
          method: 'post',
          url: '/api/entwechat/callback/qywxGetUserIdByCode',
          data: qs.stringify(data),
        }).then(rs => {
          if(rs.result === 'success') {
            resolve(rs)
          }else{
            reject(rs)
          }
        })
      })
    },
    getAll({},data){
      return new Promise((resolve,reject) => {
        http({
          method: 'post',
          url: `https://b2b.fusen.net.cn/mobile/hr/fileManagement/findAll`,
          data,
          params: data.currentPage === 1 ? {} : {timestamp: new Date().getTime()}
        }).then(rs => {
          if(rs.result === 'success') {
            resolve(rs)
          }else{
            reject(rs)
          }
        })
      })
    }
  },
  modules: {}
})