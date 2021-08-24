<template>
  <div class="Background">
    <el-header class="header">
      <el-menu background-color="#f9844a" text-color="#f7f7f7">
        <el-menu-item @click="Home" class="el-icon-price-tag">首页</el-menu-item>
        <el-menu-item @click="School" class="el-icon-school">院校库</el-menu-item>
        <el-menu-item @click="Major" class="el-icon-files">专业库</el-menu-item>
        <el-menu-item @click="Login" class="el-icon-user">登录</el-menu-item>
        <el-menu-item @click="Signup" class="el-icon-user-solid">注册</el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>专业查询</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>
      <el-card class="test">
        <div>
          <el-space alignment="flex-start" :size="25">
            <!--专业筛选-->
            <div class="schoolPosition">
              <el-space wrap :size="33">
                <span class="demonstration">专业筛选 </span>
                <el-cascader
                    placeholder="试试搜索：计算机类"
                    :options="options"
                    :props="{ multiple: true }"
                    filterable
                    collapse-tags
                    ref="cascadeAddr"
                    clearable
                    @change="submit"></el-cascader>
              </el-space>
            </div>
            <!--层级-->
            <div>
              <el-space  wrap :size="43">
                <span class="demonstration">专业层级 </span>
                <el-radio-group v-model="selForm.level1_name" @change="submit">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="本科"></el-radio-button>
                  <el-radio-button label="专科"></el-radio-button>
                </el-radio-group>
              </el-space>
            </div>
            <!--搜索-->
            <el-space>
              <el-input
                  placeholder="请输入专业名称"
                  v-model="selForm.FuzzyString"
                  clearable>
              </el-input >
              <el-button icon="el-icon-search" @click="searchMajor" type="primary"></el-button>
            </el-space>
          </el-space>
          <el-divider></el-divider>
          <!--查询结果-->

          <el-table
              :data="majorList"
              border stripe
              highlight-current-row
              max-height="700"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
            <template #default="scope">
              <el-table-column label="大类代码" prop="id"></el-table-column>
              <el-table-column label="大类名称" prop="type"></el-table-column>
              <el-table-column label="专业代码" prop="code"></el-table-column>
              <el-table-column label="专业名称" prop="name"></el-table-column>
              <el-table-column label="专业层级" prop="level1_name"></el-table-column>
              <el-table-column label="学位名称" prop="degree"></el-table-column>
            </template>
          </el-table>

          <!--分页-->
          <el-pagination
              @size-change="pageSizeChange"
              @current-change="pageCurrentChange"
              :current-page="selForm.pageNum"
              :page-sizes="[5, 50, 100]"
              :page-size= "selForm.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
              background>
          </el-pagination>
          <!--详情-->
          <el-dialog
              title="提示"
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
        </div>
      </el-card>
    </el-container>
  </div>
</template>

<script>
import { h } from 'vue'
import { ElDivider } from 'element-plus'
export default {
  name: "MajorPublic",

  data() {
    return {
      spacer: h(ElDivider, { direction: 'vertical' }),
      props: {multiple: true},
      options:require('../../../public/static/Data/majorTypeData.json'),
      Switch: false,

      selForm:{
        type_detail:[],
        level1_name:'全部',
        pageNum: 1,
        pageSize: 50,
        FuzzyString: ''
      },
      majorList:[],
      total: 0,
      spaceSize:20,
      dialogVisible: false
    }
  },
  mounted() {
    this.submit();
  },
  methods:{
    School:function (){
      this.$router.push('/SchoolPublic');
    },
    Major:function (){
      this.$router.push('/MajorPublic');
    },
    Home:function (){
      this.$router.push('/Home');
    },
    Signup:function (){
      this.$router.push('/Signup');
    },
    Login:function (){
      this.$router.push('/Login');
    },
    submit(){
      this.selForm.type_detail = []
      for(let i=0;i<this.$refs['cascadeAddr'].getCheckedNodes().length;i++){
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 2) {
          this.selForm.type_detail[i] = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }

      this.$http({
        method:'post',
        url:'/User/showMajorByNeeds ',
        data: this.selForm
      }).then(res=> {
        console.log(res)
        this.majorList = res.data.list
        this.total = res.data.total
      })
    },
    pageSizeChange(newSize){
      if (newSize === null)
        return
      this.selForm.pageSize = newSize;
      this.submit();
    },
    pageCurrentChange(newPage){
      if (newPage === null)
        return
      this.selForm.pageNum = newPage;
      this.submit();
    },
    searchMajor(){
      this.$http({
        method:'post',
        url:'/User/showMajorByFuzzy',
        data: this.selForm
      }).then(res=> {
        console.log(res.data)
        this.majorList = res.data
        this.total = res.data.length
      })
    },

  },
}
</script>

<style scoped>
.header{
  background-color: #f9844a;
  font-size: 20px;
  font-family: "Microsoft YaHei UI",serif;
}
.Background{
  background-color: #f7f7f7;
  height: 100%;
  width: 100%
}
</style>