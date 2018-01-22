//导入Vue这个包
import Vue from 'vue'
import Mint from 'mint-ui'
import VueResource from 'vue-resource'
import moment from 'moment'
import VuePreview from 'vue-preview'
import axios from 'axios'

//基于Vue的包需要设置一下
Vue.use(Mint)//它会帮我们注册mint-ui中的一些组件,不需要导入即可在所有Vue组件对template中使用
Vue.use(VueResource) //Vue.prototype.$http
Vue.use(VuePreview) //Vue.prototype.$preview
Vue.prototype.$axios = axios

//可以作为公共的bus在两个非父子组件中传递数据
// const bus = new Vue()
// Vue.prototype.$bus = bus

//导入css
//上线的时候，换成style.min.css
// import 'mint-ui/lib/style.css'
// import './statics/mui/css/mui.css'
import 'mint-ui/lib/style.min.css'
import './statics/mui/css/mui.min.css'
import './statics/css/site.css'

//导入App.vue
// var App  = require('./App.vue') //es5
import App from './App' //es6

//过滤器
Vue.filter('fmtDate',(input,formatString="YYYY-MM-DD HH:mm:ss")=>{
    // const lastFormatString = formatString || "YYYY-MM-DD HH:mm:ss"
    // return moment(input).format(lastFormatString)
    /**
     * 第一个参数:要格式化的原生字符串
     * 第二个参数:要格式化成的日期格式
     */
    return moment(input).format(formatString)
})
/**
 * 第一个参数:要格式化的原生字符串
 * 第二个参数:要格式化成的日期格式
 */
//如果看不懂，就看上面,es6极致的写法
//Vue.filter('fmtDate',(input,formatString="YYYY-MM-DD HH:mm:ss")=>moment(input).format(formatString))

//导入路由对象
import router from './router/router'

//导入Vuex
import store from './vuex/store'

new Vue({
    el:"#app", //vue监管的区域
    router,
    store,
    //参考:https://cn.vuejs.org/v2/guide/render-function.html
    /**
    render:function(createElement){ //createElement本身也是一个函数
        return createElement(App)
    }**/
    //将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例
    render:h=>h(App)
})
