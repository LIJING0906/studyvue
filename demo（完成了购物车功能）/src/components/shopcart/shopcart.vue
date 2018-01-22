<template>
    <div>
        <!-- 1.0 商品列表 -->
        <div v-for="(item,index) in goodsList" :key="item.id" class="goodsItemStyle">
            <mt-switch class="switchStyle" @change="statisticsTotalCountAndTotalPrice" v-model="item.isSelect"></mt-switch>
            <div class="thumbImageStyle">
                <img :src="item.thumb_path" alt="">
            </div>
            <div class="titleAndPriceStyle">
                <p>{{item.title}}</p>
                <p>
                    <span>{{item.sell_price}}</span>&nbsp;
                    <span>商品数量{{item.count}}</span>
                </p>
            </div>
            <mt-button @click="deleteGoods(index)" :disabled="!item.isSelect" class="deleteButtonStyle" size="small" type="danger">删除</mt-button>
        </div>

        <!-- 2.0 统计信息 -->
        <div class="statisticsStyle">
            <div>
                <h4>总计(不含运费)</h4>
                <p>已经勾选商品
                    <span>{{totalCount}}</span> 件,总价
                    <span>{{totalPrice}}</span> 元</p>
            </div>
            <mt-button class="goToPayStyle" size="normal" type="danger">去结算</mt-button>
        </div>
    </div>
</template>

<style scoped>
    .goodsItemStyle {
        display: flex;
        align-items: center;
        height: 100px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.3);
    }

    .switchStyle {
        margin-left: 5px;
    }

    .thumbImageStyle {
        max-width: 70px;
        height: 70px;
        border: 1px solid rgba(92, 92, 92, 0.3);
        padding: 3px;
        border-radius: 5px;
        margin-left: 5px;
    }

    .thumbImageStyle img {
        width: 100%;
        height: 100%;
    }

    .deleteButtonStyle {
        margin-right: 5px;
    }

    .titleAndPriceStyle {
        margin-left: 5px;
        flex: 1;
    }

    .titleAndPriceStyle p:first-child {
        color: #0094ff;
        font-size: 14px;
    }

    .titleAndPriceStyle p:last-child span:first-child {
        font-size: 16px;
        color: red;
    }

    .statisticsStyle {
        height: 100px;
        display: flex;
        background-color: rgba(92, 92, 92, 0.3);
        justify-content: space-between;
        align-items: center;
    }

    .statisticsStyle div:first-child {
        margin-left: 5px;
    }

    .statisticsStyle div:first-child span {
        color: red;
        font-size: 18px;
    }

    .goToPayStyle {
        margin-right: 5px;
    }
</style>

<script>
    import common from '../../common/common.js'

    import { MessageBox } from 'mint-ui';

    export default {
        data() {
            return {
                goodsList: [],
                totalCount: 0,
                totalPrice: 0
            }
        },
        created() {
            this.getGoodsListData()
        },
        methods: {
            //获取要展示的商品数据
            getGoodsListData() {
                //1.拿到仓库中的原始数据
                const originalGoodsList = this.$store.getters.getGoodsList

                if (originalGoodsList.length <= 0) {
                    return
                }

                //2.把[{goodsId:87,count:2},{goodsId:88,count:3},{goodsId:87,count:3}] 变成
                //{87:5,88:3}
                var tempObj = {}
                for (var i = 0; i < originalGoodsList.length; i++) {
                    var goods = originalGoodsList[i]
                    if (tempObj[goods.goodsId]) {//有值
                        tempObj[goods.goodsId] += goods.count
                    } else { //{87:5,88:3}
                        tempObj[goods.goodsId] = goods.count
                    }
                }

                //3.使用for-in遍历 tempObj对象中的key,加入到一个临时数组
                var tempArray = []
                for (var key in tempObj) {
                    tempArray.push(key)
                }

                //转化成符合发送请求的字符串 87,88
                const ids = tempArray.join(',')

                //4.发送网络请求
                const url = `${common.apihost}api/goods/getshopcarlist/${ids}`
                this.$http.get(url).then(response => {
                    //5.给服务器返回的每一项添加上count
                    response.body.message.forEach(item => {
                        item.count = tempObj[item.id]
                        item.isSelect = true
                    });
                    this.goodsList = response.body.message

                    //第一次进来获取到服务器返回的数据之后，就统计一次
                    this.statisticsTotalCountAndTotalPrice()
                }).catch(err => {

                })
            },
            //统计总数量和总价格
            statisticsTotalCountAndTotalPrice() {
                let tempCount = 0
                let tempPrice = 0
                this.goodsList.forEach((item) => {
                    if (item.isSelect) {
                        tempCount += item.count
                        tempPrice += item.sell_price * item.count
                    }
                })

                this.totalCount = tempCount
                this.totalPrice = tempPrice
            },
            //删除对应的商品
            deleteGoods(index) {
                MessageBox.confirm('确定删除吗?').then(action => {
                    //获取将要删除的商品id
                    const goodsId = this.goodsList[index].id

                    //1.把仓库中对应id的商品干掉
                    this.$store.commit('deleteGoodsById', goodsId)

                    //2.把goodsList中对应索引的数据删除掉
                    this.goodsList.splice(index, 1)

                    //3.重新计算总数量和总价格
                    this.statisticsTotalCountAndTotalPrice()
                }, cancel => {
                    // console.log(cancel)
                });

            }
        }
    }
</script>