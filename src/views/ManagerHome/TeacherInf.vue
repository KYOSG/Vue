<template>
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
        <el-input placeholder="请输入内容"
                  v-model="queryInfo.query"
                  clearable @clear="getTeacherList">
          <template #append @click="getTeacherList">
            <el-button icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <!--用户列表-->
    <el-table
        :data="teacherList"
        border teacherripe
        highlight-current-row>
      <el-table-column label="序号" type="index" width="50px"></el-table-column>
      <el-table-column label="姓名" prop="teacher_name"></el-table-column>
      <el-table-column label="密码" prop="teacher_password"></el-table-column>
      <el-table-column label="邮箱" prop="teacher_email"></el-table-column>
      <el-table-column label="电话" prop="teacher_mobile"></el-table-column>
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
        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false" @click="removeTeacher">
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
    <!--添加老师信息编辑对话框-->
    <el-dialog
        title="老师信息编辑"
        width="50%"
        v-model="editDialogVisible"
        @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.teacher_name" disabled></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="editForm.teacher_password" ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="teacher_email">
          <el-input v-model="editForm.teacher_email" ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="teacher_mobile">
          <el-input v-model="editForm.teacher_mobile" ></el-input>
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
  name: "TeacherInf",
  data(){
    //邮箱验证规则
    const checkEmail = (rule, value, cb) => {
      //邮箱验证正则表达式
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/

      if (regEmail.test(value)) {
        return cb()
      }

      cb(new Error('请正确输入邮箱'))
    };

    const checkMobile = (rule, value, cb) => {
      const regMobile = /^(0｜86｜17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/

      if (regMobile.test(value)) {
        return cb()
      }

      cb(new Error('请正确输入电话号码'))
    };

    return{

      //用户列表
      queryInfo:{
        query:'',
        pageSum: 1,
        pageSize: 1,
      },
      teacherList: [{
        "id": 25,
        "teacher_name": "张三",
        "teacher_email": "zsdasdad@asda.com",
        "teacher_password": "610",
        "teacher_mobile": "12236468825",
      },{
        "id": 26,
        "teacher_name": "里斯本",
        "teacher_email": "zsdasdad@asda.com",
        "teacher_password": "610",
        "teacher_mobile": "12236468825",
      }],
      total: 0,
      editDialogVisible: false,
      editForm:{},
      editFormRules:{
        teacher_email:[
          { required: true, message: '请输入用户邮箱', trigger: 'blur'},
          { validator: checkEmail, tigger: 'blur'},
        ],
        teacher_mobile:[
          { required: true, message: '请输入用户手机', trigger: 'blur'},
          { validator: checkMobile, tigger: 'blur'},
        ]

      }
    }
  },
  created() {
    this.getTeacherList()
  },
  methods:{
    async getTeacherList(){
      const { data: res }  = await this.$http.get('teacherList', {
        params: this.queryInfo
      })
      if (res.meta.status !==200){
        return this.$message.error('获取老师列表失败')
      }
      this.teacherList = res.data.teacherList
      this.total = res.data.total
    },

    handleSizeChange(newSize){
      this.queryInfo.pageSize = newSize
      this.getTeacherList()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pageSum = newPage
      this.getTeacherList()
    },
    async showEditDialog(){
      this.editDialogVisible = true
      /*
      const {data: res} = await this.$http.get('teacherList/' + id)


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
      this.$refs.editFormRef.validate(async valid => {
        if (!valid)
          return;
        const {data: res} = await this.$http.put('teacherList/' + this.editForm.id, {
          teacher_email: this.editForm.teacher_email,
          teacher_mobile: this.editForm.teacher_mobile
        })

        if (res.meta.status !== 200) {
          return this.$message.error('更新用户信息失败')
        }

        this.editDialogVisible = false

        await this.getTeacherList()

        this.$message.success('更新用户信息成功')
      })
    },
    removeTeacher(){
      this.$confirm('此操作将永久删除该老师信息, 是否继续?', '提示', {
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

</style>


