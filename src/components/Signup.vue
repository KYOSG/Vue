<template>
  <Header />
  <div class="Background">
    <div class="From-Background">
      <div class="Title">
      欢迎注册高考智能决策系统
    </div>
      <div class="From">

        <el-form :model="signUpForm" :label-position="labelPosition" label-width="80px" ref="signUpFormRef" :rules="signUpFromRules">
            <!--用户名-->
          <el-popover
              placement="right"
              title="用户名"
              :width="200"
              trigger="hover"
              content="英文字母或数字组成的4-15位字符，可以包含下划线"
          >
            <template #reference>
              <el-form-item label="用户名" class="fromItem" prop="username">
                <el-input v-model="signUpForm.username" clearable></el-input>
              </el-form-item>
            </template>
          </el-popover>

            <!--姓名-->
          <el-popover
              placement="right"
              title="姓名"
              :width="200"
              trigger="hover"
              content="您的真实姓名"
          >
            <template #reference>
              <el-form-item label="姓名" class="fromItem" prop="st_name">
                <el-input v-model="signUpForm.st_name" clearable></el-input>
              </el-form-item>
            </template>
          </el-popover>
            <!--密码-->
          <el-popover
              placement="right"
              title="密码"
              :width="200"
              trigger="hover"
              content="由6-20位英文字母或数字组成至少有一个大写字母"
          >
            <template #reference>
              <el-form-item label="密码" class="fromItem" prop="password">
                <el-input v-model="signUpForm.password"
                          type="password"
                          prefix-icon="el-icon-key"
                          show-password clearable></el-input>
              </el-form-item>
            </template>
          </el-popover>

            <!--确认密码-->
            <el-form-item label="确认密码" class="fromItem" prop="checkPass">
              <el-input v-model="signUpForm.checkPass"
                        type="password"
                        prefix-icon="el-icon-key"
                        show-password clearable></el-input>
            </el-form-item>
            <!--位次-->
          <el-popover
              placement="right"
              title="位次"
              :width="200"
              trigger="hover"
              content="您的高考位次"
          >
            <template #reference>
              <el-form-item label="高考位次" class="fromItem" prop="st_rank">
                <el-input v-model="signUpForm.st_rank" clearable></el-input>
              </el-form-item>
            </template>
          </el-popover>
        </el-form>

      </div>

      <el-row>
        <el-button type="primary" class="submit_button colorfix" @click="submit()">注册</el-button>
        <el-button type="primary" class="clear_button colorfix" @click="resetSignUpForm">清空</el-button>
      </el-row>

    </div>

  </div>
</template>

<script>
import Header from "../components/Header"
import {Collection, School} from "@element-plus/icons";
export default {
  name: "Signup",
  data() {
    const checkUsername = (rule, value, callback) => {
      if (!/^[a-zA-Z0-9_]{4,16}$/.test(value)) {
        this.checkUsername = false
        callback(new Error('请正确输入用户名'))
      }else{
        this.checkUsername = true
        callback();
      }
    }

    const checkPassword = (rule, value, callback) => {
      if (!/^(?=.*[A-Z])[A-Za-z\d]{6,20}$/.test(value)) {
        this.checkPassword = false
        callback(new Error('6-20位英文字母或数字且至少有一个大写字母'))
      }else{
        this.checkPassword = true
        callback();
      }
    }

    const checkPassword2 = (rule, value, callback) => {
      if (value !== this.signUpForm.password) {
        this.checkPassword2 = false
        callback(new Error('两次输入密码不一致!'));
      } else {
        this.checkPassword2 = true
        callback();
      }
    }

    const checkst_rank = (rule, value, callback) => {
      if (!/^[0-9]*^\d{0,6}$/.test(value)) {
        this.checkRank = false
        callback(new Error('请正确输入高考位次'))
      }else{
        this.checkRank = true
        callback();
      }
    }

    return {
      labelPosition: 'right',
      signUpForm: {
        username: '',
        st_name: '',
        st_rank: '',
        st_number: '',
        password: '',
        checkPass:'',
      },
      checkUsername:false,
      checkPassword:false,
      checkPassword2:false,
      checkRank:true,
      signUpFromRules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {validator: checkUsername, trigger: "blur"},
          {min: 3, max: 5, message: '长度在 3 到 15 个字符', trigger: 'blur'},

        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {validator: checkPassword, trigger: "blur"}
        ],
        checkPass:[
          {required: true, message: "请再次输入密码", trigger: "blur"},
          { validator: checkPassword2, trigger: 'blur' }
        ],
        st_rank: [
          {validator: checkst_rank, trigger: "blur"}
        ],
      },
    }
  },
  methods: {
    resetSignUpForm() {
      this.$refs.signUpFormRef.resetFields();
    },

    submit() {
      if (this.checkUsername&&this.checkPassword&&this.checkPassword2&&(this.checkRank||!this.signUpForm.st_rank)){
        console.log("000")
        this.sub()
      }
      else {
        console.log("2222")
      }
    },
    sub(){
      this.$http({
        method: 'post',
        url: '/User/SignUp',
        data: this.signUpForm
      }).then(res => {
        if (res.data.info.code !== 200){
          this.$notify({
            title: '警告',
            message: res.data.info.message,
            type: 'warning'
          });
          return
        }
        this.$notify({
          title: '成功',
          message: '注册成功',
          type: 'success'
        });
        this.$router.push("/Login");
      })
    }
  },
  components: {
    School,
    Collection,
    Header,
  }
};
</script>

