<template>
  <div class="body">
    <section class="shortcut">
      <div class="w">
        <img src="../../img/shortcut1.png" alt="">
        <div class="fl">
          <ul>
            <li class="grey">欢迎使用高考志愿填报系统！&nbsp;</li>
          </ul>
        </div>
        <div class="fr">
          <ul>
            <li><a href="#">个人主页</a></li>
            <li></li>
            <li class="arrow-icon"><a href="#">院校选择</a></li>
            <li></li>
            <li><a href="#">专业选择</a></li>
            <li></li>
            <li><a href="#">志愿选择</a></li>
            <li></li>
            <li class="arrow-icon"><a href="#">院校查询</a></li>
            <li></li>
            <li class="arrow-icon"><a href="#">专业查询</a></li>
            <li></li>
            <li class="arrow-icon"><a href="#">高考信息可视化</a></li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 快捷导航栏 -->
    <div class="header">
      <div class="w">
        <img src="../../img/header1.png" alt="">
        <h4 class="header_h4">专业选择</h4>
      </div>
    </div>
    <el-container >

      <div class="w">
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
      </div>
    </el-container>
  </div>
</template>

<script>
import { h } from 'vue'
import { ElDivider } from 'element-plus'
export default {
  name: "MajorInf",

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
    showDetail(){

    }
  },
}

</script>

<style scoped>
* {
  box-sizing: border-box;
  padding:0;
  margin:0;
}
.w {
  width: 1200px;
  margin: 0 auto;
}

li {
  list-style: none;
}
.body {
  position: relative;
  height: 100%;
  background-color:#fff;

}

a {
  text-decoration: none;
}

h4 {
  float: left;
}

.header {
  text-align: center;
  height: 120px;
  margin-bottom: 40px;
  border-bottom: 3px solid #F49F0A;
}

.header img {
  display:inline-block;
  float: left;
  width: 120px;
  height: 120px;
}

.header_h4 {
  margin: 48px 10px;
  font-size: 24px;
  color: #F49F0A;
}

.shortcut {
  height: 40px;

  background-color: #f5f5f5;
  line-height: 40px;
}

.shortcut img {
  float: left;
  width: 50px;
  height: 30px;
  margin-right: 20px;
}


.fr {
  margin-left: 50%;
}

.shortcut ul li {
  float: left;
  list-style: none;
}

.shortcut ul li a {
  color: #666666;
}

.shortcut ul li a:hover {
  color: #F49F0A;
}

.shortcut .fr ul li:nth-child(even) {
  width: 1px;
  height: 12px;
  background-color: #666;
  margin: 14px 15px 0;
}


.footer {
  /* position: absolute;
  width: 100%;
  bottom: 0; */
  height: 178px;
  margin-top: 90px;
  /* padding-top: 15px; */
  padding-bottom: 15px;
  background: #F49F0A;
  text-align: center;
}

.hedingh3 h4 {
  color: #fff;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 23px;
  font-weight: 400;
  text-align: left;
}

.hedingh3 p {
  color: #fff;
  text-align: left;
  /* margin-bottom: 15px; */
}

ul.social_icon li {
  display: inline-block;
  margin: 0 2px;
}

ul.social_icon li a i {
  font-size: 17px;
  color: #323757;
  transition: ease-in all 0.5s;
  background: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50px;
  text-align: center;
}

ul.social_icon li a i:hover {
  color: #fff;
  transition: ease-in all 0.5s;
  background: #dc2727;
}

ul.menu_footer {
  text-align: left;
  /* margin-bottom: 15px; */

}

ul.menu_footer li a {
  color: #fff;
  font-size: 14px;
  line-height: 18px;
  margin-top: 10px ;
  margin-bottom: 10px ;

  display: block;
}

ul.menu_footer p {
  font-size: 14px;
}
ul.menu_footer li a:hover {
  color: #dc2727;
}

.text_align_left {
  float: left;
  margin: 0;
  padding-right: 256px;
}

.text_align_left1 {
  float: left;
  margin: auto 0;
  margin-right: 0;
}

.content {

  background-color: #fff;
  padding: 10px;
}

.kkk {
  margin-top: -30px;
  border: 1px solid;
}

.el-button {
  float: right;
  margin-top: 10px;
  margin-right: 5px;
}

.aaa {
  padding: 0;
}

.el-button {
  width: 56px;
  margin-top: 0;
  margin-left: -10px;
}

.el-pagination {
  margin-top: 30px;
}
</style>