<template>
  <div class="index">
    打开控制台查看<span style="color:red">console</span>的深圳天气信息。
    <div class="box">
      <div class="box2"></div>
      这是1px边框的效果。
    </div>
    <div w-188-246></div>
    <van-button type="primary" size="small">主要按钮</van-button>
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
    return {

    }
  },
  mounted(){
    this.$store.dispatch('getWeatherInfo','101280601').then(rs => {
      console.log("深圳天气信息",rs)
    })
  },
}
</script>

<style scoped>
  @svg 1px-border {
    height: 4px;
    @rect {
      fill: transparent;
      height: 100%;
      stroke-width: 25%;
      stroke: var(--color, black);
    }
  }
  .box{
    margin-top: 50px;
    border-top: 1px solid #cfcfcf;
    border-image: svg(1px-border param(--color #cfcfcf)) 2 2 stretch;
    width: 100%;
    height: 300px;
    padding: 10px;
  }
  [w-188-246] {
    width: 188px;
    background-color: red;
  }
  [w-188-246] {
    aspect-ratio: '188:246';
  }
</style>

<style lang="less" scoped>
  .index{
    padding: 20px;
    text-align: left;
    .box2{
      width: 100%;
      height: 120px;
      border-radius: 5px;
      border: 1px solid @theme-color;
    }
  }
</style>

