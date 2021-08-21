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
            <template #title>志愿填报</template>
            <el-menu-item index="/SchoolSel">院校选择</el-menu-item>
            <el-menu-item index="/MajorSel">专业选择</el-menu-item>
            <el-menu-item index="/Applications">志愿清单</el-menu-item>
          </el-submenu>
            <el-menu-item index="/SchoolInf">院校查询</el-menu-item>
            <el-menu-item index="/MajorInf">专业查询</el-menu-item>
            <el-menu-item index="/Data">高考信息可视化(待定)</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="main">
            <!--路由占位符-->
            <router-view></router-view>
      </el-main>
     <div class="copyrights">
       <div class="footer1 footer">
         <h3>相关链接栏1</h3>
         <ul>
           <li><a href="#">链接一</a></li>
           <li><a href="#">链接二</a></li>
           <li><a href="#">链接三</a></li>

         </ul>
       </div>
       <div class="footer2 footer">
         <h3>相关链接栏2</h3>
         <ul>
           <li><a href="#">链接一</a></li>
           <li><a href="#">链接二</a></li>
           <li><a href="#">链接三</a></li>
         </ul>
       </div>
       <div class="footer3 footer">
         <h3>相关链接栏3</h3>
         <ul>
           <li><a href="#">链接一</a></li>
           <li><a href="#">链接二</a></li>
           <li><a href="#">链接三</a></li>
         </ul>
       </div>
       <div class="footer4 footer">
         <h3>相关链接栏4</h3>
         <ul>
           <li><a href="#">链接一</a></li>
           <li><a href="#">链接二</a></li>
           <li><a href="#">链接三</a></li>
         </ul>
       </div>
     </div>
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
  background-color: #FFF;
}
.signOutButton{
  position: absolute;
  top: 14%;
  right: 4px;
}

.copyrights {
  height: 198px;
  margin-top: 15px;
  background-color: rgb(2,48,71);
}

.footer {
  width: 300px;
  height: 60px;
  color: #FFF;
  padding-top: 20px;
  text-align: center;
}

.footer1 {
  float: left;
}

.footer2 {
  float: left;
}

.footer3 {
  float: left;
}

.footer4 {
  float: left;
}
.footer ul li {
  margin-left: -40px;
  text-decoration: none;
  list-style: none;
  padding: 5px;
}

.footer ul li a {
  color: #FFF;
  font-size: 14px;
}

.footer ul li a:hover {
  color: #83c5be;
}
</style>