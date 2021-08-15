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
      chartInstance: null,
      allData: null,
      currentPage: 1,
      totalPage: 0,
      timerId: null
    }
  },
  mounted() {
    this.initChart();

    this.getData();
  },
  destroyed() {
    clearInterval(this.timerId)
  },
  methods:{
    initChart(){

      this.chartInstance = this.$echarts.init(this.$refs.seller_ref,)

      this.chartInstance.on('mouseover', () =>{
        clearInterval(this.timerId)
      })
      this.chartInstance.on('mouseout', ()=>{
        this.startInterval()
      })
    },

    getData() {
      this.allData = require("../../../public/static/Data/chartData/seller.json")
      this.allData.sort((a,b) => {
        return b.value - a.value
      })
      this.totalPage = this.allData % 5 === 0 ? this.totalPage.length / 5 : this.allData.length / 5 +1
      this.update()
      this.startInterval()
    },
    update(){
      const start = (this.currentPage -1 )*5
      const end = this.currentPage * 5
      const showData = this.allData.slice(start, end)
      const sellerNames = showData.map((item) => {
        return item.name
      })
      const sellerValues = showData.map((item) => {
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
    },
    startInterval (){
      if (this.timerId){
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        if(this.currentPage >= this.totalPage - 1)
          this.currentPage = 0
        this.currentPage++
        this.update()
      }, 2000)
    }
  }
}

</script>

<style scoped>

</style>