<template>
  <div class="body">
    <!-- 快捷导航栏制作开始 -->
    <section class="shortcut">
      <div class="w">
        <img src="../../img/shortcut1.png" alt="">
        <div class="fl">
          <ul>
            <li>欢迎使用高考志愿填报系统！&nbsp;</li>
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
    <!-- 快捷导航栏制作结束 -->
    <div class="header">
      <div class="w">
        <img src="../../img/header1.png" alt="">
        <h4 class="header_h4">专业选择</h4>
      </div>
    </div>
    <el-container>
      <!-- <el-header>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>志愿填报</el-breadcrumb-item>
          <el-breadcrumb-item>专业选择</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header> -->
      <div class="content w">

        <div class="neirong">
          <el-space :size="33">
            <el-space direction="vertical"  alignment="flex-start" :size="5">
              <!--专业筛选-->
              <div class="schoolPosition">
                <!-- <el-space wrap :size="33"> -->
                <h4>专业类别：</h4>
                <el-cascader
                    placeholder="试试搜索：计算机类"
                    :options="options"
                    :props="{ multiple: true }"
                    filterable
                    collapse-tags
                    ref="cascadeAddr"
                    clearable
                    @change="submit" class="float search"></el-cascader>
                <!-- </el-space> -->
              </div>
              <!--层级-->
             <el-space  wrap :size="3">
                <h4>院校层次：</h4>
                <el-radio-group v-model="selForm.batch" @change="submit" class="float">
                  <el-radio-button label="全部" class="float  three_box color"></el-radio-button>
                  <el-radio-button label="本科" class="float  three_box color"></el-radio-button>
                  <el-radio-button label="专科" class="float  three_box color"></el-radio-button>
                </el-radio-group>
                <el-switch v-model="Switch" active-text="查看所有学校" inactive-text="仅查看已选学校" @change="switchOption" class="margin2"></el-switch>
              </el-space>
              <!--选课要求-->
              <div>
                <el-space  wrap :size="0">
                  <h4 >所选科目：</h4>
                  <div>
                    <el-checkbox-group v-model="selForm.subject" size="small" @change="submit">
                      <el-checkbox-button v-for="major in majors" :label="major" :key="major">{{major}}</el-checkbox-button>
                    </el-checkbox-group>
                  </div>
                  <h4 class="margin1">成绩排名：</h4>
                  <el-input v-model.number="rank" placeholder="高考位次" @change="submit" class="float ranking"></el-input>

                  <div class="position1">
                    <el-button @click="showDrawer" type="primary" class="top_button float">查看已选专业</el-button>
                    <el-button @click="showCreateForm" type="primary" class="top_button float">一键生成志愿</el-button>
                  </div>

                </el-space>

              </div>
            </el-space>

          </el-space>
          <!--查询结果-->
          <div class="kkk">
            <el-table
                :data="getMajorList"
                border stripe
                highlight-current-row
                max-height="700"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}">
              <el-table-column label="专业招生代码" prop="methodCode"></el-table-column>
              <el-table-column label="专业名称" prop="major"></el-table-column>
              <el-table-column label="所属高校" prop="admissionDirection"></el-table-column>
              <el-table-column label="所属高校招生代码" prop="admissionCode"></el-table-column>
              <el-table-column label="最低录取分数" prop="lowScore"></el-table-column>
              <el-table-column label="最低录取位次" prop="lowLevel"></el-table-column>
              <el-table-column label="选课要求" prop="request"></el-table-column>
              <el-table-column label="操作" prop="">
                <template #default="scope">
                  <el-button type="primary" round @click="add(scope.row.major_id)">加入备选</el-button>
                </template>
              </el-table-column>

            </el-table>

          </div>

          <!--已选专业抽屉-->
          <el-drawer
              title="已选院校"
              v-model="drawer"
              :with-header="false"
              direction="rtl"
              size="50%">
            <el-table :data="majorChoiceList"
                      highlight-current-row
                      @change="submit"
                      max-height="700"
                      :border = true
                      :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}">
              <el-table-column property="admissionDirection" label="院校"></el-table-column>
              <el-table-column property="major" label="专业"></el-table-column>
              <el-table-column property="lowLevel" label="最低录取位次"></el-table-column>
              <el-table-column  label="操作">
                <template #default="scope">
                  <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.major_id)"></el-button>
                </template>
              </el-table-column>
            </el-table>

          </el-drawer>

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
          <!--生成志愿-->
          <el-dialog
              title="一键生成志愿"
              v-model="dialogVisible"
              width="70%">

            <space :size="25" :spacer="spacer" class="aaa">
              <!--专业筛选-->
              <div class="schoolPosition">
                <el-space wrap :size="33">
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
                  <el-radio-group v-model="selForm.batch">
                    <el-radio-button label="全部"></el-radio-button>
                    <el-radio-button label="本科"></el-radio-button>
                    <el-radio-button label="专科"></el-radio-button>
                  </el-radio-group>
                </el-space>

              </div>

              <!--选课要求-->
              <div>
                <el-space  wrap :size="43">
                  <div>
                    <el-checkbox-group v-model="selForm.subject" size="small">
                      <el-checkbox-button v-for="major in majors" :label="major" :key="major">{{major}}</el-checkbox-button>
                    </el-checkbox-group>
                  </div>
                </el-space>
              </div>
              <!--高考位次-->

              <el-input v-model.number="rank" placeholder="高考位次"></el-input>

            </space>
            <el-button type="primary" @click="submitCreate">提交</el-button>
            <el-table :data="majorCreateList"
                      highlight-current-row
                      @change="submit"
                      max-height="700"
                      :border = true
                      :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}">
              <el-table-column property="admissionDirection" label="院校"></el-table-column>
              <el-table-column property="major" label="专业"></el-table-column>
              <el-table-column property="lowLevel" label="最低录取位次"></el-table-column>
              <el-table-column  label="操作">
                <template #default="scope">
                  <el-button type="danger" icon="el-icon-delete" circle @click="delCreate(scope.row.major_id)"></el-button>
                </template>
              </el-table-column>
            </el-table>
            <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="confirm">确 定</el-button>
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
import {ElDivider, ElMessage} from 'element-plus'
const cityOptions = ['物理', '化学', '生物', '政治', '历史', '地理'];
export default {
  name: "MajorInf",

  data() {
    return {
      spacer: h(ElDivider, { direction: 'vertical' }),
      props: {multiple: true},
      options:require('../../../public/static/Data/majorData.json'),
      Switch: false,
      selForm:{
        majorList:[],
        batch:'全部',
        pageNum: 1,
        pageSize: 50,
        subject: [],
        lowLevel: ''
      },
      rank: '',
      dialogVisible: false,
      getMajorList:[],
      total: 0,
      spaceSize:20,
      majors: cityOptions,
      drawer: false,
      majorChoiceList:[],
      majorCreateList:[],
      choiceMajor: {
        university_id: ''
      },
      Confirm:{
        majorId:[]
      }
    }
  },
  mounted() {
    this.submit();
  },
  methods: {
    submit() {
      this.selForm.lowLevel = this.rank
      if (this.selForm.lowLevel === ''){
        this.selForm.lowLevel = 0
      }
      this.selForm.majorList = []

      for (let i = 0; i < this.$refs['cascadeAddr'].getCheckedNodes().length; i++) {
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 1) {
          this.selForm.majorList[i] = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }
      if (this.Switch === false){
        this.$http({
          method: 'post',
          url: '/User/showMajorWithoutUniversity',
          data: this.selForm
        }).then(res => {
          this.getMajorList = res.data.list
          this.total = res.data.total
        })
      }
      else {
        this.$http({
          method: 'post',
          url: '/User/showMajorFromSelectUniversity',
          data: this.selForm
        }).then(res => {

          this.getMajorList = res.data.list
          this.total = res.data.total
        })
      }

    },
    showDrawer() {
      this.majorList = []
      this.$http({
        method: 'post',
        url: '/User/showMajorSelected',
        data: this.choiceMajor
      }).then(res => {

        this.majorChoiceList = res.data
      })
      this.drawer = true
    },
    pageSizeChange(newSize) {
      if (newSize === null)
        return
      this.selForm.pageSize = newSize;
      this.submit();
    },
    pageCurrentChange(newPage) {
      if (newPage === null)
        return
      this.selForm.pageNum = newPage;
      this.submit();
    },
    add(id) {
      this.selForm.major_id = id
      this.$http({
        method: 'post',
        url: '/User/insertMajorIntoDatabase',
        data: this.selForm
      }).then(res => {
        console.log(res)
        if (res.data.info.code === 200) {
          ElMessage.success({
            message: res.data.info.message,
            type: 'success'
          });
        }
        else{
          ElMessage.warning({
            message: res.data.info.message,
            type: 'warning'
          });
        }
      })
    },
    del(id) {
      this.selForm.major_id = id

      this.$http({
        method: 'post',
        url: '/User/deleteMajorByStudent',
        data: this.selForm
      }).then(res => {
        if (res.data.info.code === 200) {
          ElMessage.success({
            message: res.data.info.message,
            type: 'success'
          });
        }
        else{
          ElMessage.warning({
            message: res.data.info.message,
            type: 'warning'
          });
        }
      })
      //利用延时解决删除已选学校更新列表错误的问题
      this.timer = setTimeout(() => {   //设置延迟执行
        console.log('ok');
        this.showDrawer()
      }, 100);
    },
    switchOption() {
      this.selForm.majorList = []

      for (let i = 0; i < this.$refs['cascadeAddr'].getCheckedNodes().length; i++) {
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 1) {
          this.selForm.majorList[i] = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }

      if (this.Switch === false){
        this.$http({
          method: 'post',
          url: '/User/showMajorWithoutUniversity',
          data: this.selForm
        }).then(res => {

          this.getMajorList = res.data.list
          this.total = res.data.total
        })
      }
      else{
        this.$http({
          method: 'post',
          url: '/User/showMajorFromSelectUniversity',
          data: this.selForm
        }).then(res => {

          this.getMajorList = res.data.list
          this.total = res.data.total
        })
      }

    },
    showCreateForm(){
      this.dialogVisible = true
    },
    submitCreate(){
      this.majorCreateList = []
      this.selForm.lowLevel = this.rank
      if (this.selForm.lowLevel === ''){
        this.selForm.lowLevel = 0
      }
      console.log(this.selForm)
      this.selForm.majorList = []
      this.$http({
        method: 'post',
        url: '/User/getAutoMajor',
        data: this.selForm
      }).then(res => {
        console.log(res.data)
        this.majorCreateList = res.data
      })
    },
    delCreate(id){

      for (let i =0 ;i<this.majorCreateList.length;i++){
        if(id === this.majorCreateList[i].major_id){
          for(let k=i;k<this.majorCreateList.length-1 ; k++){
            this.majorCreateList[k] = this.majorCreateList[k+1]
          }
        }
      }
      this.majorCreateList.length--
      console.log(this.majorCreateList)
    },
    confirm(){
      for(let i=0;i<this.majorCreateList.length;i++){
        this.Confirm.majorId[i] = this.majorCreateList[i].major_id
      }
      console.log(this.Confirm)
      this.$http({
        method: 'post',
        url: '/User/submitAutoMajorToDataBase',
        data: this.Confirm
      }).then(res => {
        if (res.data.info.code === 200){
          ElMessage.success({
            message: res.data.data,
            type: 'success'
          })
        }

      })
      this.dialogVisible = false
    }
  }
}

