# 移动端前端框架
## 启动项目
1. 先安装依赖
    ``` sh
    npm install
    ```
2. 启动项目
    ``` sh
    npm run serve
    ```
## 环境区分
该模板提供了三套环境：`dev`（开发）、`uat`（测试）和`prod`（生产）。<br/>

项目根目录下有三个环境变量文件，分别是`.env.dev`、`.env.uat`和`.env.prod`。<br/>
比如，项目运行时，测试环境的请求地址为`https://test.fusen.net.cn`，而生产环境的请求地址为`https://b2b.fusen.net.cn`。如果不做环境区分，那么每次打包前都需要根据你所需要打包到哪个环境而临时修改这个值，这种做法很容易因疏忽而出错，如同现在这样做环境区分的话，只需在对应的环境文件中定义类似`VUE_APP_BASEURL`的变量名，然后在不同的环境文件中赋不同的对应值。如下：

``` js
VUE_APP_BASEURL = "https://b2b.fusen.net.cn"
NODE_ENV = "production"
VUE_APP_ENV = "production"
```
在代码中只需通过引用`process.env.VUE_APP_BASEURL`来获取该变量的值。<br/>
需要注意的是，这里的变量命名有其特殊的规则，必须以`VUE_APP_`开头才能被有效设置。<br/>

## 打包
因打包时在代码层面做了环境区分来判断执行某些和环境有关的代码，所以打包时不需要特意去设置某些变量值。只需要执行正确的打包命令即可。<br/>
1. `uat`（测试）环境打包
    ``` sh
    npm run build:uat
    ```
    打包文件会输出到`/dist/uat/`下。
2. `prod`（生产）环境打包
    ``` sh
    npm run build
    ```
    打包文件会输出到`/dist/prod/`下。
## 调试
这里指的是测试环境的调试，项目中做了环境判断，只会在打包`uat`（测试）环境代码时自动开启`vconsole`调试工具，其他环境不会开启。实际上开发环境直接使用谷歌浏览器模拟移动端，生产环境一般不允许出现破坏用户体验的调试工具。<br/>
## UI框架
默认集成[`vant`](https://youzan.github.io/vant/#/zh-CN/)，做了按需加载处理，比如你要使用`Button`组件，需要在`main.js`中添加如下代码即可全局使用`Button`：
``` js
import {Button} from 'vant'
Vue.use(Button)
```
## 移动端适配
项目集成了移动端适配插件，开发时只需按照`750px`宽度的设计稿来写`px`尺寸即可，实际运行会自动被计算成`vw`单位。<br/>
不过因为`vant`组件本身没有做`vw`单位的适配，所以此处做了黑名单处理，凡是以`vant-`开头的样式`class`都不会被转换单位，依旧保持`px`大小。
## axios
项目中使用了`axios`来发送`xhr`请求，并做了全局的`request拦截器`和`response拦截器`。<br/>
请求在发送数据等待回调的过程中一般都需要在页面上显示一个遮罩层来提醒用户正在获取数据并防止用户做其他的操作，该拦截器设置了统一的发送请求前显示遮罩层，请求结束后遮罩层消失的逻辑处理，在实际调用发送请求接口过程中不需要去特意做处理。<br/>
如果你的某个请求不需要显示遮罩层，如上拉加载获取增量数据的接口，你需要在请求入参的格式上做文章。<br/>
详情见`vuex`部分。<br/>
比如你的某个`post`请求，原本的入参是`data`，如果你不想这个请求发送过程显示遮罩层，可将入参改为`{data,needRemoveMask:true}`。<br/>

## mockjs

因为现在都是前后端分离式开发，两者开发进度可能存在不一致的问题，所以开发过程中，`假数据`是很有必要的。但侵入式的假数据往往会带来不必要的麻烦，比如说打包时忘了注释掉，其本身也不够多样化，而`mockjs`解决了这些痛点，该框架已经集成`mockjs`，**默认在开发环境中开启（而且只在开发环境才能开启）**，想关闭的话，只需要在`main.js`文件中找到`require('./mock/index.js') `注释掉即可。具体使用方式见其[官方文档](http://mockjs.com/)，不过，需要注意的一点是，因为该项目中所有的请求都被拼接上了时间戳，所以用字符串匹配路径的话会不起作用，得用正则来匹配。

## vuex
个人认为，不管项目大小，在创建初期都需要加上`vuex`组件，因为你永远无法确定第一期简单的业务逻辑会在若干期后发展成什么复杂的样子。<br/>
一般性的全局状态管理的使用方法自行查看[文档](https://vuex.vuejs.org/zh/)即可，这里主要介绍下`service`（请求）的集中化管理。<br/>
一般在业务代码中，发送请求的写法可能会是这样的：<br/>
``` js
import axios from 'axios'
axios({
  // ...
}).then(response => {
  // ...
})
```
这种写法本身在逻辑上没有任何问题，但是后期维护却存在隐患。<br/>
假如项目中有个`get`请求`/api/example/test`带参数`params`，它在项目中十几处被调用，那么安装上面的写法势必会存在十几处上面的重复代码，假如后期该请求的请求方式由`get`改为`post`，那么势必要将这是十几处代码一一查找出来修改，这在维护上显得很不方便，而且在逻辑上也不符合`service`层和`view`层解耦的理念。<br/>
所以，将请求放在某处集中管理配置不论是在维护上还是`耦合性`上都会比上面的做法要好。<br/>
其配置方式见`/store/api.js`中的示例。<br/>
使用时直接在逻辑代码里通过`vuex`的`dispatch`来调用：<br/>
``` js
this.$store.dispatch(/* 配置的函数名 */,params).then(rs => {
  // 通过rs来设置业务逻辑代码
})
```
## 自定义组件
1. loading组件<br/>
  `ajax`请求默认会处理遮罩层，其他场景想使用的话可以直接js调用`this.$loading.show()`方法来使用。

2. noData组件<br/>
  无数据时的提示组件，已经全局注册，可直接通过`<no-data></no-data>`来使用。
## 1px解决方案
因为现在基本都是高分屏，所以在设置`1px`的边框时，物理像素一般是逻辑像素的两倍，所以`css`中`1px`通常会占用`2px`的物理像素而导致边框的可能比UI稿看起来要粗，为了避免这种现象，需要设置下`1px`的显示方案。
``` css
@svg 1px-border {
  height: 4px;
  @rect {
    fill: transparent;
    height: 100%;
    stroke-width: 25%;
    stroke: var(--color, black);
  }
}
.one-px{
  border-top: 1px solid transparent;
  border-image: svg(1px-border param(--color #000)) 2 2 stretch;
}
```

## 开发环境解决跨域的问题
开发环境往往需要不同接口连接不同后端的`IP`对应服务，同时由于浏览器的同源策略，直接请求非本机或不同端口的资源会存在跨域的问题，所以需要设置代理。<br/>
代理的配置在`vue.config.js`中。<br/>
``` js
proxy: {
  '/api': { // /api为字符串或者是用来匹配路径的正则表达式
    target: 'http://t.weather.sojson.com', // 要转发的目标服务器
    changeOrigin: true, // 是否改变域名，默认为true，false则代理不生效
    pathRewrite: {

    }
  }
}
```

## 容器宽高比
项目中，在某些场景中，一些`div`必须保证固定的宽高比例来满足排版需求。

## IOS特有的兼容性处理
1. `overflow-y:auto`滚动卡顿的解决方案
  因`IOS`用的是专属的滚动盒子，所以但凡是设置了`overflow-y:auto`样式的地方都需要加上`-webkit-overflow-scrolling: touch`才能流畅滚动。
