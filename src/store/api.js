/* eslint-disable */
import http from '@/assets/js/http'
import qs from 'qs'
export default {
  actions: {
    getWeatherInfo({commit},cityCode){ // 获取天气信息接口，cityCode为天气城市代码
      return new Promise((resolve,reject) => {
        http({
          method: 'get',
          url: `/api/weather/city/${cityCode}`
        }).then(rs => {
          resolve(rs)
        }).catch(error => reject(error))
      })
    }
  }
}