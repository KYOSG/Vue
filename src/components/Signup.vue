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
      <el-input v-model="signUpForm.Username" clearable></el-input>
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
      <el-input v-model="checkPass"
                type="password"
                prefix-icon="el-icon-key"
                show-password clearable></el-input>
    </el-form-item>
    <!--位次-->
    <el-form-item label="高考位次" class="fromItem" prop="st_rank">
      <el-input v-model="signUpForm.st_rank" clearable></el-input>
    </el-form-item>
    <!--考号-->
    <el-form-item label="电话" class="fromItem" prop="st_mobile">
      <el-input v-model="signUpForm.st_mobile" clearable></el-input>
    </el-form-item>
    <!--高考选课
    <el-form-item label="所选科目">
      <el-checkbox-group
          v-model="studentData.subject"
          min="0"
          max="4"
          class="checkBox">
        <el-checkbox-button v-for="subject in subjects" :label="subject" :key="subject">{{subject}}</el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>
-->
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

//const subjectOptions = ['物理', '化学', '生物', '政治','历史','地理'];
export default {
  name: "Signup",
  data() {
    const checkUsername = (rule, value, callback) => {
      if (!/^[a-zA-Z][a-zA-Z0-9]{3,14}$/.test(value)) {
        callback(new Error('用户名由英文字母和数字组成的4-15位字符，以字母开头'))
      }
    }

    const checkst_number = (rule, value, callback) => {
      if (!/^[0-9]*^\d{14}$/.test(value)) {
        callback(new Error('请正确输入考生号'))
      }
    }

    const checkst_rank = (rule, value, callback) => {
      if (!/^[0-9]*^\d{0,6}$/.test(value)) {
        callback(new Error('请正确高考位次'))
      }
    }

    const checkPassword = (rule, value, callback) => {
      if (!/^(?=.*[A-Z])[A-Za-z\d]{6,20}$/.test(value)) {
        callback(new Error('请输入6-20位英文字母或数字且必须有至少一个大写字母'))
      }
    }
    const checkPassword2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.signUpForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      labelPosition: 'right',
      Username: '',
      checkPass:'',
      signUpForm: {
        username: "st_" + this.Username,
        st_name: '',
        st_rank: '',
        st_number: '',
        password: '',
        token: '',
      },
      signUpFromRules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {validator: checkUsername, trigger: "blur"},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'},

        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {validator: checkPassword, trigger: "blur"}
        ],
        checkPass:[
          { validator: checkPassword2, trigger: 'blur' }
        ],
        st_rank: [
          {required: true, message: "请输入高考位次", trigger: "blur"},
          {validator: checkst_rank, trigger: "blur"}
        ],
        st_number: [
          {required: true, message: "请输入考号", trigger: "blur"},
          {validator: checkst_number, trigger: "blur"}
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

.fromItem
{
  padding-right:4%;
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