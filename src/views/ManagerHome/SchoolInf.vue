<template>
  <!--面包屑导航-->
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/ManagerHome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>院校管理</el-breadcrumb-item>
    <el-breadcrumb-item>院校信息</el-breadcrumb-item>
  </el-breadcrumb>
  <!--卡片-->
  <el-card>
    <!--搜索-->
    <el-row :gutter="20">
      <el-col :span="7">
        <el-input placeholder="请输入内容"
                  v-model="queryInfo.query"
                  clearable @clear="getSchoolList">
          <template #append @click="getSchoolList">
            <el-button icon="el-icon-search"></el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <!--院校列表-->
    <el-table
        :data="schoolList"
        border schoolripe
        highlight-current-row>
      <el-table-column label="序号" type="index" width="50px"></el-table-column>
      <el-table-column label="名称" prop="school_name"></el-table-column>
      <el-table-column label="所在地" prop="school_password"></el-table-column>
      <el-table-column label="主管部门" prop="school_email"></el-table-column>
      <el-table-column label="类型" prop="school_mobile"></el-table-column>
      <el-table-column label="学历层次" prop="school_mobile"></el-table-column>
      <el-table-column label="一流大学建设高校" prop="school_mobile"></el-table-column>
      <el-table-column label="一流学科建设高校" prop="school_mobile"></el-table-column>
      <el-table-column label="研究生院" prop="school_mobile"></el-table-column>
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
        <el-tooltip effect="dark" content="删除" placement="top" :enterable="false" @click="removeSchool">
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
  </el-card>
</template>

<script>
export default {
  name: "SchoolInf",
  data(){
    return{

      //院校列表
      queryInfo:{
        query:'',
        pageSum: 1,
        pageSize: 1,
      },
      schoolList: [{
        "id": 25,
        "school_name": "张三",
        "school_email": "zsdasdad@asda.com",
        "school_password": "610",
        "school_mobile": "12236468825",
      },{
        "id": 26,
        "school_name": "里斯本",
        "school_email": "zsdasdad@asda.com",
        "school_password": "610",
        "school_mobile": "12236468825",
      }],
      total: 0,
      editDialogVisible: false,
      editForm:{},
      editFormRules:{
        school_email:[
          { required: true, message: '请输入院校邮箱', trigger: 'blur'},
        ],
        school_mobile:[
          { required: true, message: '请输入院校手机', trigger: 'blur'},
        ]

      }
    }
  },
  created() {
    this.getSchoolList()
  },
  methods:{
    async getSchoolList(){
      const { data: res }  = await this.$http.get('schoolList', {
        params: this.queryInfo
      })
      if (res.meta.status !==200){
        return this.$message.error('获取院校列表失败')
      }
      this.schoolList = res.data.schoolList
      this.total = res.data.total
    },

    handleSizeChange(newSize){
      this.queryInfo.pageSize = newSize
      this.getSchoolList()
    },
    handleCurrentChange(newPage){
      this.queryInfo.pageSum = newPage
      this.getSchoolList()
    },
    async showEditDialog(){
      this.editDialogVisible = true
      /*
      const {data: res} = await this.$http.get('schoolList/' + id)


      if (res.meta.status !== 200){
        return this.$message.error('查询院校信息失败')
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
        const {data: res} = await this.$http.put('schoolList/' + this.editForm.id, {
          school_email: this.editForm.school_email,
          school_mobile: this.editForm.school_mobile
        })

        if (res.meta.status !== 200) {
          return this.$message.error('更新院校信息失败')
        }

        this.editDialogVisible = false

        await this.getSchoolList()

        this.$message.success('更新院校信息成功')
      })
    },
    removeSchool(){
      this.$confirm('此操作将永久删除该院校信息, 是否继续?', '提示', {
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