</script>

<style scoped>

* {
  box-sizing: border-box;
  padding:0;margin:0;
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
  margin-bottom: 20px;
  border-bottom: 3px solid #F49F0A;
  /* background-image: url(../../img/shutcut1.png); */
}

.header img {
  display:inline-block;
  float: left;
  margin-top: 10px;
  width: 110px;
  height: 110px;
}

.header_h4 {
  margin: 63px 20px 10px 10px;
  /* margin-top: 70px; */
  font-size: 24px;
  color: #F49F0A;
}
/* .header img{
  width: 100%;
  height: 100%;
  /* background: url(../../img/banner1.png) no-repeat; */
/* } */
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
/* .fl {
    float: left;
    line-height: 31px;
}*/

.fr {
  margin-left: 50%;
}

.shortcut ul li {
  float: left;
  list-style: none;
  /* margin: 14px 5px; */

}

.shortcut ul li a {
  color: #666666;
}

.shortcut ul li a:hover {
  color: #F49F0A;
}

.style_red {
  color: #c81623;
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
  /* border: 1px solid #666; */
  padding: 10px;
}

.kkk {
  margin-top: 10px;
  border: 1px solid #eeeeee;
  margin-bottom: 25px;
}

.el-button {
  float: right;
  margin-top: 10px;
  margin-right: 5px;
}

.aaa {
  padding: 0;
}

.schoolPosition {
  float: left;
  width: 350px;
  height: 42px;
  line-height: 42px;
  margin-bottom: 25px;
}

.margin1 {
  margin-left:30px;
}

.margin2 {
  float:right;
  margin-left:30px;
  width: 280px;
}


.el-button {
  margin-top: 15px;
  margin-bottom: 15px;

}

h4 {
  font-weight: 400;
  font-size: 12px;
}


.position1 {

  margin-left: 180px;
}

</style>