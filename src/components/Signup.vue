<template>
<div class="Background">
<div class="Title">
  欢迎注册高考智能决策系统
</div>
  <div class="From-Background">
<div class="From">
  <el-form :label-position="labelPosition" label-width="80px" >
    <!--姓名-->
   <el-form-item label="姓名" class="fromItem" >
      <el-input v-model="studentData.st_name" clearable></el-input>
    </el-form-item>
    <!--姓名-->
    <el-form-item label="高考分数" class="fromItem" >
      <el-input v-model="studentData.st_mark" clearable></el-input>
    </el-form-item>
    <!--姓名-->
    <el-form-item label="电话" class="fromItem" >
      <el-input v-model="studentData.st_mobile" clearable></el-input>
    </el-form-item>
    <!--姓名-->
    <el-form-item label="用户名" class="fromItem" >
      <el-input v-model="studentData.username" clearable></el-input>
    </el-form-item>
    <!--姓名-->

    <!--密码-->
    <el-form-item label="密码" class="fromItem">
    <el-input v-model="studentData.password"
              type="password"
              prefix-icon="el-icon-key"
              show-password clearable></el-input>
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
      <el-button type="primary" class="clear_button" @click="resetLoginForm">清空</el-button>
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
      studentData: {
        st_name: ref(''),
        st_mark: ref(''),
        st_mobile: ref(''),
        password:ref(''),

        token: ref('editor'),
      },

      // subjects: subjectOptions
    };
  },
  methods:{
    resetLoginForm(){
      this.$refs.loginFormRef.resetFields();
    },
    submit(){
      this.$http({
        method:'post',
        url:'/queryUser',
        data: this.loginForm
      }).then(res=>{
        if (res.data.info.code === 0)
          this.$message.success("登录成功！");
        else
          return this.$message.error("登录失败！");
        if (res.data.data.token === "admin")
          this.$router.push("/ManagerHome");
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
}

.From-Background
{
  width:500px;
  height:400px;
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
  top:310px;
  right:300px;
}

.clear_button
{
  position:absolute;
  top:310px;
  right:150px;
}
</style>