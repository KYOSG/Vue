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
    <el-input placeholder="请输入用户名"
    v-model="queryInfo.query"
              clearable @clear="getStudentList">
      <template #append @click="getStudentList">
        <el-button icon="el-icon-search"></el-button>
      </template>
    </el-input>
<div class="editButton">
  <el-tooltip effect="dark"
              content="编辑"
              placement="top"
              :enterable= false>
    <el-button type="primary"
               icon="el-icon-edit"
               size="mini"
               @click="showEditDialog"
               class="edit"></el-button>
  </el-tooltip>
  <el-tooltip effect="dark" content="删除" placement="top" :enterable=false @click="removeSt">
    <el-button type="danger" icon="el-icon-delete" size="mini" class="del"></el-button>
  </el-tooltip>
</div>
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
        v-model="editDialogVisible"
        width="30%"
        :before-close="editDialogClosed">
      <el-form-item label="活动名称">
        <el-input v-model="studentList.st_name"></el-input>

      </el-form-item> <el-form-item label="活动名称">
      <el-input v-model="studentList.st_email"></el-input>

    </el-form-item> <el-form-item label="活动名称">
      <el-input v-model="studentList.st_name"></el-input>

    </el-form-item> <el-form-item label="活动名称">
      <el-input v-model="studentList.st_name"></el-input>

    </el-form-item> <el-form-item label="活动名称">
      <el-input v-model="studentList.st_name"></el-input>

    </el-form-item>
      <template #footer>
    <span class="dialog-footer">
      <el-button @click="editDialogClosed">取 消</el-button>
      <el-button type="primary" @click="editDialogClosed">确 定</el-button>
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
        pageSum: '',
        pageSize: '',
      },
      studentList: [],
      total: 0,
      editDialogVisible: false,
    }
  },
  mounted() {
    this.$http({
      method:'get',
      url:'studentList',
      params:this.studentList
    }).then(res=>{
      if (res.data.status !==200){
        this.$message.error('获取学生列表失败');
      }
      this.studentList = res.data.studentList;
      this.total = res.data.total;
    })
  },
  methods:{
    getStudentList(){
      this.$http({
        method:'get',
        url:'studentList',
        params:this.studentList
      }).then(res=>{
        this.$message.error('获取学生列表失败');
        if (res.data.status ===200){
          this.studentList = res.data.studentList;
          this.total = res.data.total;
        }
      })
    },
    handleSizeChange(newSize){
      this.queryInfo.pageSize = newSize;
      this.getStudentList();
    },
    handleCurrentChange(newPage){
      this.queryInfo.pageSum = newPage;
      this.getStudentList();
    },
    showEditDialog(id){
      console.log(id);
      this.editDialogVisible = true;
      /*
      const {data: res} = await this.$http.get('studentList/' + id)


      if (res.meta.status !== 200){
        return this.$message.error('查询用户信息失败')
      }
      this.editForm = res.data
      */
    },
    editDialogClosed(){
      this.editDialogVisible = false;
      //this.$refs.editFormRef.resetFields()
    },
    editDialogInfo(){
      this.$refs.editFormRef.validate(async valid => {
        if (!valid)
          return;
        const {data: res} = await this.$http.put('studentList/' + this.editForm.id, {
          st_email: this.editForm.st_email,
          st_mobile: this.editForm.st_mobile
        })

        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败')
        }

        this.editDialogVisible = false

        await this.getStudentList()

        this.$message.success('更新用户信息成功')
      })
    },
    removeSt(){
         this.$confirm('此操作将永久删除该学生信息, 是否继续?', '提示', {
           confirmButtonText: '确定',
           cancelButtonText: '取消',
           type: 'warning'
         }).then(() => {
           this.$message({
             type: 'success',
             message: '删除成功!'
           });
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