<template slot-scope="scope">
  <!--面包屑导航-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/ManagerHome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>学生信息</el-breadcrumb-item>
  </el-breadcrumb>
  <!--卡片-->
  <el-card>
<!--搜索-->
<el-row :gutter="20">
  <el-col :span="7">
    <el-input placeholder="请输入用户名搜索"
    v-model="Info.username"
              clearable @clear="getStudentList">
      <template #append @click="getStudentList">
        <el-button icon="el-icon-search"></el-button>
      </template>
    </el-input>
  </el-col>
</el-row>
    <!--用户列表-->
    <el-table
        :data="studentList"
        border stripe
        highlight-current-row>
      <el-table-column label="序号" type="index" width="50px"></el-table-column>
      <el-table-column label="姓名" prop="st_name"></el-table-column>
      <el-table-column label="邮箱" prop="st_email"></el-table-column>
      <el-table-column label="高考分数" prop="st_mark"></el-table-column>
      <el-table-column label="电话" prop="st_mobile"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-tooltip effect="dark"
                      content="编辑"
                      placement="top"
                      :enterable= false>
            <el-button type="primary"
                       icon="el-icon-edit"
                       size="mini"
                       @click="showEditDialog(scope.row)"
                       class="edit"></el-button>
          </el-tooltip>
          <el-tooltip effect="dark" content="删除" placement="top" :enterable=false @click="removeSt(scope.row)">
            <el-button type="danger" icon="el-icon-delete" size="mini" class="del"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
        @size-change="pageSizeChange"
        @current-change="pageCurrentChange"
        :current-page="Info.pageSum"
        :page-sizes="[1, 50, 100, 200]"
        :page-size="Info.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  name: "StudentInt",
  data(){
    return{
      //用户列表
      Info:{
        username:'',
        pageSum: '',
        pageSize: '',
        identity:'student'
      },
      ID:{
        uid:''
      },
      studentList: [],
      total: 0,
      editDialogVisible: false,
      editForm:{}
    }
  },
  mounted() {
    //this.getStudentList()
  },
  methods:{
    getStudentList(){
      this.$http({
        method:'post',
        url:'/User/showUserExceptAdmin',
        data:this.Info
      }).then(res=>{
        this.$message.error('获取学生列表失败');
        if (res.data.status ===200){
          this.studentList = res.data.studentList;
          this.total = res.data.total;
        }
      })
    },
    pageSizeChange(newSize) {
      if (newSize === null)
        return
      this.Info.pageSize = newSize;
      this.submit();
    },
    pageCurrentChange(newPage) {
      if (newPage === null)
        return
      this.Info.pageNum = newPage;
      this.submit();
    },
    showEditDialog(info){
      this.editDialogVisible = true;
      this.ID.uid = id;
      this.$http({
        method:'post',
        url:'/User/showUserExceptAdmin',
        data:this.ID
      }).then(res=>{
        this.studentList = res.data.studentList;
      })
    },
    removeSt(id){
         this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           this.editDialogVisible = true;
           this.ID.uid = id;
           this.$http({
             method:'post',
             url:'/User/adminUpdateUserInformation',
             data:this.ID
           }).then(res=>{
             this.$message({
               type: 'success',
               message: '删除成功!'
             });
           })
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消删除'
           });
         });
      }
  }
}
</script>

<style>
.editButton{
 position: absolute;
  top: 7%;
  left: 30%;
}

</style>