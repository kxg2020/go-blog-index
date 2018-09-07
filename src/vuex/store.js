import Vue from "vue"
import Vuex from "vuex"
import utils from "../utils/utils"
Vue.use(Vuex);

const actions = {};

const state = {};

const getters = {};

const mutations = {
  LOGIN(state,response){
    utils.utils.setCookie("user-token",
      response.headers.get("user-token"),
      response.headers.get("user-expire"),
    );
    utils.utils.setCookie("user-online",
      response.headers.get("user-online"),
      response.headers.get("user-expire"),
    )
  },
  LOGOUT(state,token){
    utils.utils.delCookie("user-token");
    utils.utils.delCookie("user-online");
    localStorage.removeItem("username");
  }
};
const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});
export default {
  name:"store",
  store
}