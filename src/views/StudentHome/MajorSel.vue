<template>
  <el-container>
    <el-header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>高考咨询</el-breadcrumb-item>
        <el-breadcrumb-item>专业查询</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-card class="test">
      <div>
          <el-space :size="25" :spacer="spacer">
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
                <el-radio-group v-model="selForm.batch" @change="submit">
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
                  <el-checkbox-group v-model="selForm.subject" size="small" @change="submit">
                    <el-checkbox-button v-for="major in majors" :label="major" :key="major">{{major}}</el-checkbox-button>
                  </el-checkbox-group>
                </div>
              </el-space>
            </div>
            <!--高考位次-->
            <el-input v-model="selForm.lowLevel" placeholder="高考位次" @change="submit"></el-input>
            <el-switch v-model="Switch" active-text="查看所有学校" inactive-text="已选学校" @change="">
            </el-switch>
            <el-button @click="showDrawer" type="primary" style="margin-left: 16px;">查看已选专业</el-button>

          </el-space>

        <el-divider></el-divider>
        <!--查询结果-->
        <el-table
            :data="getMajorList"
            border stripe
            highlight-current-row
            @change="submit"
            @keyup.enter.native="submit"
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
            <el-table-column property="major" label="名称"></el-table-column>
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
      </div>
    </el-card>
  </el-container>
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
        lowLevel: 0
      },
      getMajorList:[],
      total: 0,
      spaceSize:20,
      majors: cityOptions,
      drawer: false,
      majorChoiceList:[],
      choiceMajor: {
        university_id: ''
      },
    }
  },
  mounted() {
    this.submit();
  },
  methods: {
    submit() {
      this.selForm.majorList = []
      //给位置数组赋值方便后端接收数据
      for (let i = 0; i < this.$refs['cascadeAddr'].getCheckedNodes().length; i++) {
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 1) {
          this.selForm.majorList[i] = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }
      console.log(this.selForm)
      this.$http({
        method: 'post',
        url: '/User/showMajorWithoutUniversity',
        data: this.selForm
      }).then(res => {
        console.log(res.data)
        this.getMajorList = res.data.list
        this.total = res.data.total
      })
    },
    showDrawer() {
      this.majorList = []
      this.$http({
        method: 'post',
        url: '/User/showMajorSelected',
        data: this.choiceMajor
      }).then(res => {
        console.log(res.data)
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
      console.log(this.selForm)
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
    push() {
      this.selForm.majorList = []
      //给位置数组赋值方便后端接收数据
      for (let i = 0; i < this.$refs['cascadeAddr'].getCheckedNodes().length; i++) {
        if (this.$refs['cascadeAddr'].getCheckedNodes()[i].level === 1) {
          this.selForm.majorList[i] = this.$refs['cascadeAddr'].getCheckedNodes()[i].data.label
        }
      }
      if (this.Switch === false){
        this.Switch = true
        this.$http({
          method: 'post',
          url: '/User/showMajorFromSelectUniversity',
          data: this.selForm
        }).then(res => {

          this.getMajorList = res.data.list
          this.total = res.data.total
        })
      }
      else{
        this.Switch = false
        this.$http({
          method: 'post',
          url: '/User/showMajorWithoutUniversity',
          data: this.selForm
        }).then(res => {

          this.getMajorList = res.data.list
          this.total = res.data.total
        })
      }

    }
  }
}

</script>

<style scoped>

</style>