<template>
  <div class="body">
    <!-- 快捷导航栏开始 -->
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
            <li class="arrow-icon"><a @click="SchoolSell">院校选择</a></li>
            <li></li>
            <li><a @click="MajorSell">专业选择</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="School">院校信息查询</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="Major">专业信息查询</a></li>
            <li></li>
            <li class="arrow-icon"><a @click="Application">查看已选专业</a></li>
          </ul>
        </div>
      </div>
    </section>
    <!-- 快捷导航栏结束 -->
    <div class="header">
      <div class="w">
        <img src="../../img/header1.png" alt="">
        <h4 class="header_h4">专业选择</h4>
      </div>
    </div>
    <el-container>
      <div class="content w">
        <div class="neirong">
          <el-space :size="33">
            <el-space direction="vertical"  class="select" alignment="flex-start" :size="15">
              <!--专业筛选-->
                <el-space wrap :size="1">
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
            </el-space>
              <!--层级-->
              <el-space  wrap :size="1">
                <h4>院校层次：</h4>
                <el-space :size="10" :spacer="spacer">
                  <el-radio-group v-model="selForm.batch" @change="submit" class="float">
                    <el-radio-button label="全部" class="float  three_box color"></el-radio-button>
                    <el-radio-button label="本科" class="float  three_box color"></el-radio-button>
                    <el-radio-button label="专科" class="float  three_box color"></el-radio-button>
                  </el-radio-group>
                  <el-switch v-model="Switch" active-text="查看所有学校" inactive-text="仅查看已选学校" @change="switchOption" class="margin2"></el-switch>
                </el-space>
              </el-space>
              <!--选课要求-->
                <el-space  wrap :size="1">
                  <h4 >所选科目：</h4>
                  <el-space :size="10" :spacer="spacer">
                    <div>
                      <el-checkbox-group v-model="selForm.subject" size="small" @change="submit">
                        <el-checkbox-button v-for="major in majors" :label="major" :key="major">{{major}}</el-checkbox-button>
                      </el-checkbox-group>
                    </div>
                    <el-space wrap :size="10">
                      <h4 class="margin1">高考位次：</h4>
                      <el-space wrap :size="40">
                        <el-input v-model.number="rank" placeholder="高考位次" @change="submit" class="float ranking"></el-input>
                        <div>
                          <el-button @click="showDrawer" type="primary" class="top_button float">查看已选专业</el-button>
                          <el-button @click="showCreateForm" type="primary" class="top_button float">生成志愿列表</el-button>
                        </div>
                      </el-space>
                  </el-space>
                  </el-space>
                </el-space>
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

          <!--生成志愿-->
          <el-dialog
              title="生成志愿列表"
              v-model="dialogVisible"
              width="70%">

            <el-space :size="33">
              <el-space direction="vertical"  class="select" alignment="flex-start" :size="15">
                <!--专业筛选-->
                <el-space wrap :size="1">
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
                </el-space>
                <!--层级-->
                <el-space  wrap :size="1">
                  <h4>院校层次：</h4>
                  <el-space :size="10" :spacer="spacer">
                    <el-radio-group v-model="selForm.batch" @change="submit" class="float">
                      <el-radio-button label="全部" class="float  three_box color"></el-radio-button>
                      <el-radio-button label="本科" class="float  three_box color"></el-radio-button>
                      <el-radio-button label="专科" class="float  three_box color"></el-radio-button>
                    </el-radio-group>
                    <el-switch v-model="Switch" active-text="查看所有学校" inactive-text="仅查看已选学校" @change="switchOption" class="margin2"></el-switch>
                  </el-space>
                </el-space>
                <!--选课要求-->
                <el-space  wrap :size="1">
                  <h4 >所选科目：</h4>
                  <el-space :size="10" :spacer="spacer">
                    <div>
                      <el-checkbox-group v-model="selForm.subject" size="small" @change="submit">
                        <el-checkbox-button v-for="major in majors" :label="major" :key="major">{{major}}</el-checkbox-button>
                      </el-checkbox-group>
                    </div>
                    <el-space wrap :size="10">
                      <h4 class="margin1">高考位次：</h4>
                      <el-space wrap :size="40">
                        <el-input v-model.number="rank" placeholder="高考位次" @change="submit" class="float ranking"></el-input>
                        <el-button type="primary" @click="submitCreate">生成志愿</el-button>
                      </el-space>
                    </el-space>
                  </el-space>
                </el-space>
              </el-space>
            </el-space>
            <!--结果-->
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
    School:function (){
      this.$router.push('/SchoolInf');
    },
    Major:function (){
      this.$router.push('/MajorInf');
    },
    SchoolSell:function (){
      this.$router.push('/SchoolSel');
    },
    MajorSell:function (){
      this.$router.push('/MajorSel');
    },
    Application:function (){
      this.$router.push('/Applications');
    },
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
  cursor:pointer;
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


</style>