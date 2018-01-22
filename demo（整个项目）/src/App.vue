<template>
  <div>
    <!-- 1.0 头部 -->
    <mt-header fixed title="Vue_CMS"></mt-header>
    <div @click="goBack" v-show="isShowBack" class="backStyle">&lt;返回</div>

    <!-- 2.0 中间内容(动态变化的) -->
    <router-view style="margin-top:40px;"></router-view>

    <!-- 3.0 底部的TabBar -->
    <mt-tabbar :class="isShowTabBar ? '' : 'hiddenTabBarStyle'" fixed>
      <mt-tab-item>
        <router-link to="/home">
          <img src="http://img08.jiuxian.com/bill/2016/0224/cccd8df26a754c139de800406af82178.png">
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/category">
          <img src="http://img07.jiuxian.com/bill/2016/0224/36a49b28ec5e4cdf9dbe37988199487d.png">
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <router-link to="/shopcart">
          <img src="http://img08.jiuxian.com/bill/2016/0224/42baf46987b6460bb43b3396e9941653.png">
          <span v-show="badge>0" class="mui-badge">{{badge}}</span>
        </router-link>
      </mt-tab-item>
      <mt-tab-item>
        <img src="http://img09.jiuxian.com/bill/2016/0224/cba9029a8f4444a989a2ab5aa84c6538.png">
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<style scoped>
  img {
    width: 42px;
    height: 35px;
  }

  .mint-tabbar>.mint-tab-item.is-selected {
    background-color: #fafafa;
  }

  /** 设置返回按钮的样式 */

  .backStyle {
    color: white;
    font-size: 16px;
    font-weight: 700;
    position: fixed;
    left: 6px;
    top: 10px;
    z-index: 2;
  }

  /**
  隐藏底部TabBar的样式
  */

  .hiddenTabBarStyle {
    display: none;
  }

  /**
    数字角标
  */

  .mui-badge {
    position: absolute;
    top: 5px;
    right: 120px;
    background-color: red;
    color: white;
  }
</style>

<script>
  export default {
    data() {
      return {
        isShowBack: false, //显示还是隐藏返回按钮的布尔值
        isShowTabBar: true, //显示还是隐藏TabBar的布尔值
        badge: 0//徽标的值
      }
    },
    //这个方法不能写成箭头函数的形式
    created() {
      this.isShowOrHidden(this.$route.path)
    },
    updated() {
      this.badge = this.$store.getters.getTotalCount
    },
    methods: {
      goBack() {
        //后退一步记录，等同于 history.back()
        this.$router.go(-1)
      },
      //根据路径显示还是隐藏
      isShowOrHidden(path) {
        if (path != '/home') { //非首页
          this.isShowBack = true
          this.isShowTabBar = false
        } else { //首页
          this.isShowBack = false
          this.isShowTabBar = true
        }
      }
    },
    watch: {
      //这个里面不能写箭头函数
      $route(newValue, oldValue) {
        this.isShowOrHidden(newValue.path)
      }
    }
  }
</script>