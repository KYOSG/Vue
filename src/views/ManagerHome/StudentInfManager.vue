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
    <el-input placeholder="请输入用户名搜索" v-model="Search.searchUsername" clearable @clear="getStudentList">
      <template #append >
        <el-button icon="el-icon-search" @click="search"></el-button>
      </template>
    </el-input>
  </el-col>
</el-row>
    <!--用户列表-->
    <el-table
        :data="studentList"
        border stripe
        highlight-current-row>
      <el-table-column label="用户名" prop="username"></el-table-column>
      <el-table-column label="姓名" prop="st_name"></el-table-column>
      <el-table-column label="高考分数" prop="st_mark"></el-table-column>
      <el-table-column label="联系方式" prop="st_mobile"></el-table-column>
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
          <el-tooltip effect="dark" content="删除" placement="top" :enterable=false >
            <el-button type="danger" icon="el-icon-delete" size="mini" class="del" @click="removeSt(scope.row.username)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!--信息编辑-->
    <el-dialog
        title="学生信息编辑"
        v-model="editDialogVisible"
        width="70%">
      <div class="Form">
        <el-form label-width="80px">
          <!--用户名-->
          <el-form-item label="用户名" class="fromItem" prop="Username">
            <el-input v-model="dataChange.username" disabled></el-input>
          </el-form-item>

          <!--姓名-->
          <el-form-item label="姓名" class="fromItem" prop="st_name">
            <el-input v-model="dataChange.st_name" clearable></el-input>
          </el-form-item>

          <!--联系方式-->
          <el-form-item label="联系方式" class="fromItem" prop="st_name">
            <el-input v-model="dataChange.st_mobile" clearable></el-input>
          </el-form-item>

          <!--分数-->
          <el-form-item label="分数" class="fromItem" prop="st_number">
            <el-input v-model.number="dataChange.st_mark" clearable></el-input>
          </el-form-item>
          <!--位次-->
          <el-form-item label="位次" class="fromItem" prop="st_rank">
            <el-input v-model.number="dataChange.st_rank" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitChange">确 定</el-button>
    </span>
      </template>
    </el-dialog>
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
        pageNum: 1,
        pageSize: 50,
        identity:'editor'
      },
      ID:{
        username:''
      },
      studentList: [],
      total: 0,
      editDialogVisible: false,
      editForm:{},
      dataChange:{
        username: '',
        st_name: '',
        st_rank: '',
        st_mobile:'',
        st_mark: '',
        password: '',
      },
      Search:{
        searchUsername:''
      }
    }
  },
  mounted() {
    this.getStudentList()
  },
  methods:{
    getStudentList(){
      this.$http({
        method:'post',
        url:'/Admin/showUserExceptAdmin',
        data:this.Info
      }).then(res=>{
        console.log(res.data)
        this.$message.success('获取学生列表成功');
          this.studentList = res.data.list;
          this.total = res.data.total;

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
      this.dataChange = info;
    },

    submitChange(){
      console.log(this.dataChange)
      this.editDialogVisible = false;
      this.$http({
        method:'post',
        url:'/Admin/adminUpdateUserInformation',
        data: this.dataChange
      }).then(res=>{})
      this.getStudentList()
    },
    removeSt(username){
         this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           this.ID.username = username;

           this.$http({
             method:'post',
             url:'/Admin/dropUserAccount',
             data:this.ID
           }).then(res=>{
             this.$message({
               type: 'success',
               message: '删除成功!'
             });
             this.getStudentList()
           })
         }).catch(() => {
           this.$message({
             type: 'info',
             message: '已取消删除'
           });
         });
      },
    search(){
      this.$http({
        method:'post',
        url:'/Admin/showSingleUserExceptAdmin',
        data: this.Search
      }).then(res=>{
        this.studentList = res.data;
      })

    }
  }
}
</script>

<style>

</style>