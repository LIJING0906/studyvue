<template>
   <div>
       <!-- 1.0 标题部分 -->
       <div class="titleStyle">
            <h4>{{pictureAndTextInfo.title}}</h4>
       </div>

       <!-- 2.0 内容部分 -->
       <div class="contentStyle">
            <p v-html="pictureAndTextInfo.content"></p>
       </div>
   </div>
</template>
   
<style>
   .titleStyle,.contentStyle{
       padding: 6px;
   }

   h4{
       color: #0094ff;
       padding-bottom: 10px;
       border-bottom: 1px solid rgba(92,92,92,0.3);
   }

   p img{
       width: 100%;
   }
</style>
   
<script>
   import common from '../../common/common.js'

   export default {
       data() {
           return {
               pictureAndTextInfo:{}
           }
       },
       created() {
           this.getPictureAndTextInfo()
       },
       methods: {
           getPictureAndTextInfo(){
               const url = `${common.apihost}api/goods/getdesc/${this.$route.query.goodsId}`
               
               this.$axios.get(url).then(response=>{
                   this.pictureAndTextInfo = response.data.message[0]
               }).catch(err=>{
                   console.log(err)
               })
           }
       }
   }
</script>