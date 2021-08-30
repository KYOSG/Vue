<template>
  <div class="body">
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
        <img src="../../img/header2.png" alt="">
        <h4 class="header_h4">院校选择</h4>
      </div>
    </div>

    <el-container>

      <div class="mainWindow w">
        <div>
          <div>
            <el-space :size="40">
              <el-space direction="vertical"  alignment="flex-start" :size="25">
                <!--所在地-->
                <div class="schoolPosition">
                  <el-space wrap :size="33">
                    <span class="demonstration">院校所在地 </span>
                    <el-cascader
                        placeholder="试试搜索：北京"
                        :options="options"
                        :props="{ multiple: true }"
                        filterable
                        collapse-tags
                        ref="cascadeAddr"
                        clearable
                        @change="submit"></el-cascader>
                  </el-space>
                </div>
                <!--主管部门-->
                <div>
                  <el-space wrap :size="43">
                    <span class="demonstration">主管部门 </span>
                    <el-radio-group v-model="selForm.Manage" @change="submit">
                      <el-radio-button label="全部"></el-radio-button>
                      <el-radio-button label="教育部"></el-radio-button>
                      <el-radio-button label="其他部委"></el-radio-button>
                      <el-radio-button label="地方"></el-radio-button>
                      <el-radio-button label="军校"></el-radio-button>
                    </el-radio-group>
                  </el-space>
                </div>
                <!--层级-->
                <div>
                  <el-space  wrap :size="43">
                    <span class="demonstration">院校层级 </span>
                    <el-radio-group v-model="selForm.Layer" @change="submit">
                      <el-radio-button label="全部"></el-radio-button>
                      <el-radio-button label="本科"></el-radio-button>
                      <el-radio-button label="高职（专科）"></el-radio-button>
                      <el-radio-button label="独立学院"></el-radio-button>
                      <el-radio-button label="中外合作办学"></el-radio-button>
                    </el-radio-group>
                  </el-space>

                </div>
                <!--特点-->
                <div>
                  <el-space wrap :size="43">
                    <span class="demonstration">院校特点 </span>
                    <el-space :size="10" :spacer="spacer">
                      <el-radio-group v-model="selForm.Level" @change="submit">
                        <el-radio-button label="全部"></el-radio-button>
                        <el-popover
                            placement="bottom"
                            title="985工程"
                            :width="200"
                            trigger="hover"
                            content="是为了实现现代化，建立若干所具有世界先进水平的一流大学的建设工程。">
                          <template #reference>
                            <el-radio-button label="985院校"></el-radio-button>
                          </template>
                        </el-popover>
                        <el-popover
                            placement="bottom"
                            title="211工程"
                            :width="200"
                            trigger="hover"
                            content="面向21世纪、重点建设100所左右的高等学校和一批重点学科的建设工程。">
                          <template #reference>
                            <el-radio-button label="211院校"></el-radio-button>
                          </template>
                        </el-popover>
                      </el-radio-group>
                      <el-popover
                          placement="right"
                          title="双一流高校"
                          :width="200"
                          trigger="hover"
                          content="建设世界一流大学和一流学科，是中共中央、国务院作出的重大战略决策，也是中国高等教育领域继“211工程”“985工程”之后的又一国家战略。">
                        <template #reference>
                          <el-switch
                              v-model="Switch"
                              active-color="#13ce66"
                              inactive-color="#ff4949"
                              active-text="仅查看双一流高校"
                              @change="submit"></el-switch>
                        </template>
                      </el-popover>
                    </el-space>
                  </el-space>
                </div>
                <!--搜索-->
                <el-space>
                  <el-input
                      placeholder="请输入院校名称"
                      v-model="selForm.Name"
                      @keyup.enter.native="search"
                      clearable>
                  </el-input >
                  <el-button icon="el-icon-search" @click="search" type="primary"></el-button>
                  <el-button @click="showDrawer" type="primary" style="margin-left: 16px;">查看已选院校</el-button>
                </el-space>
              </el-space>
            </el-space>
            <el-divider></el-divider>
            <!--查询结果-->
            <el-table
                :data="schoolList"
                highlight-current-row
                max-height="700"
                :border = true
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}">
              <el-table-column label="" prop="">
                <template #default="scope">
                  <el-card>
                    <el-image  style="width: 70px; height: 70px" :src="scope.row.site" alt="" :fit="fill" ></el-image>
                  </el-card>
                </template>
              </el-table-column>
              <el-table-column label="院校代码" prop="school_code" width="80"></el-table-column>
              <el-table-column label="院校名称" prop="name"></el-table-column>
              <el-table-column label="所在地" prop="position"></el-table-column>
              <el-table-column label="院校层级" prop="layer"></el-table-column>
              <el-table-column label="院校类型" prop="typeName"></el-table-column>
              <el-table-column label="操作">
                <template #default="scope">
                  <el-button type="primary" round @click="add(scope.row.school_id)">加入备选</el-button>
                </template>
              </el-table-column>
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
                :disabled = "searchOption"
                background>
            </el-pagination>
          </div>
        </div>
      </div>

      <!--已选学校抽屉-->
      <el-drawer
          title="已选院校"
          v-model="drawer"
          :with-header="false"
          direction="rtl"
          size="50%">
        <el-table :data="schoolChoiceList"
                  highlight-current-row
                  @change="submit"
                  max-height="700"
                  :border = true
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}">
          <el-table-column property="name" label="院校名称"></el-table-column>
          <el-table-column property="layer" label="院校层级"></el-table-column>
          <el-table-column  label="操作">
            <template #default="scope">
              <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.school_id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-drawer>
    </el-container>
  </div>
