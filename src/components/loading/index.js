import loadingVue from './index.vue'

const loading = {};

loading.install = (Vue) => {
  const loadingInstance = Vue.extend(loadingVue);
  let nodeObj;
  const initInstance = () => {
    nodeObj = new loadingInstance();
    let nodeEle = nodeObj.$mount().$el;
    document.body.appendChild(nodeEle);
  }
  Vue.prototype.$loading = {
    show(option){
      if(nodeObj) return
      initInstance();
      if(Object.prototype.toString.call(option) === "[object Object]"){ // 为有效入参
        Object.assign(nodeObj,option)
      }
      return initInstance;
    },
    remove(){
      if(!nodeObj) return
      nodeObj.$destroy();
      document.body.removeChild(nodeObj.$el)
      nodeObj = ''
    }
  };
}

export default loading
