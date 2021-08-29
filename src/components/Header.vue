<template>
  <div class="header">
    <div class="header_midil">
      <div class="container-width">
        <div class="row d_flex">
          <div class="col-lg-9 col-md-12 col-sm-12">
            <div class="navbar-area">
              <nav class="site-navbar">
                <ul>
                  <li><a href="#">首页</a></li>
                  <li><a @click="School">院校库</a></li>
                  <li><a @click="Major" >专业库</a></li>
                  <li><a @click="Login">登录</a></li>
                  <li><a @click="Signup">注册</a></li>
                </ul>
                <button class="nav-toggler">
                  <span></span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { School } from '@element-plus/icons'
import { Collection } from '@element-plus/icons'
export default {
  name: "Header",
  methods:{
    School:function (){
      this.$router.push('/SchoolInf');
    },
    Major:function (){
      this.$router.push('/MajorInf');
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
a{
  cursor: pointer;
}

.header{
  background-color: #f9844a;
  font-size: 20px;
  font-family: "Microsoft YaHei UI",serif;
}
.Background{
  background-color: #f7f7f7;
  height: 1400px;
  width: 100%
}
.h1{
  font-size: 50px;
  position: absolute;
  top: 800px;
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
  top: 1100px;
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
@media (max-width: 350px) {
  .wrapper{
    margin: 200px auto;
  }
}
.wrapper .box{
  width: 350px;
  margin: 0 auto;
  position: relative;
  perspective: 500px;
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

.container-width {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  clear: both;
  display: block;
  box-sizing: border-box;
}

.logo a {
  font-size: 50px;
  color: #323757;
  font-weight: 700;
  font-style: italic;
}

.header_midil {
  position: relative;
  background: #F49F0A;
  width: 100%;
  height: 20px;
  padding: 10px 0px;
}

.site-navbar {
  display: flex;

  justify-content: space-between;
  align-items: center;
}

.site-navbar ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
}

.site-navbar ul li a {
  color: #fff;
  font-size: 14px;
  display: block;
  text-decoration: none;
  text-transform: uppercase;
}

.site-navbar ul li {
  padding-right: 30px;
}

.site-navbar ul li:last-child {
  padding-right: 0;
}

.site-navbar ul li a:hover {
  color: #323757;
}

.site-navbar ul li a.active {
  color: #323757;
}

.site-navbar .button {
  position: absolute;
  right: 10px;
  padding-right: 10px;
}

.site-navbar .button li {
  float: left;
  background-color: #F49F0A;
}

.nav-toggler {
  border: 3px solid #fff;
  padding: 5px;
  background-color: transparent;
  cursor: pointer;
  height: 39px;
  display: none;
  z-index: 99999;
}

.nav-toggler span,
.nav-toggler span:before,
.nav-toggler span:after {
  width: 28px;
  height: 3px;
  background-color: #fff;
  display: block;
  transition: .3s;
}

.nav-toggler span:before {
  content: '';
  transform: translateY(-9px);
}

.nav-toggler span:after {
  content: '';
  transform: translateY(6px);
}
ul.email li a {
  color: #fff;
  text-transform: uppercase;
  font-size: 17px;
}

ul.email li a i {
  color: #fff;
  font-size: 19px;
  padding-right: 10px;
}

.el-button--primary {
  background-color: #F49F0A;
  border-color: #F49F0A;
}

.el-input_inner input{
  width: 10px;
}
</style>