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
        <el-tooltip effect="dark"
                    content="编辑"
                    placement="top"
                    :enterable="false">
          <el-button type="primary"
                     icon="el-icon-edit"
                     size="mini"
                     @click="showEditDialog()"></el-button>
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
        width="50%"
        v-model="editDialogVisible"
        @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.st_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="st_email">
          <el-input v-model="editForm.st_email" ></el-input>
        </el-form-item>
        <el-form-item label="高考分数">
          <el-input v-model="editForm.st_mark " disabled></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="st_mobile">
          <el-input v-model="editForm.st_mobile" ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="editDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="editDialogInfo">确 定</el-button>
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
      editDialogVisible: false,
      editForm:{},
      editFormRules:{
        st_email:[
          { required: true, message: '请输入用户邮箱', trigger: 'blur'},
         // { validator: checkEmail, tigger: 'blur'},
        ],
        st_mobile:[
          { required: true, message: '请输入用户手机', trigger: 'blur'},
          //{ validator: checkMobile, tigger: 'blur'},
        ]

      }
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
    async showEditDialog(){
      this.editDialogVisible = true
      /*
      const {data: res} = await this.$http.get('studentList/' + id)


      if (res.meta.status !== 200){
        return this.$message.error('查询用户信息失败')
      }
      this.editForm = res.data
      */
    },
    editDialogClosed(){
      this.$refs.editFormRef.resetFields()
    },
    editDialogInfo(){
      this.$refs.editFormRef.validate(valid=>{
        if(!valid){
          return
        }
        else{
          this.editDialogVisible = false
        }
      })
    }
  }
}
</script>

<style>

</style>