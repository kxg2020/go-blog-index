<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    label="#"
            >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="标签名称"
                    >
                <template slot-scope="scope">
                    <el-popover trigger="hover" placement="top">
                        <p>标签: {{ scope.row.tag_name }}</p>
                        <p>备注: {{ scope.row.mark === "" ? "暂无" : scope.row.mark }}</p>
                        <div slot="reference" class="name-wrapper">
                            <el-tag size="medium">{{ scope.row.tag_name }}</el-tag>
                        </div>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column
                    label="标签状态"
            >
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.status"
                            @change="tagStatusChange(scope.$index,scope.row)"
                    >
                    </el-switch>
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
        <el-dialog title="编辑标签" :visible.sync="editFormVisible">
            <el-form :model="editTableData" status-icon :rules="editRules" ref="editTableData" label-width="100px" class="demo-ruleForm">
                <el-form-item label="标签名称" prop="tag_name">
                    <el-input type="text" v-model="editTableData.tag_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="标签状态" prop="status">
                    <el-switch
                            v-model="editTableData.status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                    >
                    </el-switch>
                </el-form-item>
                <el-form-item label="创建时间" prop="create_time">
                    <el-date-picker
                            v-model="editTableData.create_time"
                            type="datetime"
                            @change="setTime"
                            placeholder="创建时间"
                            align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="submitForm('editTableData')">提交</el-button>
                    <el-button size="small" @click="editFormVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
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
        editFormVisible:false,
        tableData: [],
        editTableData:{},
        editRules:{
          create_time:[
            { required:true, trigger: 'blur',message:"创建时间必须填写" }
          ],
          tag_name:[
            { required:true, trigger: 'blur',message:"标签名称不能为空" }
          ],
          status:[
            { required:true, trigger: 'blur',message:"状态不能为空" }
          ]
        },
      }
    },
    methods: {
      handleEdit(index, row) {
        let id = row.id;
        let self = this;
        (self.tableData).forEach(function (value,key) {
          if(value.id === id){
            self.editTableData = (self.tableData)[key]
          }
        });
        this.editFormVisible = true;
      },
      handleDelete(index, row) {
        let self = this;
        this.$confirm('此操作将永久删除当前标签,是否继续?', '提示', {
          cancelButtonText: '取消',
          confirmButtonText: '确定',
          type: 'warning',
          size:"mini"
        }).then(() => {
          this.$http.post(Api.delTag.path,{id:row.id},{emulateJSON: true}).then((e)=>{
            if(e.body.status === 1){
              self.tableData.splice(index,1);
              this.$message({
                type:"success",
                message:e.body.msg
              });
              return false
            }
            this.$message({
              type:"error",
              message:e.body.msg
            });
          },(error)=>{

          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });

      },
      tagStatusChange(index,row){
        let status = row.status ? 1 : 0;
        this.$http.post(Api.editTagStatus.path+"/"+row.id,{
          status:status,
          id:row.id
        },{emulateJSON:true}).then((e)=>{
          if(e.body.status === 1){
            this.$message({
              type:"success",
              message:e.body.msg
            });
            return false
          }
          this.$message({
            type:"error",
            message:e.body.msg
          });
        });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$http.post(Api.editTag.path,{
              id:this.editTableData.id,
              status:this.editTableData.status ? 1 : 0,
              create_time:this.editTableData.create_time,
              mark:this.editTableData.mark,
              tag_name:this.editTableData.tag_name
            },{emulateJSON:true}).then((e)=>{
              this.editFormVisible = false;
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
          } else {
            return false;
          }
        });
      },
      setTime(val){
        this.editTableData.create_time = Util.setTimeFormat(val);
      },
    },
    mounted(){
      this.$http.get(Api.getTagList.path).then((e)=>{
        if(e.body.status === 1){
          for (let key in e.body.data){
            if(e.body.data[key].status === 1){
              e.body.data[key].status = true
            }else{
              e.body.data[key].status = false
            }
          }
          this.tableData = e.body.data;
        }
      },(e)=>{

      })
    },
    computed:{

    }
  }
</script>

<style scoped>

</style>