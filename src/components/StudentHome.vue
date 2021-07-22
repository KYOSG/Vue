<template>
    <el-container class="stHome-container">
      <el-header class="header">
        <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            background-color="#023047"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="1">个人主页</el-menu-item>
          <el-submenu index="2">
            <template #title>志愿填报</template>
            <el-menu-item index="2-1">院校库</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
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
        <!--路由占位符-->
        <router-view></router-view>
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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
</style>