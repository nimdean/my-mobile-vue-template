import Vue from 'vue'
import Router from 'vue-router'
import index from '../views/index'

/**
 * 路由懒加载
 * 非主页路由组件建议使用懒加载的方式
 * 使用详情查看文档：https://router.vuejs.org/zh/guide/advanced/lazy-loading.html#%E6%8A%8A%E7%BB%84%E4%BB%B6%E6%8C%89%E7%BB%84%E5%88%86%E5%9D%97
*/

Vue.use(Router)

const router = new Router({
  routes: [{
    name: 'index',
    path: '/',
    component: index
  }]
})

export { router }