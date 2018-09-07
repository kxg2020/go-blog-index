import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Index from '@/components/index/Index'
import UserList from '@/components/user/List'
import WeChatAdd from '@/components/wechat/Add'
import utils from '@/utils/utils'
Vue.use(Router);
const router = new Router({
  routes: [
    {
      path:"/",
      name:"/",
      component:Index,
      meta:{requireAuth:true,name:"后台首页"},
      children:[
        {
          path:"/user/list",
          name:"User",
          component:UserList,
          meta:{requireAuth:true,name:"用户列表"},
        },
        {
        path:"/wechat/add",
        name:"WeChat",
        component:WeChatAdd,
        meta:{requireAuth:true,name:"新增微信"}
        }
      ]
    },
    {
      path:"/login",
      name:"Login",
      component:Login,
      meta:{requireAuth:false,name:"登陆页面"}
    }
  ]
});
router.beforeEach((to, from, next)=>{
  if(to.meta.requireAuth){
    let token = utils.utils.getCookie("user-token");
    if(token){
      next()
    }else{
      next({path:"/login"})
    }
  }else{
    next()
  }
});
export default router
