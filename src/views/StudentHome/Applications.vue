<template>
  <div class="body">
    <!-- 导航栏制作结束 -->
    <div class="header">
      <div class="w">
        <img src="../../img/header3.png" alt="">
        <h4 class="header_h4">志愿清单</h4>
      </div>
    </div>
    <div class="w">
      <el-tabs type="border-card" class="card">
        <el-tab-pane label="查看自选志愿" @table-click="majorSel">
          <el-button type="primary" @click="exportDataSel">导出Excel表格</el-button>
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
          <el-button type="primary" @click="exportDataAuto">导出Excel表格</el-button>
          <el-table
              :data="listDataAuto"
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
    </div>
  </div>
</template>

<script>
export default {
  name: "Applications",
  data() {
    return {
      listData: [],
      listDataAuto: [],
      form:{
        major_id:''
      }
    }
  },
  mounted() {
    this.majorAuto()
    this.majorSel()
  },
  methods: {
    majorSel() {
      this.listData = []
      this.$http({
        method: 'post',
        url: '/User/showMajorSelected',
        data: this.form
      }).then(res => {
        console.log("111"+res.data)
        this.listData = res.data
      })
    },
    majorAuto() {
      this.listData = []
      this.$http({
        method: 'post',
        url: '/User/showMajorAuto',
        data: this.form
      }).then(res => {
        console.log(res.data)
        this.listDataAuto = res.data
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

    exportDataSel() {
      this.excelData = this.listData;
      this.export2Excel();
    },
    exportDataAuto() {
      this.excelData = this.listDataAuto;
      this.export2Excel();
    },
    export2Excel() {
      const that = this;
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require("@/assets/excel/Export2Excel");
        const tHeader = ["学校代码", "学校名称", "专业代码", "专业名称"]; // 导出的excel表头名信息
        const filterVal = [
          "admissionCode",
          "admissionDirection",
          "methodCode",
          "major",
        ]; // 导出的excel表头字段名，需要导出表格字段名
        const list = that.excelData;
        const data = that.formatJson(filterVal, list);

        export_json_to_excel(tHeader, data, "志愿填报表");
      });
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }

}
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
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
  width: 100px;
  height: 100px;
  margin-top: 10px;
}

.header_h4 {
  margin: 62px 20px 10px 10px;
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
  padding: auto;
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


</style>
