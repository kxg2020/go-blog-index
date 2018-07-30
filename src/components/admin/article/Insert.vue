<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules" >
            <el-form-item label="文章标题" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="文章标签" prop="tag_id" >
                <el-select v-model="form.tag_id" placeholder="请选择标签" style="width: 100%">
                    <el-option v-for="(value,index) in tag" :key="index" :label="value.tag_name" :value="value.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章简介" prop="text">
                <el-input type="textarea" v-model="form.text"></el-input>
            </el-form-item>
            <el-form-item label="文章正文" prop="content">
                <textarea id="editor" v-model="form.content" name="content" rows="10" cols="80"></textarea>
            </el-form-item>
            <el-form-item label="文章封面" prop="status">
                <el-upload
                        :action="url"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :limit="1"
                        :on-exceed="stackOverflow"
                        name='upload'
                        :with-credentials="true"
                        accept='jpg,png'
                        :headers="headers"
                        :on-success="onSuccess"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否启用" prop="status">
                <el-switch v-model="form.status"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="mini" @click="onSubmit('form')">立即创建</el-button>
                <el-button size="mini" v-on:click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
  import CKEDITOR from "CKEDITOR"
  import Api from "@/api/interface"
  import Util from "@/util/util"
  export default {
    name:"Insert",
    mounted(){
      CKEDITOR.replace("editor", {height: "300px", width: "100%", toolbar: "Full"});
      // 请求标签
      this.$http.get(Api.getTagList.path).then((e)=>{
        this.tag = e.body.data
      });
    },
    data() {
      return {
        url:Api.uploadCover.path,
        headers:{Authorization:Util.getCookie("user-login-token")},
        form: {
          title: '',
          tag_id: '',
          create_time: '',
          status: true,
          content:"",
          text:"",
          img_url:""
        },
        tag:[],
        rules:{
          title:[
            {required:true,trigger:"blur",message:"文章标题不能为空"}
          ],
          tag_id:[
            {required:true,trigger:"blur",message:"文章标签不能为空"}
          ],
          content:[
            {required:true,trigger:"blur",message:"文章内容不能为空"}
          ],
          text:[
            {required:true,trigger:"blur",message:"文章简介不能为空"}
          ]
        }
      }
    },
    methods: {
      stackOverflow(){
        this.$message({
          type:"error",
          message:"封面图最多上传一张"
        })
      },
      onSuccess(response, file, fileList){
        this.form.img_url = response.url;
        this.$message({
          type:"success",
          message:response.msg
        });
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleRemove(){

      },
      onSubmit(formName) {
        this.form.content = CKEDITOR.instances.editor.getData();
        let self = this;
        this.$refs[formName].validate((valid)=>{
          if(valid){
            this.$http.post(Api.insertArticle.path,{
              "title"  : self.form.title,
              "tag_id" : self.form.tag_id,
              "status" : self.form.status ? 1 : 0,
              "content": self.form.content,
              "text"   : self.form.text.substring(0,300),
              "img_url": self.form.img_url,
            },{emulateJSON:true}).then((e)=>{
              if (e.body.status === 1){
                this.$message({
                  type:"success",
                  message:e.body.msg,
                  duration:500,
                  onClose:function () {
                    self.$router.push({path:"/article/list"});
                  }
                });
              }else{
                this.$message({
                  type:"error",
                  message:e.body.msg
                });
              }
            });
          }else{
            return false;
          }
        });
      },
      resetForm(formName){
        this.$refs[formName].resetFields()
      }
    },
  }
</script>

<style scoped>

</style>