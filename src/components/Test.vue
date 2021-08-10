<template>
  <div class="Background">
    <div class="Title">
      欢迎注册高考智能决策系统
    </div>
    <div class="From-Background">
      <div class="From">
        <el-form :model="signUpForm" :label-position="labelPosition" label-width="80px" ref="signUpFormRef" :rules="signUpFromRules">
          <!--用户名-->
          <el-form-item label="用户名" class="fromItem" prop="username">
            <el-input v-model="signUpForm.username" clearable></el-input>
          </el-form-item>
          <!--姓名-->
          <el-form-item label="姓名" class="fromItem" prop="st_name">
            <el-input v-model="signUpForm.st_name" clearable></el-input>
          </el-form-item>
          <!--密码-->
          <el-form-item label="密码" class="fromItem" prop="password">
            <el-input v-model="signUpForm.password"
                      type="password"
                      prefix-icon="el-icon-key"
                      show-password clearable></el-input>
          </el-form-item>
          <!--确认密码-->
          <el-form-item label="确认密码" class="fromItem" prop="checkPass">
            <el-input v-model="signUpForm.checkPass"
                      type="password"
                      prefix-icon="el-icon-key"
                      show-password clearable></el-input>
          </el-form-item>
          <!--考号-->
          <el-form-item label="考号" class="fromItem" prop="st_number">
            <el-input v-model="signUpForm.st_number" clearable></el-input>
          </el-form-item>
          <!--位次-->
          <el-form-item label="高考位次" class="fromItem" prop="st_rank">
            <el-input v-model="signUpForm.st_rank" clearable></el-input>
          </el-form-item>
        </el-form>

      </div>

      <el-row>
        <el-button type="primary" class="submit_button" @click="submit">提交</el-button>
        <el-button type="primary" class="clear_button" @click="resetSignUpForm">清空</el-button>
      </el-row>

    </div>

  </div>
</template>

<script>

export default {
  name: "Signup",
  data() {
    const checkUsername = (rule, value, callback) => {
      if (!/^[a-zA-Z][a-zA-Z0-9]{3,15}$/.test(value)) {
        callback(new Error('用户名由英文字母或数字组成的4-15位字符，以字母开头'))
      }
    }

    const checkPassword = (rule, value, callback) => {
      if (!/^(?=.*[A-Z])[A-Za-z\d]{6,20}$/.test(value)) {
        callback(new Error('请输入6-20位英文字母或数字且必须有至少一个大写字母'))
      }
    }

    const checkPassword2 = (rule, value, callback) => {
      if (value !== this.signUpForm.password) {
        console.log(value)
        console.log(this.signUpForm.password)
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };

    const checkst_number = (rule, value, callback) => {
      if (!/^[0-9]*^\d{14}$/.test(value)) {
        callback(new Error('请正确输入14位考号'))
      }
    }

    const checkst_rank = (rule, value, callback) => {
      if (!/^[0-9]*^\d{0,6}$/.test(value)) {
        callback(new Error('请正确输入高考位次'))
      }
    }

    return {
      labelPosition: 'right',
      Username: '',

      signUpForm: {
        username: "st_" + this.Username,
        st_name: '',
        st_rank: '',
        st_number: '',
        password: '',
        checkPass:'',
        token: '',
      },
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
        st_number: [
          {required: true, message: "请输入考号", trigger: "blur"},
          {validator: checkst_number, trigger: "blur"}
        ],
        st_rank: [
          {required: true, message: "请输入高考位次", trigger: "blur"},
          {validator: checkst_rank, trigger: "blur"}
        ],
      },
      // subjects: subjectOptions
    }
  },
  methods: {
    resetSignUpForm() {
      this.$refs.signUpFormRef.resetFields();
    },
//数据验证

    submit() {
      this.$http({
        method: 'post',
        url: '/User/SignUp',
        data: this.signUpForm
      }).then(res => {
        if (res.data.info.code !== 200)
          return this.$message.error(res.data.info.message);
        this.$message.success("注册成功！");
        this.$router.push("/Login");
      })
    }
  }
};
</script>

<style scoped>
.Background
{
  width:100%;
  height:100vh;
  background:url(~@/img/Background.jpg) center center no-repeat;
  background-size:100% 100%;
  position:absolute;
}

.Title
{
  text-align:center;
  font-family:"Microsoft YaHei UI", serif;
  font-size:50px;
  color:#F0F8FF;
  text-shadow:
      -1px -1px 0 #4f4d57,
      1px -1px 0 #4f4d57,
      -1px 1px 0 #4f4d57,
      1px 1px 0 #4f4d57,
      0 2px 2px rgba(0,0,0,0.6);
  top:70px
}

.From-Background
{
  width:500px;
  height:500px;
  background-color:#E8E8E8;
  border-radius:15px;
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
}

.From
{
  position:absolute;
  top:10%;
  padding-left:15%;
  padding-right:15%;
}



.submit_button
{
  position:absolute;
  top:430px;
  right:300px;
}

.clear_button
{
  position:absolute;
  top:430px;
  right:150px;
}
</style>