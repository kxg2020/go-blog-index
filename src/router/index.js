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
import Image         from  "@/components/admin/article/GetImage"
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
      meta: { requiresAuth: true,CName:"登陆" }
    },
    {
      path:"/getImage",
      name:"getImage",
      component:Image,
      meta:{requiresAuth:false,CName:"上传图片"}
    }
  ]
});
// 路由守卫,在每次请求中判断是否登录
router.beforeEach((to, from, next) => {
  if(to.matched.some(record=>record.meta.requiresAuth)){
    let userToken = Util.getCookie("user-login-token");
    // 每个路由都进行token验证,防止恶意输入token
    Vue.http.headers.common['Authorization'] = Util.getCookie("user-login-token");
    if(to.name === 'login'){
      if(userToken !== null){
        // 如果是从首页手动输入地址跳转到登陆页,验证token是否正确,正确就重新跳回首页
        Vue.http.post(Api.adminRoot.path,{},{emulateJSON:true}).then((e)=>{
          if(e.body.status === 2){
            next();
          }else{
            next("/index/index")
          }
        });
      }else{
        next()
      }
    }else{
      Vue.http.post(Api.adminRoot.path,{},{emulateJSON:true}).then((e)=>{
        if(e.body.status === 2){
          next("/login");
        }else{
          next()
        }
      });
    }
  }
});


export default router
