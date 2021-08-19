<template>
  <div class="Background">
    <el-header class="header">
      <el-menu background-color="#f9844a" text-color="#f7f7f7">
        <el-menu-item @click="Home" class="el-icon-price-tag">首页</el-menu-item>
        <el-menu-item @click="School" class="el-icon-school">院校库</el-menu-item>
        <el-menu-item @click="Major" class="el-icon-files">专业库</el-menu-item>
        <el-menu-item @click="Login" class="el-icon-user">登录</el-menu-item>
        <el-menu-item @click="Signup" class="el-icon-user-solid">注册</el-menu-item>
      </el-menu>
    </el-header>
    <!--走马灯-->
    <div class="block">
      <el-carousel height="400px" arrow="never" width="100%">
        <el-carousel-item v-for="item in 2" :key="item" class="el-carousel__item">
          <img src="../img/Carousel.png" alt="" class="carousel-image">
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--热门院校-->
    <div class="hotSchool">
      <h1 class="h1">热门院校</h1>
      <div class="container">

        <div class="card">
          <div class="img">
            <img src="../img/OUC.png" alt="">
          </div>
          <div class="top-text">
            <div class="name">中国海洋大学</div>
            <p>985|211|强基计划|双一流</p>
          </div>
          <div class="bottom-text">
            <div class="text"> 位于山东省青岛市，是中华人民共和国教育部直属的综合性全国重点大学，位列世界一流大学建设高校，全国首批博士、硕士学位授予单位。</div>
            <div class="button">
              <a target="_blank" href="https://www.ouc.edu.cn/">官方网站</a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="img">
            <img src="../img/NKU.png" alt="">
          </div>
          <div class="top-text">
            <div class="name">南开大学</div>
            <p>985|211|强基计划|双一流</p>
          </div>
          <div class="bottom-text">
            <div class="text"> 位于天津市，由中华人民共和国教育部直属，中央直管副部级建制，全国深化创新创业教育改革示范高校、学位授权自主审核单位，为国际公立大学论坛成员，是“学府北辰”之一。</div>
            <div class="button">
              <a target="_blank" href="https://www.nankai.edu.cn/">官方网站</a>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="img">
            <img src="../img/WHU.png" alt="">
          </div>
          <div class="top-text">
            <div class="name">武汉大学</div>
            <p>985|211|双一流</p>
          </div>
          <div class="bottom-text">
            <div class="text"> 位于湖北省武汉市，是中华人民共和国教育部直属的综合性全国重点大学，为欧亚-太平洋大学联盟、大学通识教育联盟、中国高校行星科学联盟、法学教育创新联盟、医学“双一流”建设联盟成员</div>
            <div class="button">
              <a target="_blank" href="https://www.whu.edu.cn/">官方网站</a>
            </div>
          </div>
        </div>
      </div >
    </div>
    <!--功能卡-->
    <div class="wrapper">
      <div class="box"  @click="School">
        <div class="front-face">
            <school/>
          <span>院校库</span>
        </div>
        <div class="back-face">
          <span>院校库</span>
          <p>
            查看院校的详细信息，甄选出心仪的大学
          </p>
        </div>
      </div>

      <div class="box"  @click="Major">
        <div class="front-face">
            <Collection/>
          <span>专业库</span>
        </div>
        <div class="back-face">
          <span>专业库</span>
          <p>
            按照大类查看各专业的详细信息，找到适合自己的专业
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { School } from '@element-plus/icons'
import { Collection } from '@element-plus/icons'
export default {
  name: "Home",
  methods:{
    School:function (){
      this.$router.push('/School');
    },
    Major:function (){
      this.$router.push('/Major');
    },
    Home:function (){
      this.$router.push('/Home');
    },
    Signup:function (){
      this.$router.push('/Signup');
    },
    Login:function (){
      this.$router.push('/Login');
    },
  },
  components: {
    School,
    Collection
  }
}

</script>
<style scoped>


.header{
  background-color: #f9844a;
  font-size: 20px;
  font-family: "Microsoft YaHei UI",serif;
}
.Background{
  background-color: #f7f7f7;
  height: 100%;
  width: 100%
}
.h1{
  font-size: 50px;
  position: absolute;
  top: 1050px;
  left: 50%;
  transform: translate(-50%,  -50%);
}
.el-carousel__item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel-image {
  max-width: 100%;
  max-height: 100%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.container{
  position: absolute;
  top: 1300px;
  left: 50%;
  transform: translate(-50%,  -50%);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.card{
  height: 290px;
  width: 350px;
  margin: 0 20px;
  background:white;
  transition: 0.4s;
  box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
}
.card:hover{
  height: 470px;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.2);
}
.card .img{
  height: 200px;
  width: 100%;
}
.card .img img{
  height: 100%;
  width: 100%;
  object-fit: cover;
}
.card .top-text{
  padding: 5px;
}
.card .top-text .name{
  font-size: 25px;
  font-weight: 600;
  color: #202020;
}
.card .top-text p{
  font-size: 20px;
  font-weight: 600;
  color: #e74c3c;
  line-height: 20px;
}
.card .bottom-text{
  padding: 0 20px 10px 20px;
  margin-top: 5px;
  background: white;
  opacity: 0;
  visibility: hidden;
  transition: 50ms;
}
.card:hover .bottom-text{
  opacity: 1;
  visibility: visible;
}
.card .bottom-text .text{
  text-align: justify;
}
.card .bottom-text .button{
  margin: 10px 0;
  text-align: left;
}
.card .bottom-text .button a{
  text-decoration: none;
  background: #e74c3c;
  color: #f2f2f2;
  padding: 5px 8px;
  border-radius: 3px;
  display: inline-flex;
  transition: 0.2s;
}
.card .bottom-text .button a:hover{
  transform: scale(0.9);
}


.wrapper{
  display: grid;
  margin: 200px 90px auto;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
}
@media (max-width: 700px) {
  .wrapper{
    margin: 200px auto;
  }
}
.wrapper .box{
  width: 350px;
  margin: 0 auto;
  position: relative;
  perspective: 1000px;
  cursor:pointer;
}
.wrapper .box .front-face{
  background: #ffffff;
  height: 220px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 5px 20px 0 rgba(0, 81, 250, 0.1);
  transition: all 0.5s ease;
}
.box .front-face .icon i{
  font-size: 65px;
}
.box .front-face span,
.box .back-face span{
  font-size: 35px;
  font-weight: 600;
  text-transform: uppercase;
}
.box .front-face .icon i,
.box .front-face span{
  font-size: 35px;
  background: linear-gradient(-135deg, #ffb703, #fb8500);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.box .back-face{
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  height: 220px;
  width: 100%;
  padding: 30px;
  color: #fff;
  opacity: 0;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  background: linear-gradient(-135deg, #ffb703, #fb8500);
  transform: translateY(110px) rotateX(-90deg);
  box-shadow: 0 5px 20px 0px rgba(0, 81, 250, 0.1);
  transition: all 0.5s ease;
}
.box .back-face p{
  font-size: 15px;
  margin-top: 10px;
  text-align: justify;
}
.box:hover .back-face{
  opacity: 1;
  transform: rotateX(0deg);
}
.box:hover .front-face{
  opacity: 0;
  transform: translateY(-110px) rotateX(90deg);
}
</style>