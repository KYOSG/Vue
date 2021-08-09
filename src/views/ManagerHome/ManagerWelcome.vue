<template>
<el-card>
  <div id="main" style="width: 600px;height:400px;"></div>
</el-card>

</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "Welcome",
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
      const dataChart = document.getElementById('main');
      const myChart = echarts.init(dataChart);
      const option = {
        title:{
          text:'网站访问人数'
        },
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [230,300, 654, 934, 1290, 1330, 1440],
          type: 'line',
          smooth: true
        }]
      };
      option && myChart.setOption(option);
    }
  }
}
</script>

<style scoped>

</style>