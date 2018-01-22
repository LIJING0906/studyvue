<template>
   <div>
       <div class="left" @click="subtract">-</div>
       <div class="middle">{{count}}</div>
       <div class="right" @click="add">+</div>
   </div>
</template>
   
<style scoped>
   .left,.middle,.right{
       display: inline-block;
       text-align: center;
       line-height: 30px;
       height: 30px;
       width: 35px;
       border: 1px solid rgba(92, 92, 92, 0.3);
       margin-bottom: 10px;
   }

   .middle{
       width: 40px;
   }
</style>
   
<script>
   import common from '../../common/common.js'
   
   export default {
       data() {
           return {
               count:1
           }
       },
       methods: {
            subtract(){
                if(this.count<=1) return

                this.count--
                this.notify()
            },
            add(){
                this.count++
                this.notify()
            },
            notify(){
                //把子组件内部的this.count的值传递给goodsinfo.vue这个父组件
                
                this.$emit('countChange',this.count)
            }
       }
   }
</script>