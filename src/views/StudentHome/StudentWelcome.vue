<template>
  <div class="mainWindow w">
    <el-card>
        <div class="mainInf">
          <img src="../../img/Touxiang.png" alt="">
          <h3 class="color">欢迎使用高考志愿填报系统!</h3>
          <el-descriptions class="margin-top" :column="3" border>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-user"></i>
                用户名
              </template>
              {{info.username}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-mobile-phone"></i>
                联系方式
              </template>
              {{info.mobile}}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-tickets"></i>
                分数
              </template>
              {{  }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-tickets"></i>
                备注
              </template>
              <el-tag size="small">学校</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-location-outline"></i>
                考试位次
              </template>
              {{  }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label>
                <i class="el-icon-location-outline"></i>
                省份
              </template>
              {{  }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <Applications />
    </el-card>

  </div>
</template>

<script>
import Applications from './Applications'
export default {
  name: "StudentWelcome",
  data(){
    return{
      info:{
        id:'',
      }
    }
  },
  created() {

  },
  mounted() {
    this.getStudent()
  },
  methods: {
    getStudent(){
      console.log(this.id)
      this.$http({
        method: 'post',
        url: '/User/getUserInformation',
        data: this.sss
      }).then(res => {
        console.log(this.id)
        console.log(res.data)
        this.getMajorList = res.data.list
        this.total = res.data.total
      })
    }
  },
  components:{
    Applications,
  }

}
</script>

<style scoped>
.mainInf{
  margin-bottom: 40px;
}
.mainWindow{
  height: 100%;
}
.copyrights {
  height: 198px;
  margin-top: 15px;
  background-color: rgb(2,48,71);
}


.el-card {
  margin-top: 20px;
  padding-top: 30px;
  padding-bottom: 30px;
  margin-bottom: 60px;
}

.color {
  color: #f49f0a;
  margin-bottom: 30px;
}

.el-card img {
  width: 80px;
  height: 80px;
}

.w {
  width: 1200px;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
}

</style>