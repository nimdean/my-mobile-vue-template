<template>
  <div class="no-data">
    <img :src="require('@/assets/images/noData.png')" />
    <p>{{$t("no-data-info")}}</p>
  </div>
</template>

<script>
export default {
  name: 'no-data',
  i18n: {
    messages: {
      'zh-CN': {
        'no-data-info': '没有相关数据哦'
      },
      'zh-HK': {
        'no-data-info': '沒有相關資料哦'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .no-data{
    text-align: center;
    background: #fff;
    padding: 150px 0;
    width: 710px;
    img{
      width: 100%;
      // margin-bottom: 20px;
    }
    p{
      color: #999;
      font-size: 26px;
    }
  }
</style>