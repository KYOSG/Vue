<template>
<div class="Background">
<div class="Title">
  欢迎注册高考智能决策系统
</div>
  <div class="From-Background">
<div class="From">
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign">

   <el-form-item label="姓名" class="fromItem">
      <el-input v-model="studentData.name"></el-input>
    </el-form-item>

    <el-form-item label="高考成绩" class="fromItem">
      <el-input v-model="studentData.score"></el-input>
    </el-form-item>

    <el-form-item label="毕业时间">
        <el-date-picker
            v-model="studentData.year"
            type="year">
        </el-date-picker>
    </el-form-item>

    <el-form-item label="所选科目">
      <el-checkbox-group
          v-model="studentData.subject"
          min="0"
          max="4"
          class="checkBox">
        <el-checkbox-button v-for="subject in cities" :label="subject" :key="subject">{{subject}}</el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>

  </el-form>

</div>

  </div>

</div>
</template>




<script type="text/javascript" src="../assets/Js/Signup.js">



</script>



<style scoped>

</style>