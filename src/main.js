// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from "./vuex/store"
import {
  Form,FormItem,Input,Button,Message,Menu,MenuItem,Submenu,Row,Col,MenuItemGroup,Breadcrumb,BreadcrumbItem,
  Select,DatePicker,Checkbox,Option,TimePicker,Switch,CheckboxGroup,RadioGroup,Radio
} from 'element-ui';
import resource from "vue-resource"
import 'element-ui/lib/theme-chalk/index.css';
import utils from "./utils/utils"

Vue.prototype.$ELEMENT = { size: 'small' };
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Row);
Vue.use(Col);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Select);
Vue.use(DatePicker);
Vue.use(Checkbox);
Vue.use(Option);
Vue.use(TimePicker);
Vue.use(Switch);
Vue.use(CheckboxGroup);
Vue.use(RadioGroup);
Vue.use(Radio);
Vue.prototype.$message   = Message;
Vue.config.productionTip = false;
Vue.use(resource);

Vue.http.interceptors.push((request,next)=>{
  request.headers.set('Authorization',utils.utils.getCookie("user-token"));
  request.headers.set('Username',localStorage.getItem("username"));
  request.headers.set('UserOnline',utils.utils.getCookie("user-online"));
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
  components: { App },
  template: '<App/>'
});
