import Vue           from  'vue'
import Router        from  'vue-router'
import Login         from  "@/components/admin/login/Index"
import Index         from  "@/components/admin/index/Index"
import TagInsert     from  "@/components/admin/tag/Insert"
import TagList       from  "@/components/admin/tag/List"
import ArticleList   from  "@/components/admin/article/List"
import ArticleInsert from  "@/components/admin/article/Insert"
import ArticleEdit   from  "@/components/admin/article/Edit"
import UserInsert    from  "@/components/admin/user/Insert"
import UserList      from  "@/components/admin/user/List"
import Admin         from  "@/components/admin/index/Admin"
import Util          from  "@/util/util"
import Api           from  "@/api/interface"

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path:"/",
      name:'/',
      component:Index,
      meta: { requiresAuth: true ,CName:"后台首页"},
      children:[
        {
          path:"index",
          name:"indexIndex",
          component:Admin,
          meta: { requiresAuth: true ,CName:"仪表盘"},
        },
        {
          path:"index/index",
          name:"indexIndex",
          component:Admin,
          meta: { requiresAuth: true ,CName:"仪表盘"},
        },
        {
          path:"tag/insert",
          name:"tagInsert",
          component:TagInsert,
          meta: { requiresAuth: true ,CName:"新增标签"},
        },
        {
          path:"tag/list",
          name:"tagList",
          component:TagList,
          meta:{requiresAuth:true,CName:"标签列表"}
        },
        {
          path:"article/list",
          name:"articleList",
          component:ArticleList,
          meta:{requiresAuth:true,CName:"文章列表"}
        },
        {
          path:"article/insert",
          name:"articleInsert",
          component:ArticleInsert,
          meta:{requiresAuth:true,CName:"新增文章"}
        },
        {
          path:"user/insert",
          name:"userInsert",
          component:UserInsert,
          meta:{requiresAuth:true,CName:"新增用户"}
        },
        {
          path:"user/list",
          name:"userList",
          component:UserList,
          meta:{requiresAuth:true,CName:"用户列表"}
        },
        {
          path:"/article/info",
          name:"articleInfo",
          meta:{requiresAuth:true,CName:"文章详情"}
        },
        {
          path:"/article/edit",
          name:"articleEdit",
          component:ArticleEdit,
          meta:{requiresAuth:true,CName:"文章编辑"}
        },
      ]

    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: { requiresAuth: false,CName:"登陆" }
    },
  ]
});
// 路由守卫,在每次请求中判断是否登录
router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){
    let token = Util.getCookie("user-login-token");
    if(token){
      next()
    }else{
      next({path:"/login"})
    }
  }else{
    next();
  }
});


export default router
