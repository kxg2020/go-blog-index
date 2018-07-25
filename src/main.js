// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Resource from "vue-resource"
import store from '@/store/store'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Util          from  "@/util/util"
Vue.directive('highlight', (el) => {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
});
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Resource);
Vue.http.interceptors.push((request,next)=>{
  request.headers.set('Authorization',Util.getCookie("user-login-token"));
  next(function(response){
    if(response.body.status === 2){
      router.push({path: '/login'})
    }else{
      return  response;
    }
  });
});

new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
});
