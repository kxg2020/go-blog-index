<template>
  <div id="app" style="height: 100%; width: 100%">
    <router-view></router-view>
  </div>
</template>

<script>
  import Api from "@/interface/api"
export default {
  name: 'App',
  data(){
    return{
    }
  },

}
</script>

<style>
  html, body{
    width: 100%;
    height: 100%;
  }
  a{
    text-decoration: none;
  }
  body{
    min-width: 768px;
  }
*{
  margin:  0;
  padding: 0;
  box-sizing: border-box;
}
.my-confirm .el-message-box__btns .el-button{
  padding: 7px 15px;
  font-size: 12px;
  border-radius: 3px;
}
</style>
