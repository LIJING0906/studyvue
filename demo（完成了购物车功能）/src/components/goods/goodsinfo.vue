<template>
    <div>
        <!-- 1.0 轮播 -->
        <div class="lunboStyle">
            <subswipe :lunbo_url="'api/getthumimages/'+$route.params.goodsId" :lunbo_time="1000"></subswipe>
        </div>

        <!-- 2.0 商品信息 -->
        <div class="goodsInfoStyle">
            <h5>{{goodsInfo.title}}</h5>
            <p>
                市场价:
                <del>￥{{goodsInfo.market_price}}</del>&nbsp;销售价:￥
                <span>{{goodsInfo.sell_price}}</span>
            </p>
            <!-- 父组件可以在使用子组件的地方直接用 v-on 来监听子组件触发的事件。 -->
            <subnumber v-on:countChange="getCountChange"></subnumber>
            <mt-button size="small" type="primary">立即购买</mt-button>
            <mt-button size="small" @click="addToShopCart" type="danger">加入购物车</mt-button>
        </div>

        <!-- 3.0 商品参数 -->
        <div class="goodsParamsStyle">
            <h6>商品参数</h6>
            <ul>
                <li>商品货号:{{goodsInfo.goods_no}}</li>
                <li>
                    库存情况:剩余{{goodsInfo.stock_quantity}}件
                </li>
                <li>
                    上架时间:{{goodsInfo.add_time | fmtDate}}
                </li>
            </ul>
        </div>

        <!-- 4.0 图文介绍&商品评论 -->
        <div class="pictureAndTextStyle">
            <mt-button size="large" @click="goToPictureAndText" :plain="true" type="primary">图文介绍</mt-button>
            <mt-button size="large" @click="goToGoodsComment" class="goodsCommentStyle" plain type="danger">商品评论</mt-button>
        </div>
    </div>
</template>

<style scoped>
    .lunboStyle,
    .goodsInfoStyle,
    .goodsParamsStyle,
    .pictureAndTextStyle {
        margin: 6px;
        padding: 6px;
        border: 1px solid rgba(92, 92, 92, 0.3);
        border-radius: 5px;
    }

    h5 {
        font-size: 16px;
        color: #0094ff;
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.3);
    }

    .goodsInfoStyle p span {
        font-size: 16px;
        color: red;
    }

    h6 {
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.3);
    }

    .goodsParamsStyle ul {
        margin: 0px;
        padding: 0px;
        list-style: none;
    }

    .goodsParamsStyle ul li {
        font-size: 14px;
        color: gray;
    }

    .goodsCommentStyle {
        margin-top: 15px;
    }
</style>

<script>
    import common from '../../common/common.js'

    import { Toast } from 'mint-ui'

    //导入轮播子组件
    import subswipe from '../subcomponents/subswipe'

    import subnumber from '../subcomponents/subnumber'

    export default {
        data() {
            return {
                goodsInfo: {},
                goodsCount: 1 //加入购物车初始的值
            }
        },
        created() {
            this.getGoodsInfoData()
        },
        methods: {
            //获取商品详情数据
            getGoodsInfoData() {
                const url = `${common.apihost}api/goods/getinfo/${this.$route.params.goodsId}`

                this.$axios.get(url).then(response => {
                    this.goodsInfo = response.data.message[0]
                }).catch(err => {
                    console.log(err)
                })
            },
            //跳转到商品评论组件中去
            goToGoodsComment() {
                //方式1
                // this.$router.push({path:'/goods/goodscomment/'+this.$route.params.goodsId})
                this.$router.push({ path: "/goods/goodscomment", query: { goodsId: this.$route.params.goodsId } })
            },
            //跳转到图文介绍组件中去
            goToPictureAndText() {
                this.$router.push({ name: "pictureAndText", query: { goodsId: this.$route.params.goodsId } })
            },
            //触发了自定义事件（countChange）要执行的函数
            getCountChange(count) {
                this.goodsCount = count
            },
            //加入购物车
            addToShopCart() {
                Toast({
                    message: '添加购物车成功',
                    position: 'middle',
                    duration: 2000
                });

                //传递给App.vue
                const goods = { goodsId: this.$route.params.goodsId, count: this.goodsCount }

                //调用mutations中addGoods,将goods对象存储在仓库中
                //同步
                this.$store.commit('addGoods',goods)

                // 异步
                // setTimeout(() => {
                //     this.$store.dispatch('asyncAddGoods', goods)
                // }, 2000);
            }
        },
        components: {
            subswipe,
            subnumber
        }
    }
</script>