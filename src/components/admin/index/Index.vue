<template>
    <div>
        <el-container v-bind:style="{height: fullHeight + 'px' }">
            <el-aside width="200px">
                <div class="head-title">
                    Macarinal
                </div>
                <div >
                    <el-menu
                            :default-active=this.$route.path
                            class="el-menu-vertical-demo"
                            @open="handleOpen"
                            @close="handleClose"
                            v-bind:unique-opened="collapse"
                            background-color="#545c64"
                            text-color="#fff"
                            active-text-color="#ffd04b">
                        <router-link to="/index/index">
                            <el-menu-item index="/index/index">
                                <i class="el-icon-location"></i>
                                <span slot="title">后台首页</span>
                            </el-menu-item>
                        </router-link>
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>用户管理</span>
                            </template>
                            <router-link to="/user/list">
                                <el-menu-item index="/user/list">用户列表</el-menu-item>
                            </router-link>
                            <router-link to="/user/insert">
                                <el-menu-item index="/user/insert">新增用户</el-menu-item>
                            </router-link>
                        </el-submenu>
                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>标签管理</span>
                            </template>
                            <router-link to="/tag/list">
                                <el-menu-item index="/tag/list">标签列表</el-menu-item>
                            </router-link>
                            <router-link to="/tag/insert">
                                <el-menu-item index="/tag/insert">新增标签</el-menu-item>
                            </router-link>
                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>文章管理</span>
                            </template>
                            <router-link to="/article/list">
                                <el-menu-item index="/article/list">文章列表</el-menu-item>
                            </router-link>
                            <router-link to="/article/insert">
                                <el-menu-item index="/article/insert">新增文章</el-menu-item>
                            </router-link>
                        </el-submenu>
                    </el-menu>
                </div>
            </el-aside>
            <el-container>
                <el-header>
                    <div class="head-menu">
                        <div style="float: left">
                            <el-menu
                                    class="el-menu-demo"
                                    mode="horizontal"
                                    @select="handleSelect"
                                    background-color="#545c64"
                                    text-color="#fff"
                                    active-text-color="#ffd04b">
                                <el-submenu index="2">
                                    <template slot="title">
                                        {{username}}
                                    </template>
                                    <el-menu-item index="2-1" @click="logout">退出登陆</el-menu-item>
                                </el-submenu>
                                <el-menu-item index="3">
                                    <el-badge :value="200" :max="99" class="item">
                                        消息
                                    </el-badge>
                                </el-menu-item>
                            </el-menu>
                        </div>
                        <div style="float: right;height: 60px;width: 60px;">
                            <img src="@/assets/1.png" alt="" style="width: 100%;height: 100%;border-radius: 30px">
                        </div>

                    </div>
                </el-header>
                <el-main>
                    <div style="height: 50px;line-height: 50px;">
                        <el-container>
                            <el-row>
                                <el-col :span="24">
                                    <el-breadcrumb>
                                        <el-breadcrumb-item
                                                separator = '/'
                                                v-for = "(item,index)
in breadList"
                                                :key = index
                                                :to="{path:
item.path}">{{item.meta.CName}}

                                        </el-breadcrumb-item>
                                    </el-breadcrumb>
                                </el-col>
                            </el-row>
                        </el-container>
                    </div>
                    <router-view>

                    </router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import Util from "@/util/util"
  export default {
    data () {
      return {
        collapse:true,
        name: "Index",
        username:this.$store.getters.getUsername,
        fullHeight: document.documentElement.clientHeight,
        breadList: ''
      }
    },
    methods:{
      handleOpen(){

      },
      handleClose(){

      },
      handleSelect(){

      },
      getBread(){
        this.breadList = this.$route.matched;
        this.$route.matched.forEach((item,index)=>{
          item.meta.CName === '首页' ? item.path = '/' : this.$route.path === item.path;
        });
      },
      logout(){
        this.$store.commit("LOGOUT");
        this.$router.push({path:'/login'})
      }
    },
    created() {
      this.getBread()
    },
    mounted() {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight;
          that.fullHeight = window.fullHeight
        })()
      }
    },
    watch: {
      '$route'(){
        this.getBread();
      },
      fullHeight (val) {
        if(!this.timer) {
          this.fullHeight = val;
          this.timer = true;
          let that = this;
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    }
  }
</script>

<style scoped>
    .head-title{
        height: 60px;width: 200px;
        text-align: center;
        line-height: 60px;
        color: white;
        font-weight: bolder;
        background-color: black;
    }
    .el-header{
        background-color: #545c64;
        padding: 0;
    }
    .el-footer{
        background-color: #545c64;
    }
    .head-menu {
        float: right;
        width: 250px;height: 60px
    }
    .el-aside{
        background-color: #545c64;
    }

</style>