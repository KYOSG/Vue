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

      let url =  require("../../../public/static/Data/chartData/seller.json")
      $.getJSON(url, (data) => {
        console.log(data)
          }
      );
    },
    update(){}
  }
}

</script>

<style scoped>

</style>