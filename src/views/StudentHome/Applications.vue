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
      <el-button type="primary" @click="exportData">导出Excel表格</el-button>
      <el-table
          :data="listData"
          border stripe
          highlight-current-row
          max-height="700"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="专业招生代码" prop="methodCode"></el-table-column>
        <el-table-column label="专业名称" prop="major"></el-table-column>
        <el-table-column label="所属高校" prop="admissionDirection"></el-table-column>
        <el-table-column label="所属高校招生代码" prop="admissionCode"></el-table-column>
        <el-table-column label="最低录取分数" prop="lowScore"></el-table-column>
        <el-table-column label="最低录取位次" prop="lowLevel"></el-table-column>
        <el-table-column label="选课要求" prop="request"></el-table-column>
        <el-table-column label="操作">
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
        <el-table-column label="序号" type="index"></el-table-column>
        <el-table-column label="专业招生代码" prop="methodCode"></el-table-column>
        <el-table-column label="专业名称" prop="major"></el-table-column>
        <el-table-column label="所属高校" prop="admissionDirection"></el-table-column>
        <el-table-column label="所属高校招生代码" prop="admissionCode"></el-table-column>
        <el-table-column label="最低录取分数" prop="lowScore"></el-table-column>
        <el-table-column label="最低录取位次" prop="lowLevel"></el-table-column>
        <el-table-column label="选课要求" prop="request">
          <el-button type="primary" icon="el-icon-edit" circle></el-button>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-tooltip effect="light" content="上移" placement="top-start">
              <el-button type="primary" icon="el-icon-arrow-up" circle @click="up(scope.row)"></el-button>
            </el-tooltip>

            <el-tooltip effect="light" content="下移" placement="top-start">
              <el-button type="primary" icon="el-icon-arrow-down" circle @click="down(scope.row.major_id)"></el-button>
            </el-tooltip>


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
  methods: {
    majorSel() {
      this.listData = []
      this.$http({
        method: 'post',
        url: '/User/showMajorSelected',
      }).then(res => {
        this.listData = res.data
      })
    },
    majorAuto() {
      this.listData = []
      this.$http({
        method: 'post',
        url: '/User/showMajorAuto',
      }).then(res => {
        this.listData = res.data
      })
    },
    del(id) {
      this.form.major_id = id;
      this.$http({
        method: 'post',
        url: '/User/deleteMajorByStudent',
        data: this.form
      }).then(res => {

      })
    },
    up() {
    },
    down() {
    },
    confirmChange() {
      this.$http({
        method: 'post',
        url: '/User/showMajorSelected',
        data: this.listData
      }).then(res => {

      })
    },
    //触发按钮点击下载事件
    exportData() {
      this.excelData = this.listData;  //将你要导出的数组数据（historyList）赋值给excelDate
      this.export2Excel(); //调用export2Excel函数，填写表头（clomns里的type）和对应字段(historyList里的属性名)
    },
//表格数据写入excel
    export2Excel() {
      const that = this;
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("@/assets/excel/Export2Excel");
        //这里使用绝对路径( @表示src文件夹 )，使用@/+存放export2Excel的路径【也可以写成相对于你当前"xxx.vue"文件的相对路径，例如我的页面放在assets文件夹同级下的views文件夹下的“home.vue”里，那这里路径也可以写成"../assets/excel/Export2Excel"】
        const tHeader = ["学校代码", "学校名称", "专业代码", "专业名称"]; // 导出的excel表头名信息
        const filterVal = [
          "date",
          "name",
          "class",
          "studentId",
        ]; // 导出的excel表头字段名，需要导出表格字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "志愿填报表"); // 导出的表格名称，根据需要自己命名
      });
    },
//格式转换，直接复制即可,不需要修改什么
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }

}
</script>

<style scoped>

</style>
