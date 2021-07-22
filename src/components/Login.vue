<template>
<div class="login_background">
  <div class="login_box">
    <div class="logo_box">
      <img src="../assets/logo.png" alt="">
    </div>
    <!--登录表单-->
    <el-form :model="loginform" class="form">
      <!--用户名-->
      <el-form-item >
        <el-input v-model="loginform.username" placeholder="请输入用户名"
                  prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <!--密码-->
      <el-form-item >
        <el-input v-model="loginform.password" placeholder="请输入密码" type="password"
                  prefix-icon="el-icon-key"></el-input>
      </el-form-item>
      <!--身份选择-->
      <div class="id_box" >
        <el-radio-group v-model="Choice" size="small">
          <el-radio-button label="学生"></el-radio-button>
          <el-radio-button label="老师"></el-radio-button>
          <el-radio-button label="管理员"></el-radio-button>

        </el-radio-group>
      </div>
      <!--登陆按钮-->
      <el-button class="login_button" type="primary">登陆</el-button>
      <el-button class="reset_button" type="primary">清空</el-button>
    </el-form>
  </div>
</div>

</template>

<script>
export default {
  name: "Login",
  data(){
    return{
      loginform:{
        username:'',
        password:''
      },
      Choice:'学生'
    }
  }
}


</script>

<style scoped>

.login_background {
  height: 100%;
  background-color: rgb(0,78,100);
}

.login_box{
  width: 450px;
  height: 350px;
  background-color: #E8E8E8;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,  -50%);

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
}

.reset_button{
  position: absolute;
  top:270px;
  left:280px;
}

.id_box{
  padding-left: 13%;
}

</style>