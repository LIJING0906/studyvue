<template>
    <div>
        <subcomment :commentId="this.$route.query.goodsId"></subcomment>
    </div>
</template>

<script>
    //导入评论子组件
    import subcomment from '../subcomponents/subcomment'

    export default{
        components:{
            subcomment
        }
    }
</script>