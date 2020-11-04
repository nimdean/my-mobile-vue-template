<template>
  <div class="no-data">
    <img :src="require('@/assets/images/no_data@2x.png')" />
    <p>{{tip}}</p>
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
      },
      'en-US': {
        'no-data-info': 'No relevant data'
      }
    }
  },
  computed: {
    tip () {
      return this.$t ? this.$t('no-data-info') : '没有相关数据哦'
    }
  }
}
</script>

<style lang="less" scoped>
  .no-data{
    text-align: center;
    background: #fff;
    padding: 80px 0;
    width: 710px;
    img{
      width: 60%;
    }
    p{
      color: #999;
      font-size: 26px;
      line-height: 50px;
    }
  }
</style>
