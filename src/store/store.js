import Vue from 'vue'
import vuex from 'vuex'
import Util from "@/util/util"
Vue.use(vuex);

const actions = {
};
const getters = {
  getUsername:function(){
    return localStorage.getItem("username");
  },
};
const state = {

};
const mutations = {
  LOGIN(state,response){
    // 数据保存到本地,防止刷新页面数据消失
    Util.setCookie("user-login-token",
      response.headers.get("user-login-token"),
      response.headers.get("user-login-expire"),
      );
  },
  LOGOUT(state,token){
    Util.delCookie("user-login-token");
    localStorage.removeItem("username");
  }
};
export default new vuex.Store({
  state,
  getters,
  mutations,
  actions,
})