<template>
  <div id="app">
    <div class="login-mask" v-if="!$store.state.sessionId">
      <van-loading type="spinner" color="#1989fa" size="24px">登录中...</van-loading>
    </div>
    <router-view v-else />
  </div>
</template>

<script>
export default {
  name: 'app',
  created(){
    if(sessionStorage.sessionId){
      this.$store.commit('setSessionId', sessionStorage.sessionId)
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
}
</style>
