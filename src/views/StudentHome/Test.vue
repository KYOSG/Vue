<template>
  <div className="mainWindow">
    <div className="container">
      <div className="wrapper">
        <a href="#">
          <img src="" alt="">
        </a>
        <div className="title">早安</div>
        <div className="place">今天卷了嘛</div>
      </div>
      <div className="content">
        <!--天气-->
        <div className="weather">
          <div id="he-plugin-standard"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>


export default {
  name: "StudentWelcome",
  data() {
    return {
      info: {
        id: '',
      },
      userInfo: {},
      img: document.querySelector("img"),
      icons: document.querySelector(".icons"),
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

    searchWeather: async function () {

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
    getStudent() {
      console.log(this.id)
      this.$http({
        method: 'post',
        url: '/User/getUserInformation',
        data: this.s
      }).then(res => {
        console.log(res.data)
        this.info = res.data.list
      })
    }
  },
  components: {}

}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: "Poppins", sans-serif;
  text-align: center;
}

.weather {
  width: 280px;
}

.container {
  height: 250px;
  width: 250px;
  overflow: hidden;
  margin: 0 auto;
  border-radius: 50%;
  transition: all .3s ease-in-out;
  box-shadow: 0 10px 5px 0 rgba(0, 0, 0, .3);
  background: linear-gradient(45deg, #0081a7, #00afb9);
}

.container:hover {
  height: 700px;
  width: 800px;
  border-radius: 5px;
}

.container .wrapper img {
  position: relative;
  z-index: 20;
  border-radius: 50%;
  display: block;
  height: 200px;
  width: 200px;
  border: 5px solid #fff;
  object-fit: cover;
  margin: 20px auto;
  transition: all .3s ease;
}

.container:hover .wrapper img.active {
  height: 470px;
  width: 350px;
  margin: 0 auto;
  border: none;
  border-radius: 5px;
}

.wrapper .title {
  color: #fff;
  font-size: 30px;
  font-weight: 700;
  padding: 10px;
  line-height: 25px;
}

.wrapper .place {
  color: #fff;
  font-size: 17px;
  line-height: 0;
  margin: 10px 0;
}

.content {
  color: #fff;
  font-size: 17px;
  margin-top: 10px;
  padding: 1px 20px 10px 20px !important;
}

.btn button:hover {
  transform: scale(0.95);
}
</style>