<template>
    <div class="main">
        <div class="main-content">
            <div class="login">
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm" v-bind:style="{width:'330px'}" label-position="left">
                    <el-form-item label="用户名" prop="username">
                        <el-input type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')" :style="{width:'100%'}">登陆</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
  import Api from "@/interface/api"
  import utils from "@/utils/utils"
  export default {
    name:"Login",
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          callback();
        }
      };
      const validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else {
          callback();
        }
      };
      return {
        ruleForm: {
          password: '',
          username: '',
        },
        rules: {
          username: [
            {validator:validateUser, trigger: 'blur',required:true}
          ],
          password: [
            {validator:validatePass, trigger: 'blur',required:true}
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        let self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(Api.url.login.path,this.ruleForm,{emulateJSON:true}).then((res)=>{
              if(res.body.status === 0){
                self.$message({
                  type:'error',
                  message:res.body.msg,
                  duration:800
                });
              }else{
                self.$store.store.commit("LOGIN",res);
                localStorage.setItem("username",res.body.data.username);
                self.$message({
                  type:"success",
                  message:res.body.msg,
                  duration:800,
                  onClose(){
                    self.$router.push({path:"/"})
                  }
                })
              }
            });
          } else {
            return false;
          }
        });
      },
    },
    created(){
      let token = utils.utils.getCookie("user-token");
      let self = this;
      if (token){
        this.$http.post(Api.url.token.path,{},{emulateJSON:true}).then((res)=>{
          if(res.body.status === 1){
            self.$router.push({path:"/"});
          }
        });
      }
    }
  }
</script>

<style scoped>
.main{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.main-content{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    width: 400px;
    border-radius: 3px;
    border: 1px solid gray;
}
</style>