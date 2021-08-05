<template>
  <div class="background">
  </div>
    <div class="head">
    <el-form-item class="head_button">
      <el-button @click="Home" class="button">首页</el-button>
      <el-button @click="Test" class="button">联系我们</el-button>
      <el-button class="button">关于我们</el-button>
    </el-form-item>
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
import '../assets/css/home.css';
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
    }
  }
}

</script>
<style scoped>
</style>