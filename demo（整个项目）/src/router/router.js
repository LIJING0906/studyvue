import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter) //Vue.prototype.$route  Vue.prototype.$router

//路由相关
//导入组件
/**
import home from '../components/home/home'
import category from '../components/category/category'
import newslist from '../components/news/newslist'
import newsinfo from '../components/news/newsinfo'
import photolist from '../components/photo/photolist'
import photoinfo from '../components/photo/photoinfo'
import goodslist from '../components/goods/goodslist'
import goodsinfo from '../components/goods/goodsinfo'
import goodscomment from '../components/goods/goodscomment'
import pictureAndText from '../components/goods/pictureAndText'
import shopcart from '../components/shopcart/shopcart'
*/

const home = () => import('../components/home/home.vue')
const category = () => import('../components/category/category.vue')
const shopcart = () => import('../components/shopcart/shopcart.vue')
const newslist = () => import('../components/news/newslist.vue')
const newsinfo = () => import('../components/news/newsinfo.vue')
const photolist = () => import('../components/photo/photolist.vue')
const photoinfo = () => import('../components/photo/photoinfo.vue')
const goodslist = () => import('../components/goods/goodslist.vue')
const goodsinfo = () => import('../components/goods/goodsinfo.vue')
const pictureAndText = () => import('../components/goods/pictureAndText.vue')
const goodscomment = () => import('../components/goods/goodscomment.vue')

const router = new VueRouter({
    routes : [
        {path:'/',redirect:'/home'},
        {path:"/home",component:home},
        {path:"/category",component:category},
        {path:"/shopcart",component:shopcart},
        {path:"/news/newslist",component:newslist},
        {path:"/news/newsinfo/:newsId",component:newsinfo},
        {path:"/photo/photolist",component:photolist},
        {path:"/photo/photoinfo/:photoId",component:photoinfo},
        {path:"/goods/goodslist",component:goodslist},
        {path:"/goods/goodsinfo/:goodsId",component:goodsinfo},
        // {path:"/goods/goodscomment/:goodsId",component:goodscomment} //params传值
        {path:"/goods/goodscomment",component:goodscomment}, //query方式传值
        {name:"pictureAndText",path:"/goods/pictureAndText",component:pictureAndText}
    ]
})

export default router