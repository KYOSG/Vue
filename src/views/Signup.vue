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
      <el-input v-model="studentData.name" clearable></el-input>
    </el-form-item>

    <!--考号-->
    <el-form-item label="考生号" class="fromItem">
      <el-input v-model="studentData.number" clearable></el-input>
    </el-form-item>

    <!--密码-->
    <el-form-item label="密码" class="fromItem">
    <el-input v-model="studentData.password"
              type="password"
              prefix-icon="el-icon-key"
              show-password clearable></el-input>
    </el-form-item>

    <!--毕业时间-->
    <el-form-item label="毕业时间" class="formItem">
        <el-date-picker
            v-model="studentData.year"
            type="year">
        </el-date-picker>
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
       <el-button type="primary" class="submit_button">提交</el-button>
      <el-button type="primary" class="clear_button">清空</el-button>
    </el-row>

  </div>

</div>
</template>

<script type="text/javascript" src="../assets/Js/signUp.js">
</script>

<style scoped>
</style>