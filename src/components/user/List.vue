<template>
    <div style="width: 100%">
        <el-form :inline="true" :model="searchForm" class="demo-form-inline">
            <el-form-item label="用户名">
                <el-input v-model="searchForm.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="searchForm.status" placeholder="请选择状态">
                    <el-option label="全部" value=""></el-option>
                    <el-option label="启用" value="1"></el-option>
                    <el-option label="禁用" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-date-picker
                        value-format="timestamp"
                        v-model="searchForm.date"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table
                :data="tableData"
                :border = "true"
                :header-row-style="cellStyle"
                style="width: 100%">
            <el-table-column
                    label="#"
                    prop="id"
            >
            </el-table-column>
            <el-table-column
                    label="用户名"
                    prop="username"
            >
            </el-table-column>
            <el-table-column
                    prop="date"
                    label="时间">
            </el-table-column>
            <el-table-column
                    label="状态"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.status"
                            @change="handleStatus(scope.$index,scope.row)"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-button type="success" size="mini" @click="userFormVisible = true">添加</el-button>

        <el-dialog title="添加用户" :visible.sync="userFormVisible" :modal-append-to-body='false'>
            <el-form :model="userForm" status-icon :rules="rules" ref="userForm" label-width="100px" class="demo-ruleForm" labelPosition="left">
                <el-form-item label="用户名" prop="username" >
                    <el-input type="text"  v-model="userForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch
                            v-model="userForm.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitUserForm('userForm')" size="mini">确 定</el-button>
                <el-button @click="userFormVisible = false" size="mini">取 消</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import utils from "@/utils/utils"
    import Api from "@/interface/api"
    export default {
    name: "UserList",
      data() {
        return {
          searchForm: {
            username: '',
            status  : '',
            date    : [],
          },
          tableData: [],
          userFormVisible:false,
          userForm:{
            username: "",
            password: "",
            status  : true,
          },
          rules:{
            username:[
              {required:true,trigger:"blur",message:"用户名不能为空"}
            ],
            password:[
              {required:true,trigger:"blur",message:"密码不能为空"}
            ],
            status:[
              {required:true,trigger:"blur",message:""}
            ]
          },
        }
      },
      methods:{
        onSubmit() {
          let self = this;
          this.$http.post(Api.url.searchUser.path,this.searchForm).then((res)=>{
            self.tableData = [];
            if (res.body.status === 1){
              for(var i in res.body.data){
                self.tableData.push({
                  id       : res.body.data[i]["id"],
                  username : res.body.data[i]["username"],
                  status   : (res.body.data[i]["status"] == 1) ? true : false,
                  date     : res.body.data[i]["create_time"]
                })
              }
            }
          });
        },
        handleStatus(index,row){
          let self = this;
          this.$http.post(Api.url.editUserStatus.path,{id:row.id,status:row.status ^ 0},{emulateJSON:true}).then((res)=>{
            if (res.body.status === 1){
              self.tableData[index]["status"] = (row.status ^ 0) ? true : false;
              self.$message({
                type:"success",
                message:res.body.msg
              })
            }else{
              self.$message({
                type:"error",
                message:res.body.msg
              })
            }
          });
        },
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          let self = this;
          this.$confirm('你确定要删除吗?', '提示', {
            cancelButtonText: '取消',
            confirmButtonText: '确定',
            customClass: 'my-confirm',
            type: 'warning'
          }).then(() => {
            this.$http.post(Api.url.delUser.path,{id:row.id},{emulateJSON:true}).then((res)=>{
              if(res.body.status === 1){
                self.tableData.splice(index);
                self.$message({
                  type: 'success',
                  message: res.body.msg
                });
              }else{
                self.$message({
                  type: 'error',
                  message:res.body.msg
                });
              }
            });
          }).catch(() => {

          });
        },
        cellStyle({row,rowIndex}){
          return {'font-size':'14px','text-align':"center"}
        },
        submitUserForm(formName){
          let self = this;
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$http.post(Api.url.addUser.path,JSON.stringify(self.userForm)).then((res)=>{
                if(res.body.status === 1){
                  self.$message({
                    type:"success",
                    message:res.body.msg,
                    duration:500
                  });
                  self.tableData.push({
                    username:self.userForm.username,
                    status:self.userForm.status,
                    date  :res.body.data.create_time,
                    id    :res.body.data.id
                  });
                  this.userFormVisible = !this.userFormVisible;
                }else{
                  self.$message({
                    type:"error",
                    message:res.body.msg,
                    duration:500
                  });
                }
              });


            } else {
              return false;
            }
          });
        }
      },
    mounted(){
      let token = utils.utils.getCookie("user-token");
      let self = this;
      if (token){
        this.$http.post(Api.url.userList.path,{},{emulateJSON:true}).then((res)=>{
          if (res.body.status === 1){
            for(let i in res["body"]["data"]){
              let status = false;
              if (res["body"]["data"][i]["status"] === 1){
                status = true
              }
              self.tableData.push({
                username: res["body"]["data"][i]["username"],
                status  : status,
                date    : res["body"]["data"][i]["create_time"],
                id      : res["body"]["data"][i]["id"],
              });
            }
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>