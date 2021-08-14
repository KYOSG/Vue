<template>
<div class="login_background">
  <div class="login_box">
    <div class="logo_box">
      <img src="../assets/logo.png" alt="">
    </div>
    <!--登录表单-->
    <el-form :model="loginForm" class="form" :rules="loginFormRules" ref="loginFormRef" @keyup.enter.native="login">
      <!--用户名-->
      <el-form-item prop="username">
        <el-input v-model="loginForm.username"
                  placeholder="请输入用户名"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <!--密码-->
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" placeholder="请输入密码" type="password"
                  prefix-icon="el-icon-key"></el-input>
      </el-form-item>
      <!--登陆按钮-->
      <button class="login_button" @click="login">登陆</button>
      <button class="reset_button" @click="resetLoginForm">清空</button>
    </el-form>
  </div>
</div>

</template>

<script>

export default {
  name: "Login",
  data(){
    const checkUsername = (rule, value, cb) => {
      const regUsername = /^[_a-zA-Z0-9]+$/;
      if (value === '' || value === undefined || value == null) {
        cb();
      } else {
        if (!regUsername.test(value)) {
          cb(new Error('仅由英文字母，数字以及下划线组成'));
        } else {
          cb();
        }
      }
    }
    return{
      loginForm:{
        username:'',
        password:''
      },
      //数据验证
      loginFormRules:{
        username: [
          { required: true, message:"请输入用户名",trigger:"blur" },
          { validator: checkUsername,trigger:"blur"}
        ],
        password: [
          { required: true, message:"请输入密码",trigger:"blur" },
        ]
      },
    }
  },
  methods:{

    resetLoginForm(loginForm){
      console.log(loginForm)
      this.$refs.loginFormRef.resetFields();

    },

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
  height: 100%;
  background-color: #2e505c;
}

.login_box{
  width: 450px;
  height: 350px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,  -50%);
  border-radius: 61px;
  background: #2e505c;
  box-shadow:  34px 34px 69px #182a31,
  -34px -34px 69px #447687;

}

.logo_box {
  height: 130px;
  width: 130px;
  border: 1px solid white;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #E8E8E8;
}

img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: white;
}

.form{
  padding-left: 22%;
  padding-right: 20%;
  padding-top: 20%;

}

.login_button{
  position: absolute;
  top:270px;
  color: #F4F4F8;
  width: 80px;
  height: 41px;
  border:none;
  border-radius: 46px;
  background: linear-gradient(145deg, #72e9ff, #60c4e6);
  box-shadow:  10px 10px 20px #408399,
  -10px -10px 20px #96ffff;
}

.login_button:hover{
  position: absolute;
  top:270px;
  color: #F4F4F8;
  width: 80px;
  height: 41px;
  border:none;
  border-radius: 46px;
  background: linear-gradient(145deg, #60c4e6, #72e9ff);
  box-shadow:  10px 10px 20px #408399,
  -10px -10px 20px #96ffff;
}
.reset_button{
  position: absolute;
  top:270px;
  left:280px;
  color: #F4F4F8;
  width: 80px;
  height: 41px;
  border:none;
  border-radius: 46px;
  background: linear-gradient(145deg, #72e9ff, #60c4e6);
  box-shadow:  10px 10px 20px #408399,
  -10px -10px 20px #96ffff;
}

.reset_button:hover{
  position: absolute;
  top:270px;
  left:280px;
  color: #F4F4F8;
  width: 80px;
  height: 41px;
  border:none;
  border-radius: 46px;
  background: linear-gradient(145deg, #60c4e6, #72e9ff);
  box-shadow:  10px 10px 20px #408399,
  -10px -10px 20px #96ffff;
}

</style>