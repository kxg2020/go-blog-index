<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" >
                <el-input type="password" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="status">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button size="mini" @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>
    import Api from "@/api/interface"
  export default {
    name: "Insert",
    data(){
      return{
        ruleForm:{
          username : "",
          password : "",
          status   : true
        },
        rules:{
          username:[
            {required:true,trigger:"blur",message:"用户名不能为空"}
          ],
          password:[
            {required:true,trigger:"blur",message:"密码不能为空"}
          ],
        }
      }
    },
    methods:{
      submitForm(formName){
        let self = this;
        this.$refs[formName].validate((valid)=>{
          if(valid){
            this.$http.post(Api.insertUser.path,{
              username : self.ruleForm.username,
              password : self.ruleForm.password,
              status   : self.ruleForm.status ? 1 : 0
            },{emulateJSON:true}).then((e)=>{
              if(e.body.status === 1){
                this.$message({
                  type:"success",
                  message:e.body.msg,
                  duration:500,
                  onClose(){
                    self.$router.push({path:"/user/list"})
                  }
                });
              }else{
                this.$message({
                  type:"error",
                  message:e.body.msg
                });
              }
            })
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>