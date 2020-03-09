<template>
  <div class="mask" ref="mask-loading">
    <van-loading class="loading" :type="type" :color="color" :size="size" :text-size="textSize" :vertical="vertical">{{text}}</van-loading>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  },
  props: {
    type: {
      type: String,
      default: "spinner",
    },
    color: {
      type: String,
      default: "#1989fa"
    },
    size: {
      type: Number || String,
      default: 30
    },
    textSize: {
      type: Number || String,
      default: 14
    },
    vertical: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ""
    }
  }
}
</script>

<style scoped>
  .mask{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0);
  }
  .loading{
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,50%);
    z-index: 999;
  }
</style>