import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex) //Vue.prototype.$store

//创建了一个仓库
const store = new Vuex.Store({
    state:{
        // [{goodsId:87,count:2},{goodsId:88,count:3},{goodsId:87,count:3}]
        goodsList:[]
    },
    getters:{
        //获取当前仓库中，商品列表的总数量
        getTotalCount(state){
            let totalCount = 0
            state.goodsList.forEach(item=>{
                totalCount+=item.count
            })

            return totalCount
        },
        //获取加入到购物车中的数据
        getGoodsList(state){
            return state.goodsList
        }
    },
    mutations:{
        //goods  {goodsId:87,count:2}
        /**state是固定的，目的是为了拿到state中的数据操作 */
        addGoods(state,goods){
            state.goodsList.push(goods)
        },
        //[{goodsId:87,count:2},{goodsId:88,count:3},{goodsId:87,count:3}] //0 1 2
        /**
         * state 将来获取仓库中的值
         * goodsId 要删除的商品id
         */
        deleteGoodsById(state,goodsId){
            //个人建议如果边遍历变删除，从后往前面删
            for(var i = state.goodsList.length-1;i>=0;i--){
                var goods = state.goodsList[i]
                if(goods.goodsId==goodsId){
                    state.goodsList.splice(i,1)
                }
            }
        }
    },
    actions:{
        //context相当于$store
        /**
         * context第一个参数是固定的
         * 第二个参数，就是用户传递的载荷
         */
        asyncAddGoods(context,goods){
            context.commit('addGoods',goods)
        }
    }
})

export default store