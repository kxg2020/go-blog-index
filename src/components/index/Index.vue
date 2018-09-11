<template>
    <div class="main">
        <div class="header">
            <div class="logo">
                Amore
            </div>
            <div class="header-menu">
                <el-menu  class="el-menu-demo" mode="horizontal"  text-color="#fff" active-text-color="#ffd04b" background-color="#545c64" >
                    <el-submenu index="1" >
                        <template slot="title">{{username}}&nbsp;</template>
                        <el-menu-item index="1-1" v-on:click="logout" width="200px">退出登陆</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </div>
        <div class="body">
            <div class="left-menu">
                <el-col>
                    <el-menu
                            :router="true"
                            :unique-opened = "true"
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <el-menu-item index="0" >
                            <i class="el-icon-location"></i>
                            <span slot="title">后台首页</span>
                        </el-menu-item>
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>用户管理</span>
                            </template>
                            <el-menu-item index="1-1" route="/user/list" :style="{textAlign:'center'}">列表</el-menu-item>
                            <el-menu-item index="1-2" route="/user/add" :style="{textAlign:'center'}">新增</el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>角色管理</span>
                            </template>
                            <el-menu-item index="2-1" route="/user/list" :style="{textAlign:'center'}">列表</el-menu-item>
                            <el-menu-item index="1-2" route="/user/add" :style="{textAlign:'center'}">新增</el-menu-item>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>权限管理</span>
                            </template>
                            <el-menu-item index="3-1" route="/user/list" :style="{textAlign:'center'}">列表</el-menu-item>
                            <el-menu-item index="3-2" route="/user/add" :style="{textAlign:'center'}">新增</el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>微信管理</span>
                            </template>
                            <el-menu-item index="4-1" route="/wechat/list" :style="{textAlign:'center'}">列表</el-menu-item>
                            <el-menu-item index="4-2" route="/wechat/add" :style="{textAlign:'center'}">新增</el-menu-item>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>文章管理</span>
                            </template>
                            <el-menu-item index="5-1" :style="{textAlign:'center'}">列表</el-menu-item>
                            <el-menu-item index="5-2" :style="{textAlign:'center'}">新增</el-menu-item>
                            <el-menu-item index="5-3" :style="{textAlign:'center'}">选项3</el-menu-item>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>标签管理</span>
                            </template>
                            <el-menu-item index="6-1" :style="{textAlign:'center'}">选项1</el-menu-item>
                            <el-menu-item index="6-2" :style="{textAlign:'center'}">选项2</el-menu-item>
                            <el-menu-item index="6-3" :style="{textAlign:'center'}">选项3</el-menu-item>
                        </el-submenu>
                        <el-submenu index="7">
                            <template slot="title">
                                <i class="el-icon-location"></i>
                                <span>系统管理</span>
                            </template>
                            <el-menu-item index="7-1" :style="{textAlign:'center'}">系统配置</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-col>
            </div>
            <div class="right-content">
                <div class="top">
                    <el-breadcrumb class="bread">
                        <el-breadcrumb-item
                                separator = '/'
                                v-for = "(item,index)
in breadList"
                                :key = index
                                :to="{path:
item.path}" > {{item.meta.name}}

                        </el-breadcrumb-item>
                    </el-breadcrumb>
                </div>

                <div class="middle">
                    <router-view></router-view>
                </div>
                <div class="footer">
                    蜀20180101|copyright@macarinal
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "Index",
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1',
        breadList:"",
        username:localStorage.getItem("username")
      };
    },
    watch:{
      '$route'(){
        this.getBread();
      }
    },
    methods: {
      logout(){
        this.$store.store.commit("LOGOUT");
        this.$router.push({path:"/login"})
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      getBread(){
        this.breadList = this.$route.matched;
        this.$route.matched.forEach((item,index)=>{
          item.meta.name === '后台首页' ? item.path = '/' : this.$route.path === item.path;
        });
      },
    },
    created(){

      this.getBread();
    }
  }
</script>

<style scoped>
    .main{
        display: flex;
        flex-direction: column;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .header{
        height: 60px;
        display: flex;
        justify-content: space-between;
        background-color:#545c64
    }
    .body{
        height: calc(100% - 60px);
        display: flex;
        flex-direction: row;
    }
    .left-menu{
        width: 200px;
        height: 100%;
        background-color:#545c64
    }
    .right-content{
        width: calc(100% - 200px);
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    .top{
        height: 60px;
        width: 100%;
        padding-left: 20px;
        padding-right: 10px;
    }
    .bread{
        line-height: 60px;
    }
    .middle{
        height: 100%;
        width: 100%;
        padding-left: 10px;
        padding-right: 10px;
    }
    .footer{
        height: 60px;
        width: 100%;
        background-color:gray;
        text-align: center;
        color: black;
        line-height: 60px;
    }
    .logo{
        text-align: center;
        line-height: 60px;
        color: #fff;
        height: 100%;
        width: 200px;
        background-color: gray;
    }
    .header-menu{
        display: flex;
        justify-content: flex-end;
        width: 205px;
        height: 100%;

    }
    .el-submenu .el-menu-item{
        width: 200px;
    }
    .el-submenu{
        width: 200px;
    }
    .el-menu-item{
        width: 200px;
    }
    .el-menu-vertical-demo .el-menu{
        height: 100%;
    }
</style>