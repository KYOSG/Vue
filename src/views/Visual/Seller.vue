<template>
<div class="com-page">
  <div class="com-chart" ref="seller_ref"></div>
</div>
</template>

<script>

import {$} from "element-plus/es/utils/util";

export default {
  name: "DataPage",
  data(){
    return{
      chartInstance: null,
      allData: null
    }
  },
  mounted() {
    this.initChart();

    this.getData();
  },
  methods:{
    initChart(){
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref)
    },

    getData() {
      this.allData = require("../../../public/static/Data/chartData/seller.json")
      this.update()
    },
    update(){
      const sellerNames = this.allData.map((item) => {
        return item.name
      })
      const sellerValues = this.allData.map((item) => {
        return item.value
      })
      const option = {
        xAxis: {
          type:'value'
        },
        yAxis: {
          type: 'category',
          data: sellerNames
        },
        series:[
          {
            type: 'bar',
            data: sellerValues
          }
        ]
      }
      this.chartInstance.setOption(option)
    }
  }
}

</script>

<style scoped>

</style>