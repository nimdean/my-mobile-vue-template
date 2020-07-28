<template>
  <div id="app">
    <div class="login-mask" v-if="$store.state.login_success === undefined">
      <van-loading type="spinner" color="#1989fa" size="24px">登录中...</van-loading>
    </div>
    <template v-else>
      <!-- 登录成功 -->
      <router-view v-if="$store.state.login_success" />
      <!-- 登录失败 -->
      <div class="login_fail" v-else>
        <img src="@/assets/images/network_fail@2x.png" />
        <p>登录失败，请检查网络并重试</p>
        <span @click="reload">重新加载</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    reload(){
      location.reload()
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'PingFang SC', 'Helvetica Neue', 'Avenir', 'Helvetica', 'Arial', 'sans-serif', 'Source Han Sans CN';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #F4F4F4;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .login-mask{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .login_fail{
    width: 100%;
    height: 100%;
    text-align: center;
    background: #fff;
    font-size: 13px;
    line-height: 19px;
    img{
      width: 150px;
      margin-top: 150px;
      margin-bottom: 17px;
    }
    p{
      color: #667080;
    }
    span{
      color: #2F93EE;
    }
  }
}
</style>