<template>
<div class="Background">
<div class="Title">
  欢迎注册高考智能决策系统
</div>
  <div class="From-Background">
<div class="From">
  <el-form :model="signUpForm" :label-position="labelPosition" label-width="80px" ref="signUpFormRef">
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
    <el-form-item label="确认密码" class="fromItem" prop="password">
      <el-input v-model="signUpForm.password"
                type="password"
                prefix-icon="el-icon-key"
                show-password clearable></el-input>
    </el-form-item>
    <!--分数-->
    <el-form-item label="高考分数" class="fromItem" prop="st_mark">
      <el-input v-model="signUpForm.st_mark" clearable></el-input>
    </el-form-item>
    <!--电话-->
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
import { defineComponent, ref } from 'vue'
//const subjectOptions = ['物理', '化学', '生物', '政治','历史','地理'];
export default {
  name: "Signup",
  data() {
    return {
      labelPosition: 'right',
      signUpForm: {
        st_name: ref(''),
        st_mark: ref(''),
        st_mobile: ref(''),
        password:ref(''),
        token: ref('student'),
      },

      // subjects: subjectOptions
    };
  },
  methods:{
    resetSignUpForm(){
      this.$refs.signUpFormRef.resetFields();
    },

    submit(){
      this.$http({
        method:'post',
        url:'/SignUp',
        data: this.signUpForm
      }).then(res=>{
        if (res.data.info.code !== 200)
          return this.$message.error(res.data.info.message);
        this.$message.success("注册成功！");
      })
    }
  }
}
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