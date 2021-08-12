<template>
<div class="com-page">
  <div class="com-chart" ref="seller_ref"></div>
</div>
</template>

<script>

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

    getChart(){

    },
    update(){}
  }
}

</script>

<style scoped>

</style>