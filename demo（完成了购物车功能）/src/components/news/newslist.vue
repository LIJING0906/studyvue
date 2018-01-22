<template>
  <div>
      <ul class="mui-table-view">
				<li v-for="item in newsList" :key="item.id" class="mui-table-view-cell mui-media">
					<router-link :to="'/news/newsinfo/'+item.id">
						<img class="mui-media-object mui-pull-left" :src="item.img_url">
						<div class="mui-media-body">
							<p class="titleStyle">{{item.title}}</p>
							<p class='mui-ellipsis'>
                <span>{{item.add_time | fmtDate("YYYY-MM-DD HH:mm")}}</span>
                <span>点击了{{item.click}}次</span>
              </p>
						</div>
					</router-link>
				</li>
			</ul>
  </div>
</template>

<style scoped>
  .mui-table-view-cell.mui-media{
    height: 80px;
  }

  .mui-table-view .mui-media-object.mui-pull-left{
    height: 65px;
    max-width:65px;
  }

  .titleStyle{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .mui-ellipsis{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    color: #0094ff;
  }
</style>


<script>
  import common from '../../common/common'

  export default {
    data(){
      return {
        startTime:0,
        newsList:[] //新闻列表数据
      }
    },
    created(){
      const startTime = new Date() - 0
      console.log("开始时间是",startTime)
      this.startTime = startTime
      this.getNewListData()
      console.log("----newlist----beforeCreate")
    },
    methods:{
      getNewListData(){
        const url = `${common.apihost}api/getnewslist`

        this.$http.get(url).then(response=>{
          this.newsList = response.body.message
        },err=>{

        })
      }
    },
    /**
    beforeCreate(){
      console.log("----newlist----beforeCreate")
    },
    beforeMount(){
      console.log("----newlist----beforeMount")
    },
    mounted(){
      console.log("----newlist----mounted")
    },
    beforeUpdate(){
       console.log("----newlist----beforeUpdate")
    },
    updated(){
      console.log("----newlist----updated")
    },
    beforeDestroy(){
      console.log("----newlist----beforeDestroy")
      const tingliuTime = new Date() - 0 - this.startTime
      console.log("停留时间是",tingliuTime)
      //敲敲的放松请求给我们服务器
      
    },
    destroyed(){
      console.log("----newlist----destroyed")
    }
    **/
  }
</script>