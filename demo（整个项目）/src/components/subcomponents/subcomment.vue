<template>
  <div>
      <!-- 1.0 提交评论区域 -->
      <div class="postCommentStyle">
          <h4>提交评论</h4>
          <textarea ref="textareaRef" cols="30" rows="10" placeholder="请输入评论内容"></textarea>
          <mt-button size="large" @click="postComment" type="primary">提交评论</mt-button>
      </div>

      <!-- 2.0 评论列表区域 -->
      <div class="commentListStyle">
          <h4>评论列表</h4>
          <div v-for="(item,index) in commentList" :key="index" class="commentItem">
              <p class="contentStyle">{{item.content}}</p>
              <p class="userAndCommentTimeStyle">
                  <span>{{item.user_name}}</span>
                  <span>{{item.add_time | fmtDate}}</span>
              </p>
          </div>
          <mt-button @click="loadMore" class="loadMoreStyle" size="large" plain type="danger">加载更多</mt-button>
      </div>
  </div>
</template>

<style scoped>
    .postCommentStyle,.commentListStyle{
        padding: 6px;
    }

    h4{
        padding-bottom: 10px;
        border-bottom: 1px solid rgba(92,92,92,0.3);
    }

    .commentItem{
        height: 100px;
        overflow-y: auto;
        border-bottom: 1px solid rgba(92,92,92,0.3)
    }

    .contentStyle{
        font-size: 14px;
        color: black;
    }

    .userAndCommentTimeStyle{
        color: #0094ff;
        display: flex;
        justify-content: space-between;
        margin-top: 45px;
    }

    .loadMoreStyle{
        margin-top: 15px;
    }
</style>


<script>
    //导入common.js对象
    import common from '../../common/common'

    //es6按需导入
    import { Toast } from 'mint-ui';

    // import $ from 'jquery'

    export default {
        data(){
            return {
                pageIndex : 1,
                commentList:[]
            }
        },
        props: ['commentId'],
        created(){
            this.getCommentListData()
            console.log("---subcomponent---created")
        },
        methods:{
            //根据comment和页码加载数据
            getCommentListData(){
                const url = `${common.apihost}api/getcomments/${this.commentId}?pageindex=${this.pageIndex}`
                
                this.$http.get(url).then(response=>{
                    if(response.body.message.length==0){
                        Toast({
                            message: '已经没有数据啦!!!',
                            position: 'middle',
                            duration: 2000
                        });
                    }

                    if(this.pageIndex===1){
                        this.commentList = response.body.message
                    }else{
                         this.commentList = this.commentList.concat(response.body.message)
                    }
                }).catch(err=>{

                })
            },
            //加载更多
            loadMore(){
                this.pageIndex++

                this.getCommentListData()
            },
            //提交评论
            postComment(){
                //1、获取我们textarea中的值
                //原生获取
                //const content = document.getElementById("textareaId").value
                //2、juery
                // const content = $("#textareaId").val()
                
                //3、refs获取dom元素
                const textareaDom = this.$refs.textareaRef
                const content = textareaDom.value
                
                if(content.trim().length === 0){
                    Toast({
                        message: '评论内容不能为空',
                        position: 'middle',
                        duration: 2000
                    });
                    return
                }

                //发送网络请求
                const url = `${common.apihost}api/postcomment/${this.commentId}`
                this.$http.post(url,{content},{emulateJSON:true}).then(response=>{
                    //1.弹出提示信息，评论成功
                    Toast({
                        message: response.body.message,
                        position: 'middle',
                        duration: 2000
                    });

                    //2.清空评论内容
                    textareaDom.value = ""

                    //3.重新加载第一页的评论数据
                    this.pageIndex = 1
                    this.getCommentListData()
                }).catch(err=>{
                    
                })
            },
        },
    //     beforeCreate(){
    //   console.log("----subcomponent----beforeCreate")
    // },
    // beforeMount(){
    //   console.log("----subcomponent----beforeMount")
    // },
    // mounted(){
    //   console.log("----subcomponent----mounted")
    // },
    // beforeUpdate(){
    //    console.log("----subcomponent----beforeUpdate")
    // },
    // updated(){
    //   console.log("----subcomponent----updated")
    // },
    // beforeDestroy(){
    //   console.log("----subcomponent----beforeDestroy")
    // },
    // destroyed(){
    //   console.log("----subcomponent----destroyed")
    // }
    }
</script>
