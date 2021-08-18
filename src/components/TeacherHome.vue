<template slot-scope="scope">
  <!--面包屑导航-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/ManagerHome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>老师信息</el-breadcrumb-item>
  </el-breadcrumb>
  <!--卡片-->
  <el-card>
    <!--搜索-->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入用户名搜索" v-model="Search.searchUsername" clearable @clear="getTeacherList">
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
      <el-table-column label="联系方式" prop="st_mobile"></el-table-column>
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
        pageNum: 1,
        pageSize: 50,
        identity:'teacher'
      },
      studentList: [],
      total: 0,
      Search:{
        searchUsername:''
      }
    }
  },
  mounted() {
    this.getTeacherList()
  },
  methods:{
    getTeacherList(){
      this.$http({
        method:'post',
        url:'/Admin/showUserExceptAdmin',
        data:this.Info
      }).then(res=>{
        console.log(res.data)
        this.$message.success('获取老师列表成功');
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
          this.getTeacherList()
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