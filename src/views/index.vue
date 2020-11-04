<template>
  <div class="index">
    <lazy-refresh xhr="getAll" :pageSize="{pageSize:5}" :params="{status:1,keyword:'',classId:'',moduleId:'',fileInfoId:''}">
      <template v-slot:scope="{ list }">
        <div v-for="item in list" :key="item.id" style="margin-bottom:20px;background: #fff;padding: 15px 10px;">
          <p>文件名称：{{item.fileName}}</p>
          <p>流程负责人：{{item.processOwner}}</p>
          <p>需培训部门：{{item.trainTarget}}</p>
        </div>
      </template>
    </lazy-refresh>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {

    }
  }
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
    .lazy-refresh{
      height: 600px;
    }
  }
</style>
