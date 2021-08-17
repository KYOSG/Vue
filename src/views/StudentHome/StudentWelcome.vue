<template>
  <div class="mainWindow">
    <el-card>
      <el-descriptions class="margin-top" :column="3" border>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-user"></i>
            用户名
          </template>
          {{info.username}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-mobile-phone"></i>
            联系方式
          </template>
          {{info.mobile}}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-location-outline"></i>
            分数
          </template>
          {{  }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>
            <i class="el-icon-tickets"></i>
            备注
          </template>
          <el-tag size="small">学校</el-tag>
        </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <i class="el-icon-location-outline"></i>
              考试位次
            </template>
            {{  }}
          </el-descriptions-item>
      </el-descriptions>
      <!--天气-->
      <div class="weather">
        <el-card>
          <div id="he-plugin-standard"></div>
        </el-card>
      </div>
    </el-card>
  </div>

</template>

<script>

export default {
  name: "StudentWelcome",
  data(){
    return{
      info:{
       id:'',

      }
    }
  },
  created() {
    window.WIDGET = {
      "CONFIG": {
        "layout": "2",
        "width": 230,
        "height": 270,
        "background": "5",
        "dataColor": "000000",
        "aqiColor": "000000",
        "borderRadius": "15",
        "key": "e01422bb93d841c2a10f9cd189dd84c5"
      }
    }
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0';
    document.getElementsByTagName('head')[0].appendChild(script);

  },
  mounted() {
    this.getStudent()
  },
  methods: {

    searchWeather: async function() {//注意：这里有 async 用来完成异步操作
      //由于调用api是异步操作
      //在请求的时候需要用async+await让它同步，否则数据不好取出
      //如果没有await返回的是一个Promise 对象，我学术短浅，暂时没学到，不会取
      let key = "2a3d8a1d861a47078997c656eb1f322f"; //引号中放入前面保存的key
      //获取城市的ID
      let httpUrl = `https://geoapi.qweather.com/v2/city/lookup?location=淄博&adm=张店&key=${key}`;
      let res = await fetch(httpUrl);
      let result = await res.json();
      let id = result.location[0].id;
      console.log(result);
      //根据城市id获取具体的天气
      let httpUrl1 = `https://devapi.qweather.com/v7/weather/now?location=${id}&key=${key}`;
      let res1 = await fetch(httpUrl1);
      let result1 = await res1.json();
      let now = result1.now;
      console.log(result1);
    },
    getStudent(){
      console.log(this.id)
      this.$http({
        method: 'post',
        url: '/User/getUserInformation',
        data: this.sss
      }).then(res => {
        console.log(this.id)
        console.log(res.data)
        this.getMajorList = res.data.list
        this.total = res.data.total
      })
    }
  },
  components:{
  }

}
</script>

<style scoped>

</style>