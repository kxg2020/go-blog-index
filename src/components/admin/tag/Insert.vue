<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标签名称" prop="tagName">
                <el-input v-model="ruleForm.tagName"></el-input>
            </el-form-item>
            <el-form-item label="是否启用" prop="status">
                <el-switch v-model="ruleForm.status"></el-switch>
            </el-form-item>
            <el-form-item label="备注" prop="desc" >
                <el-input type="textarea" v-model="ruleForm.desc"></el-input>
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
    name:"Insert",
    data() {
      return {
        ruleForm: {
          tagName:"",
          status:true,
          desc: ''
        },
        rules: {
          tagName: [
            { required: true, message: '请填写标签名称', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let self = this;
            this.$http.post(Api.insertTag.path,{
              "name":this.ruleForm.tagName,
              "status":this.ruleForm.status ? 1 : 0,
              "mark":this.ruleForm.desc
            },{emulateJSON:true}).then((e)=>{
              if(e.body.status === 1){
                this.$message({
                  type:"success",
                  message:e.body.msg,
                  duration:500,
                  onClose:function () {
                    self.$router.push({path:"/tag/list"})
                  }
                });
              }else{
                this.$message({
                  type:"error",
                  message:e.body.msg
                });
              }
            })
          } else {
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>

<style scoped>

</style>