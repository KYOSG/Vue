<template>
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
    <el-input placeholder="请输入内容"
    v-model="queryInfo.query"
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
      <el-table-column label="性别" prop="st_email"></el-table-column>
      <el-table-column label="高考分数" prop="st_mark"></el-table-column>
      <el-table-column label="电话" prop="st_mobile"></el-table-column>
      <el-table-column label="操作" >
        <el-tooltip effect="dark" content="编辑" placement="top" :enterable="false">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
        </el-tooltip>
        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false">
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
        </el-tooltip>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pageSum"
        :page-sizes="[1, 50, 100, 200]"
        :page-size="queryInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
<!--添加学生信息编辑对话框-->
    <el-dialog
        title="学生信息编辑"
        v-model="dialogVisible"
        width="30%">
      <span>这是一段信息</span>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
      </template>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "StudentInt",
  data(){
    return{
      //用户列表
      queryInfo:{
        query:'',
        pageSum: 1,
        pageSize: 1,
      },
      studentList: [{
        "id": 25,
        "st_name": "张三",
        "st_email": "zsdasdad@asda.com",
        "st_mark": "610",
        "st_mobile": "12236468825",
      },{
          "id": 26,
          "st_name": "里斯本",
          "st_email": "zsdasdad@asda.com",
          "st_mark": "610",
          "st_mobile": "12236468825",
      }],
      total: 0,
      dialogVisible: false
    }
  },
  created() {
    this.getStudentList()
  },
  methods:{
    async getStudentList(){
      const { data: res }  = await this.$http.get('studentList', {
        params: this.queryInfo
      })
      if (res.meta.status !==200){
        return this.$message.error('获取学生列表失败')
      }
      this.studentList = res.data.studentList
      this.total = res.data.total
    },

    handleSizeChange(newSize){
      this.queryInfo.pageSize = newSize
      this.getStudentList()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pageSum = newPage
      this.getStudentList()
    },
  }
}
</script>

<style>

</style>