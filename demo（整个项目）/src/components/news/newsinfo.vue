<template>
  <div>
      <!-- 1.0 标题部分 -->
      <div class="titleStyle">
        <h5>{{newsInfo.title}}</h5>
        <p>
          {{newsInfo.add_time | fmtDate}}&nbsp;&nbsp;
          {{newsInfo.click}}次浏览&nbsp;&nbsp;
          分类:民生经济
        </p>
      </div>

      <!-- 2.0 内容部分 -->
      <div class="contentStyle">
        <span v-html="newsInfo.content"></span>
      </div>

      <!-- 3.0 评论子组件 -->
      <subcomment :commentId="$route.params.newsId"></subcomment>
  </div>
</template>

<style scoped>
  .titleStyle,.contentStyle{
    padding: 6px;
  }

  h5{
    color: #0094ff;
    font-size: 16px;
  }

  .titleStyle{
    border-bottom: 1px solid rgba(92,92,92,0.3);
  }
</style>


<script>
  //导入公共的common.js
  import common from '../../common/common'

  //导入评论子组件
  import subcomment from '../subcomponents/subcomment'

  export default {
    data(){
      return {
        newsInfo:{} //新闻详情数据
      }
    },
    created(){
      this.getNewsInfoData()
    },
    methods:{
      getNewsInfoData(){
        //js中this不能少
        const url = `${common.apihost}api/getnew/${this.$route.params.newsId}`

        this.$http.get(url).then(response=>{
          this.newsInfo = response.body.message[0]
        },err=>{

        })
      }
    },
    components:{
      //名称是在template中使用时候的名称,值是导入的子组件
      //subcomment : subcomment
      subcomment
    }
  }
</script>