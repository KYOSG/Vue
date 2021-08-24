<template>
  <div class="login_background">
    <div class="a">
      <div class="img"></div>
      <div class="c">
        <div class="loginBox">
          <h1>登录</h1>
          <input type="text" class="e" placeholder="用户名" v-model="loginForm.username">
          <input type="password" class="e" placeholder="密码" v-model="loginForm.password">
          <a class="g" @click="login">登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      loginForm:{
        username:'',
        password:''
      },
      //数据验证
      loginFormRules:{
        username: [
          { required: true, message:"请输入用户名",trigger:"blur" },
        ],
        password: [
          { required: true, message:"请输入密码",trigger:"blur" },
        ]
      },
    }
  },
  methods:{
    login(){
      console.log(this.loginForm)
      this.$http({
        method:'post',
        url:'/User/Login',
        data: this.loginForm
      }).then(res=>{
        if (res.data.info.code !== 200){
          this.$notify({
            title: '登陆失败',
            message: res.data.info.message,
            type: 'warning'
          });
          return;
        }
        if (res.data.data.identity !== "admin"){
          this.messageName = this.loginForm.username
        }
        else {
          this.messageName = '管理员'
        }
        //登陆提示
        this.$notify({
          title: '登陆成功',
          message: '你好，' + this.messageName,
          type: 'success'
        });
        window.sessionStorage.setItem("token", res.data.data.token)
        window.sessionStorage.setItem("username", this.loginForm.username)
        window.sessionStorage.setItem("identity", res.data.data.identity)
        //在此处进行身份识别和跳转到对应的页面。
        if (res.data.data.identity === "admin")
          this.$router.push("/ManagerHome");
        else if (res.data.data.identity === "editor")
          this.$router.push("/StudentHome");
        else if (res.data.data.identity === "teacher")
          this.$router.push("/TeacherHome");
      })
    }
  }
}
</script>
<style scoped>
.login_background {
  background-image: linear-gradient(to left, #6096ba,#a3cef1);
  display: flex;
  justify-content: center;
  height: 100%;
}
.a{
  position: relative;
  top: 200px;
  width: 1100px;
  height: 550px;
  box-shadow: 0 5px 15px rgb(0,0,0.8);
  display: flex;
}
.img{
  width: 800px;
  height: 550px;
  background-image: url("../img/Campus.png");
}
.c{
  width: 300px;
  height: 550px;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
}
.loginBox{
  width: 250px;
  height: 500px;
}
.e{
  width: 230px;
  margin: 20px;
  outline: none;
  border: 0;
  padding: 10px;
  border-bottom: 3px solid rgb(80,80,170);
  font: 900 16px '';
}
.g{
  position: absolute;
  margin: 20px;
  bottom: 40px;
  display: block;
  width: 200px;
  height: 60px;
  font: 900 30px '';
  text-decoration: none;
  line-height: 50px;
  border-radius: 30px;
  background-color: #a3cef1;
  text-align: center;
  cursor: pointer;
}
</style>