<template>
<el-card>
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
      <el-table-column label="高校招生代码" prop="admissionCode"></el-table-column>
      <el-table-column label="最低录取分数" prop="lowScore"></el-table-column>
      <el-table-column label="最低录取位次" prop="lowLevel"></el-table-column>
      <el-table-column label="选课要求" prop="request"></el-table-column>
    </el-table>
</el-card>
</template>

<script>
export default {
  name: "Applications",
  data() {
    return {
      listData: []
    }
  },
  mounted() {
    this.getList();
  },
  methods:{
    getList(){
      this.listData = []
      this.$http({
        method: 'post',
        url: '/User/showMajorSelected',
      }).then(res => {
        console.log(res.data)
        this.listData = res.data
      })
      this.drawer = true
    },
  }
}
</script>

<style scoped>

</style>
