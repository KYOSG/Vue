<template>
    <el-container class="maHome-container">
        <!--头部-->
        <el-header class="header">
            <div>
                <img src="" alt="" class="headerimg">
                <span class="title">后台管理</span>
            </div>
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <el-container>
          <!--侧边栏菜单区域-->
            <el-aside width="200px" class="aside">
                    <el-menu
                        :uniqueOpened="true"
                        background-color="#545c64"
                        text-color="#fff"
                        active-text-color="#ffd04b">
                      <el-submenu index="1">
                        <template #title>
                          <i class="el-icon-location"></i>
                          <span>人员管理</span>
                        </template>
                        <el-menu-item-group>
                          <el-menu-item >学生信息</el-menu-item>
                          <el-menu-item >指导老师信息</el-menu-item>
                        </el-menu-item-group>
                      </el-submenu>
                    </el-menu>
            </el-aside>
            <el-main class="main">Main</el-main>
        </el-container>
    </el-container>
</template>

<script >

</script>

<style scoped>
.title{
  align-content: center;
  display: flex;
}
.headerimg{
  vertical-align: middle;
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

.main{
  background-color: #F4F4F8;
}
.maHome-container{
  height: 100%;
}
</style>