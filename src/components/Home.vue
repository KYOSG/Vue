<template>
  <div class="background">
  </div>
    <div class="head">
    <el-form-item class="head_button">
      <el-button @click="Home" class="button">首页</el-button>
      <el-button @click="Test" class="button">联系我们</el-button>
      <el-button class="button">关于我们</el-button>
    </el-form-item>
    </div>
  <!--走马灯-->
      <div class="block">
        <el-carousel height="300px">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3 class="small">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="block">
      <div class="up">
          <img src="../img/Title_Logo.png" class="Title_Logo" alt="">
        <div class="log_button">
          <el-button @click="Login" type="primary" round>登陆</el-button>
          <el-button @click="Signup" type="primary" round>注册</el-button>
        </div>

      </div>
      <div class="down">

      </div>
  </div>


</template>

<script>
export default {
  name: "Home",
  methods:{
    Home:function (){
      this.$router.push('/Home');
    },
    Login:function (){
      this.$router.push('/Login');
    },
    Signup:function (){
      this.$router.push('/Signup');
    },
    Test:function (){
      this.$router.push('/StudentHome')
    },
    },
}

</script>
<style scoped>
.background{
  width: 100%;
  height: 100vh;
  background: url("~@/img/Background.jpg") center center no-repeat;
  background-size: 100% 100%;
  position:absolute;

}
.up{
  position: absolute;
  top: 30%;
  width: 100%;
  height: 30%;
}
.head{
  backdrop-filter: blur(5px);
  box-shadow: 0 6px 10px rgba(255,255,255,.34);
  background: rgba(255,255,255,.5);
  height: 60px;
  width: 100%;
}
.head_button{
  text-align: right;
}

.Title_Logo{
  position: absolute;
  top:140px;
  right: 550px;
  width: 800px;

}

.log_button{
  position: absolute;
  top: 300px;
  left: 75%;
}

.button{
  backdrop-filter: blur(5px);
  box-shadow: 0 8px 12px rgba(255,255,255,.3);
  background: rgba(255,255,255,5);
  color: cornflowerblue;
}
.block{
  position: absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%,  -50%);
  width: 80%;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>