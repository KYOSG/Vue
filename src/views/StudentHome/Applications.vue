<template>
  <el-header>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/StudentHome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>志愿查看</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
<el-card>
  <el-tabs type="border-card">
    <el-tab-pane label="查看自选志愿" @table-click="majorSel">
      <el-table
          :data="listData"
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
            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.major_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="查看生成志愿" @tab-click="majorAuto">
      <el-table
          :data="listData"
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
            <el-button type="danger" icon="el-icon-delete" circle @click="del(scope.row.major_id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>

</el-card>
</template>

<script>
export default {
  name: "Applications",
  data() {
    return {
      listData: [],
      form:{
        major_id:''
      }
    }
  },
  mounted() {

  },
  methods:{
    majorSel(){
      this.listData = []
      this.$http({
        method: 'post',
        url: '/User/showMajorSelected',
      }).then(res => {
        this.listData = res.data
      })
    },
    majorAuto(){
      this.listData = []
      this.$http({
        method: 'post',
        url: '/User/showMajorAuto',
      }).then(res => {
        this.listData = res.data
      })
    },
    del(id){
      this.form.major_id = id;
      this.$http({
        method: 'post',
        url: '/User/deleteMajorByStudent',
        data: this.form
      }).then(res => {

        })
    }
  },

}
</script>

<style scoped>

</style>
