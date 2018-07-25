<template>
    <div>
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="简介:">
                            <span>{{ props.row.content_text }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                    label="#"
                    prop="id">
            </el-table-column>
            <el-table-column
                    label="文章标题"
                    prop="title">
            </el-table-column>
            <el-table-column
                    label="文章标签"
                    prop="tag_name">
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    prop="create_time">
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    <el-switch
                            v-model="scope.row.status"
                            @change="articleStatusChange(scope.$index,scope.row)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="primary"
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit "></i></el-button>
                    <el-button
                            type="info"
                            size="mini"
                            @click="handleView(scope.$index, scope.row)"><i class="el-icon-view"></i></el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i></el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="block" style="margin-top: 5px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
        <div>
            <el-dialog
                    :fullscreen="true"
                    title="文章预览"
                    :visible.sync="centerDialogVisible"
                    width="72%"
                    center>
                <span></span>
                <div style="margin: 0 auto">
                    <div v-html="centerDialogData" v-highlight>
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">

  </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import Api from "@/api/interface"

  export default {
    name: "List",
    data() {
      return {
        tableData: [],
        pageSize:10,
        pageNum:1,
        total:0,
        centerDialogVisible:false,
        centerDialogData:""
      }
    },
    methods:{
      handleEdit(index,row){
        this.$router.push({path:"/article/edit",query:{id:row.id}});
      },
      handleDelete(index,row){
        this.$confirm('此操作将永久删除当前文章,是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          size:"mini"
        }).then(() => {
          this.$http.get(Api.delArticle.path+"/"+row.id).then((e)=>{
            if (e.body.status === 1){
              this.tableData.splice(index,1);
              this.$message({
                type:"success",
                message:e.body.msg
              });
              this.getArticleList();
            }else{
              this.$message({
                type:"error",
                message:e.body.msg
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      },
      handleView(index,row){
        this.$http.get(Api.getArticleInfo.path+"/"+row.id).then((e)=>{
          if(e.body.status === 1){
            this.centerDialogData = e.body.data.content
          }
        });
        this.centerDialogVisible = true
      },
      articleStatusChange(index,row){
        this.$http.post(Api.editArticleStatus.path,{
          id:row.id,
          status:row.status ? 1 : 0,
        },{emulateJSON:true}).then((e)=>{
          if (e.body.status === 1){
            this.$message({
              type:"success",
              message:e.body.msg
            });
          }else{
            this.$message({
              type:"error",
              message:e.body.msg
            });
          }
        });
      },
      handleSizeChange(val) {
        this.$http.post(Api.getArticleList.path,{pgNum:this.pageNum,pgSize:val},{emulateJSON:true}).then((e)=>{
          if (e.body.status === 1){
            for(let key in e.body.data.article){
              if (e.body.data.article[key].status === 1){
                e.body.data.article[key].status = true
              }else{
                e.body.data.article[key].status = false
              }
            }
            this.tableData = e.body.data.article;
          }
        });
      },
      handleCurrentChange(val) {
        this.$http.post(Api.getArticleList.path,{pgNum:val,pgSize:this.pageSize},{emulateJSON:true}).then((e)=>{
          if (e.body.status === 1){
            for(let key in e.body.data.article){
              if (e.body.data.article[key].status === 1){
                e.body.data.article[key].status = true
              }else{
                e.body.data.article[key].status = false
              }
            }
            this.tableData = e.body.data.article;
          }
        });
      },
      getArticleList(){
        this.$http.post(Api.getArticleList.path,{pgNum:this.pageNum,pgSize:this.pageSize},{emulateJSON:true}).
        then((e)=>{
          if (e.body.status === 1){
            for(let key in e.body.data.article){
              if (e.body.data.article[key].status === 1){
                e.body.data.article[key].status = true
              }else{
                e.body.data.article[key].status = false
              }
            }
            this.tableData = e.body.data.article;
            this.total = e.body.data.total;
          }
        });
      }
    },
    mounted(){
      this.getArticleList()
    },
  }
</script>

<style scoped>

</style>
