const domain = "http://118.24.66.211:8888/admin";

export default {
  name:"Api",
  adminRoot:{
    path:domain + "/check"
  },
  getUserList:{
    path:domain + "/user/list"
  },
  editUserStatus:{
    path:domain + "/user/edit"
  },
  saveUserEdit:{
    path:domain + "/user/saveEdit"
  },
  insertUser:{
    path:domain + "/user/insert"
  },
  delUser:{
    path:domain + "/user/delete"
  },
  getTagList:{
    path: domain + "/tag/list"
  },
  insertTag:{
    path:domain + "/tag/insert",
  },
  editTagStatus:{
    path:domain + "/tag/editStatus",
  },
  editTag:{
    path:domain + "/tag/editTag",
  },
  delTag:{
    path:domain + "/tag/delete",
  },
  loginValidate:{
    path:domain + "/login/validate"
  },
  insertArticle:{
    path:domain + "/article/insert"
  },
  getArticleList:{
    path:domain + "/article/list"
  },
  getArticleInfo:{
    path:domain + "/article/info"
  },
  editArticleStatus:{
    path:domain + "/article/editStatus"
  },
  saveEditArticle:{
    path:domain + "/article/saveEdit"
  },
  delArticle:{
    path:domain + "/article/delete"
  },
  uploadCover:{
    path:domain + "/article/cover"
  }
};