<style scoped>
.Background
{
  width:100%;
  height:100%;
  background: #fff url(../img/square_bg.png) repeat-x fixed center center;
  background-size: auto 1000px;
  position:absolute;
}

.Title
{
  text-align:center;
  font-family:"Microsoft YaHei UI", serif;
  font-size:20px;
  color:#F49F0A;
  margin-top: 15px;
  margin-bottom: 15px;
  font-weight: 700;

}

.From-Background
{
  width:500px;
  height:500px;
  background-color:#FFFFFF;
  border-radius:15px;
  position:absolute;
  left:50%;
  top: 50%;
  transform:translate(-50%,-50%);
}

.From
{
  position:absolute;
  padding-left:15%;
  padding-right:15%;
}



.submit_button
{
  position:absolute;
  top:380px;
  right:300px;
}

.clear_button
{
  position:absolute;
  top:380px;
  right:150px;
}

.logo a {
    font-size: 50px;
    color: #323757;
    font-weight: 700;
    font-style: italic;
}

.header_midil {
  position: relative;
    background: #F49F0A;
    width: 100%;
    height: 20px;
    padding: 10px 0px;
}

.site-navbar {
    display: flex;

    justify-content: space-between;
    align-items: center;
}

.site-navbar ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
}

.site-navbar ul li a {
    color: #fff;
    font-size: 14px;
    display: block;
    text-decoration: none;
    text-transform: uppercase;
}

.site-navbar ul li {
    padding-right: 30px;
}

.site-navbar ul li:last-child {
    padding-right: 0;
}

.site-navbar ul li a:hover {
    color: #323757;
}

.site-navbar ul li a.active {
    color: #323757;
}

.site-navbar .button {
  position: absolute;
  right: 10px;
  padding-right: 10px;
}

.site-navbar .button li {
  float: left;
  background-color: #F49F0A;
}

.nav-toggler {
    border: 3px solid #fff;
    padding: 5px;
    background-color: transparent;
    cursor: pointer;
    height: 39px;
    display: none;
    z-index: 99999;
}

.nav-toggler span,
.nav-toggler span:before,
.nav-toggler span:after {
    width: 28px;
    height: 3px;
    background-color: #fff;
    display: block;
    transition: .3s;
}

.nav-toggler span:before {
    content: '';
    transform: translateY(-9px);
}

.nav-toggler span:after {
    content: '';
    transform: translateY(6px);
}

.intro-area {
    height: calc(100vh - 61px);
    display: flex;
    align-items: center;
    text-align: center;
    color: #fff;
}

ul.email {
  float: right;
    text-align: center;
    display: flex;
    justify-content: space-between;
}

ul.email li a {
    color: #fff;
    text-transform: uppercase;
    font-size: 17px;
}

ul.email li a i {
    color: #fff;
    font-size: 19px;
    padding-right: 10px;
}

.el-button--primary {
  background-color: #F49F0A;
  border-color: #F49F0A;
}



.Title
{
  text-align:center;
  font-family:"Microsoft YaHei UI", serif;
  font-size:20px;
  color:#F49F0A;
  margin-top: 15px;
  margin-bottom: 20px;
  font-weight: 700;

}

.el-input_inner input{
    width: 10px;
}

</style>