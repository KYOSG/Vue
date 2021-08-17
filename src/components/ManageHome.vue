<template>
    <el-container class="maHome-container">
        <!--头部-->
        <el-header class="header">
            <div>
                <span class="title">后台管理</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
          <!--侧边栏菜单区域-->
            <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
              <div class="toggle-button" @click="toggleCollapse">III</div>
                    <el-menu
                        :uniqueOpened="true"
                        background-color="#545c64"
                        text-color="#EBEBEB"
                        active-text-color="#FED766"
                        class="menu"
                        :collapse="isCollapse"
                        :collapse-transition="false"
                        :router="true">
                      <el-submenu index="0">
                        <template #title>
                          <i class="el-icon-user-solid"></i>
                          <span>用户管理</span>
                        </template>
                        <el-menu-item-group>
                          <el-menu-item index="/StudentInfManager" class="el-icon-user">学生信息</el-menu-item>
                          <el-menu-item index="/TeacherInfManager" class="el-icon-s-custom" >指导老师信息</el-menu-item>
                        </el-menu-item-group>
                      </el-submenu>
                      <el-submenu index="2">
                        <template #title>
                          <i class="el-icon-user-solid"></i>
                          <span>院校管理</span>
                        </template>
                        <el-menu-item-group>
                          <el-menu-item index="/SchoolInf" class="el-icon-user">院校信息</el-menu-item>
                        </el-menu-item-group>
                      </el-submenu>
                    </el-menu>
            </el-aside>
            <el-main class="main">
              <!--路由占位符,路由设置中的内容会显示在此-->
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script >
export default {
  name: "ManagerHome",
  data(){
    return{
      isCollapse:false
    }
  },
  methods:{
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/Home')
    },
    toggleCollapse(){
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style scoped>
.title{
  align-content: center;
  display: flex;
  margin-top: 10px;
}



.header{
  background-color: #677079;
  display: flex;
  justify-content: space-between;
  align-content: center;
  color: #FFF;
  font-size: 30px;

}

.aside{
  background-color: #555C63;
}

.menu{
  border-right: none;
}

.main{
  background-color: #F4F4F8;
}
.maHome-container{
  height: 100%;
}

.toggle-button{
  background-color: #4B5258;
  font-size: 10px;
  line-height: 24px;
  color: #26292B;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>