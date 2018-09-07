<template>
    <h3>21231</h3>
</template>

<script>
    import utils from "@/utils/utils"
    import Api from "@/interface/api"
  export default {
    name: "UserList",
    mounted(){
      let token = utils.utils.getCookie("user-token");
      if (token){
        this.$http.post(Api.url.userList.path,{},{emulateJSON:true}).then((res)=>{

        });
      }
    }
  }
</script>

<style scoped>

</style>