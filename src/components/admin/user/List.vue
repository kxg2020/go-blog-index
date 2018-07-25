<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="ID"
            >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="创建时间"
               >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.create_time }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="用户名"
                 >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>姓名: {{ scope.row.username }}</p>
                        <p>最后登陆时间: {{ scope.row.last_login_time }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.username }}</el-tag>
                        </div>
                    </el-popover>
                </template>
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
                            type="primary"
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--编辑用户-->
        <el-dialog title="编辑用户" :visible.sync="editFormVisible">
            <el-form :model="editTableData">
                <el-form-item label="用户名">
                    <el-input :disabled="true" v-model="editTableData.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input type="password" v-model="editTableData.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="创建时间" >
                        <el-date-picker
                                v-model="editTableData.create_time"
                                @change="setDateFormat"
                                type="datetime"
                                format="yyyy-MM-dd HH:mm:ss"
                                placeholder="选择日期时间" style="width: 100%">
                        </el-date-picker>
                </el-form-item>
                <el-form-item label="状态" >
                    <br>
                    <el-switch
                            v-model="editTableData.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                    </el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleEditSave" size="mini">确 定</el-button>
                <el-button @click="editFormVisible = false" size="mini">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Api from "@/api/interface"
    import Util from "@/util/util"
    export default {
    name:"List",
    data() {
      return {
        tableData: [],
        editTableData:{},
        editFormVisible:false,
      }
    },
    methods: {
      setDateFormat(val){
        this.editTableData.create_time = Util.setTimeFormat(val);
      },
      handleEdit(index, row) {
        this.editTableData = this.tableData[index];
        this.editTableData.passwordOld = this.tableData[index].password;
        this.editFormVisible = true
      },
      handleEditSave(){
        let self = this;
        this.$http.post(Api.saveUserEdit.path,{
          id:this.editTableData.id,
          username:this.editTableData.username,
          create_time:this.editTableData.create_time,
          status:this.editTableData.status,
          password:this.editTableData.password,
          passwordOld :this.editTableData.passwordOld
        },{emulateJSON:true}).then((e)=>{
          if(e.body.status === 1){
            this.$message({
              type:"success",
              message:e.body.msg,
              duration:500,
              onClose(){
                self.$store.commit("LOGOUT");
                self.$router.push({path:"/login"});
              }
            });
          }else{
            this.$message({
              type:"error",
              message:e.body.msg
            });
          }
          this.editFormVisible = false;
        });
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除当前用户,是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          size:"mini"
        }).then(() => {
          this.$http.post(Api.delUser.path,{id:row.id},{emulateJSON:true}).then((e)=>{
            if (e.body.status === 1){
              this.tableData.splice(index,1);
              this.$message({
                type:"success",
                message:e.body.msg
              });
            }else{
              this.$message({
                type:"error",
                message:e.body.msg,
              });
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      handleStatus(index, row) {
        this.$http.post(Api.editUserStatus.path,{"id":row.id,"status":row.status},{emulateJSON:true}).then((e)=>{
          if(e.body.status === 1){
            this.$message({
              type:"success",
              message:e.body.msg
            })
          }else{
            this.$message({
              type:"error",
              message:e.body.msg
            })
          }
        })
      },

    },
    mounted(){
      this.$http.get(Api.getUserList.path,{}).then((e)=>{
        if(e.body.status === 1){
          for(let i in e.body.data){
            if(e.body.data[i].status === 1){
              e.body.data[i].status = true
            }else {
              e.body.data[i].status = false
            }
          }
          this.tableData = e.body.data;
        }
      },(e)=>{
        console.log(e)
      });
    },

  }
</script>

<style scoped>

</style>