</template>

<script>
import { h } from 'vue'
import {ElDivider, ElMessage} from 'element-plus'
export default {
  name: "StudentSel",

  data() {
    return {
      spacer: h(ElDivider, {direction: 'vertical'}),
      props: {multiple: true},
      Switch: false,
      options: require('../../../public/static/Data/positionData.json'),
      selForm: {
        Position: [],
        Manage: '全部',
        Level: '全部',
        Layer: '全部',
        Features: '',
        pageNum: 1,
        pageSize: 50,
        Name: '',
        schoolChoice: [],
      },
      schoolList: [{
        academicianNum: 0,
        address: "平乐园校区位于北京市朝阳区平乐园100号； 通州校区位于北京市通州区潞苑南大街89号",
        area: "1403.10",
        createDate: "1960",
        doctorNum: 20,
        email: null,
        f211: "T",
        f985: null,
        firstClass: "双一流",
        labNum: 1,
        layer: "本科",
        libraryNum: "0",
        manage: "北京市",
        masterNum: 60,
        name: "北京工业大学",
        natureName: "公办",
        phone: "010-67391609",
        position: "北京市",
        postcode: "100022",
        province: "北京",
        qsrank: "33",
        ruanKeRank: "63",
        schoolSite: "http://www.bjut.edu.cn/",
        school_code: "10005",
        school_id: 30,
        school_id_code: "4111010005",
        site: "http://admissions.bjut.edu.cn/",
        type: "5001",
        typeName: "理工类",
        wslrank: "74",
        xyhrank: "71"
      }],
      schoolChoiceList: [],
      total: 0,
      spaceSize: 20,
      searchOption: false,
      drawer: false,
      choiceSchool: {
        university_id: ''
      },
    }

  },
  mounted() {
    this.submit();
  },
  methods: {
    submit() {
      this.searchOption = false
      this.selForm.Position = []
      //给位置数组赋值方便后端接收数据
      for (let i = 0; i < this.$refs['cascadeAddr'].getCheckedNodes().length; i++) {
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 2) {
          this.selForm.Position[i] = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }
      //处理开关数据
      if (this.Switch === true) {
        this.selForm.Features = 'T'
      } else {
        this.selForm.Features = 'F'
      }

      this.$http({
        method: 'post',
        url: '/User/showUniversityByNeed',
        data: this.selForm
      }).then(res => {
        for (let i = 0; i < res.data.list.length; i++) {
          res.data.list[i].type = res.data.list[i].firstClass
          res.data.list[i].site = 'https://static-data.eol.cn/upload/logo/' + res.data.list[i].school_id + '.jpg'
        }

        this.schoolList = res.data.list
        this.total = res.data.total
      })
    },

    add(id) {
      this.choiceSchool.university_id = id
      console.log(this.choiceSchool)
      this.$http({
        method: 'post',
        url: '/User/selectUniversityByStudent',
        data: this.choiceSchool
      }).then(res => {
        console.log(res.data)
        if (res.data.info.code === 200) {
          ElMessage.success({
            message: res.data.info.message,
            type: 'success'
          });
        }
        else {
          ElMessage.warning({
            message: res.data.info.message,
            type: 'warning'
          });
        }

      })
    },

    del(id) {
      this.choiceSchool.university_id = id

      this.$http({
        method: 'post',
        url: '/User/deleteUniversitySelected',
        data: this.choiceSchool
      }).then(res => {
        ElMessage.warning({
          message: res.data.info.message,
          type: 'warning'
        });
      })
      //利用延时解决删除已选学校更新列表错误的问题
      this.timer = setTimeout(()=>{   //设置延迟执行
        console.log('ok');
        this.showDrawer()
      },100);

    },


    showDrawer() {
      this.schoolChoiceList = []
      this.$http({
        method: 'post',
        url: '/User/showUniversitySelected',
        data: this.choiceSchool
      }).then(res => {
        console.log(res)
        this.schoolChoiceList = res.data
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
      this.selForm.pageNum = newPage;
      this.submit();
    },
    search() {
      this.searchOption = true

      this.selForm.pageNum = 1;
      this.selForm.pageSize = 50;

      this.$http({
        method: 'post',
        url: '/User/getUniversityByName',
        data: this.selForm
      }).then(res => {

        console.log(res.data)
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].type = res.data[i].firstClass
          res.data[i].site = 'https://static-data.eol.cn/upload/logo/' + res.data[i].school_id + '.jpg'
        }
        this.schoolList = res.data
        this.total = res.data.length

      })
    },
  }
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
  width: 100px;
  height:90px;
  margin: 20px 10px 0 0;
}

.header_h4 {
  margin: 73px 15px 10px 10px;
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

.style_red {
  color: #c81623;
}

.shortcut .fr ul li:nth-child(even) {
  width: 1px;
  height: 12px;
  background-color: #666;
  margin: 14px 15px 0;
}

.shortcut img {
  width: 50px;
  height: 30px;
  margin-right: 20px;
}

.footer {
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



</style>