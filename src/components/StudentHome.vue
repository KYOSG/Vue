<template>
  <el-container class="stHome-container">
      <el-header class="header">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#023047"
            text-color="#fff"
            active-text-color="#ffd04b"
            :router="true">
          <el-button type="info" @click="logout" class="signOutButton">退出</el-button>
          <el-menu-item index="/StudentWelcome">个人主页</el-menu-item>
          <el-submenu index="2">
            <template #title  > 志愿填报</template>
            <el-menu-item index="/SchoolSel">院校查询</el-menu-item>
            <el-menu-item index="/MajorSel">专业查询</el-menu-item>
            <el-menu-item index="/MajorSel">指导老师</el-menu-item>
            <el-menu-item index="/Data">高考信息可视化</el-menu-item>
            <el-submenu index="2-4">
              <template #title>选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main class="main">
        <div>
          <div>
            <!--路由占位符-->
            <router-view></router-view>
          </div>
        </div>

      </el-main>
    </el-container>


</template>


<script>
export default {
  data() {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    };
  },
  methods: {
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/Home')
    },
    handleSelect(key, keyPath) {
    }
  }
}
</script>

<style scoped>

.stHome-container{
  height: 100%;
}
.header{
  background-color: #023047;
  justify-content: center;
}
.main{
  background-color: #8ECAE6;
}
.signOutButton{
  position: absolute;
  top: 14%;
  right: 4px;
}
.secBackground{
  width: 95%;
  height: 90%;
  background-color: #E8E8E8;
  border-radius: 15px;
  position: absolute;
  left: 50%;
  top: 53%;
  transform: translate(-50%,  -50%);
}
</style>