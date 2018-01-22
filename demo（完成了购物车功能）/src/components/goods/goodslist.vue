<template>
    <div>
        <ul class="mui-table-view mui-grid-view">
            <li v-for="item in goodsList" :key="item.id" class="mui-table-view-cell mui-media mui-col-xs-6">
                <div class="goodsItemStyle">
                    <router-link :to="'/goods/goodsinfo/'+item.id">
                        <img class="mui-media-object" :src="item.img_url">
                        <div class="mui-media-body">
                            <!-- 商品标题 -->
                            <p>
                                {{item.title}}
                            </p>
                            <!-- 价格相关 -->
                            <p>
                                <span>{{item.sell_price}}</span>&nbsp;&nbsp;
                                <del>{{item.market_price}}</del>
                            </p>
                            <!-- 提示信息 -->
                            <p>
                                <span>热卖中</span>
                                <span>剩余{{item.stock_quantity}}件</span>
                            </p>
                        </div>
                    </router-link>
                </div>
            </li>
        </ul>
    </div>
</template>

<style scoped>
    .mui-table-view.mui-grid-view {
        margin: 0px;
        padding: 0px;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell {
        padding: 5px 8px;
    }

    .goodsItemStyle {
        border: 1px solid rgba(92, 92, 92, 0.3);
        border-radius: 5px;
        box-shadow: 0px 0px 5px rgba(92, 92, 92, 0.3);
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-object {
        padding: 6px;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body {
        height: 100px;
        padding: 3px;
        text-align: left;
        color: gray;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body p:first-child {
        color: black;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body p:nth-child(2) {
        height: 35px;
        line-height: 35px;
        background-color: #f0f0f0;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body p:nth-child(2) span {
        color: red;
        font-size: 16px;
    }

    .mui-table-view.mui-grid-view .mui-table-view-cell .mui-media-body p:last-child {
        height: 30px;
        line-height: 30px;
        background-color: #f0f0f0;
        display: flex;
        justify-content: space-between;
    }
</style>

<script>
    import common from "../../common/common.js";
    // export default new Vue()
    export default {
        data() {
            return {
                goodsList: []
            };
        },
        created() {
            this.getGoodsListData();
        },
        methods: {
            getGoodsListData() {
                const url = `${common.apihost}api/getgoods`;

                this.$http
                    .get(url)
                    .then(response => {
                        this.goodsList = response.body.message;
                    })
                    .catch(err => { });
            }
        }
    };
</script>