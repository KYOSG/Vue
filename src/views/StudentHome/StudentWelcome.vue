<template>
  <el-card>
    <div id="main" style="width: 600px;height:400px;"></div>
  </el-card>

</template>

<script>
import * as echarts from "echarts";

export default {
  name: "StudentWelcome",
  data(){
    return{

    }
  },
  created() {},
  mounted() {
    this.drawChart()
  },
  methods:{
    drawChart(){
      const dataChart = echarts.init(document.getElementById("main"))

      const mapData = require('../../assets/Js/map/china.json')

        echarts.registerMap('chinaMap', mapData)
      const option = {
        geo:{
          type: 'map',
          map: 'chinaMap',
          roam: true
        }
      }
      dataChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>