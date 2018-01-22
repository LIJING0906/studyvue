<template>
    <div>
        <mt-swipe :auto="lunbo_time">
            <mt-swipe-item v-for="(item,index) in lunboArray" :key="index">
                <img :src="item.img" alt="">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<style scoped>
    /**1.0 轮播图的样式*/

    .mint-swipe {
        height: 250px;
        width: 100%;
    }

    img {
        height: 100%;
        width: 100%;
    }
</style>

<script>
    import common from "../../common/common.js";

    export default {
        data() {
            return {
                lunboArray: [] //轮播图数组
            };
        },
        props: ["lunbo_url", "lunbo_time"],
        created() {
            //Vue底层给我们提供的生命周期函数之一，只要程序员实现了，Vue底层在home.vue组件被创建出来的时候，就会自动调用它
            this.getLunboData();
        },
        methods: {
            //发送网路请求，获取轮播所需要的数据
            getLunboData() {
                const url = `${common.apihost}${this.lunbo_url}`;

                this.$http.get(url).then(
                    response => {
                        response.body.message.forEach(item => {
                            //这里有个坑
                            if (item.src) {//仅仅在商品详情中这样设置
                                item.img = item.src
                            }
                        });
                        this.lunboArray = response.body.message;
                    },
                    err => { }
                );
            }
        }
    };
</script>