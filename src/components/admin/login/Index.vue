<template>
    <div>
        <div class="head">
            &nbsp;
        </div>
        <div>
            <el-row>
                <el-col :span="8">
                    &nbsp;
                </el-col>
                <el-col :span="8">
                    <div  class="main">
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="账户" prop="username">
                                <el-input v-model="ruleForm.username"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input type="password" v-model="ruleForm.password" auto-complete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary"  size="small" @click="submitForm('ruleForm')">提交</el-button>
                                <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
                <el-col :span="8">
                    &nbsp;
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import Api from "@/api/interface"
import Util from "@/util/util"
  export default {
    name:"Index",
    data() {
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('密码不能为空'));
        }  else {
          callback();
        }
      };
      let validateUser = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('用户名不能为空'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          username:"",
          password:""
        },
        rules: {
          username: [
            { validator: validateUser, trigger: 'blur',required:true }
          ],

          password: [
            { validator: validatePass, trigger: 'blur',required:true }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        let self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(Api.loginValidate.path,this.ruleForm,{emulateJSON: true}).then(
                (response)=>{
                 if(response.body.status === 1){
                   self.$store.commit("LOGIN",response);
                   localStorage.setItem("username",response.body.data.username);
                  this.$message({
                     type:"success",
                     message:response.body.msg,
                    duration:500,
                     onClose:function () {
                       self.$router.push({path:"/index/index"});
                     }
                   });
                 }else{
                   this.$message({
                     type:"error",
                     message:response.body.msg,
                   })
                 }
                },(error)=>{
                }
              );
          }else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
    created(){
      window.addEventListener("keydown",(key)=>{
        if(key.keyCode === 13){
          this.submitForm('ruleForm');
        }
      })
    }
  }
</script>

<style scoped>
.head{
    height: 200px;
}
    .main{
        border: 1px solid gray;
        padding-right: 50px;
        padding-top: 40px;
        border-radius: 4px;
    }
</style>