const domain = "http://127.0.0.1:8888/v1";
const url = {
  login:{
    path:domain + "/login",
  },
  token:{
    path:domain + "/token"
  },
  userList:{
    path:domain + "/userList"
  },
  addUser:{
    path:domain + "/addUser"
  },
  delUser:{
    path:domain + "/delUser"
  }
};
export default {
  name:"Api",
  url
};