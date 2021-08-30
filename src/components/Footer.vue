<template>
  <footer>
    <div class="footer">
      <div class="container w">
        <div class="row">
          <div class="col-md-7">
            <div class="row">
              <div class="col-lg-6 col-md-12">
                <div class="hedingh3 text_align_left">
                  <h4>底部介绍栏一</h4>
                  <ul class="menu_footer">
                    <!-- 如果不登陆也可也通过这几个链接去访问我们的一些网页 -->
                    <li> <a href=" # ">链接网页一</a></li>
                    <li> <a href="# ">链接网页二</a></li>
                    <li> <a href="# "> 链接网页三</a></li>
                    <li> <a href="#"> 链接网页四</a></li>

                  </ul>
                </div>
              </div>
              <div class="col-lg-6 col-md-12">
                <div class="hedingh3 text_align_left">
                  <h4>底部介绍栏二</h4>
                  <ul class="menu_footer">
                    <!-- 如果不登陆也可也通过这几个链接去访问我们的一些网页 -->
                    <li> <a href=" # ">链接网页一</a></li>
                    <li> <a href="# ">链接网页二</a></li>
                    <li> <a href="# "> 链接网页三</a></li>
                    <li> <a href="#"> 链接网页四</a></li>

                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-5">
            <div class="row">
              <div class="col-lg-6 col-md-12">
                <div class="hedingh3 text_align_left">
                  <h4>底部介绍栏三</h4>

                  <p> 介绍部分</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>

<script>
export default {
  name: "footer"
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  padding:0;
  margin:0;
}
.w {
  width: 1200px;
  margin: 0 auto;
}

li {
  list-style: none;
}
a {
  text-decoration: none;
}

h4 {
  float: left;
}

.header img {
  display:inline-block;
  float: left;
  width: 120px;
  height: 120px;
}

.header_h4 {
  margin: 48px 10px;

  font-size: 24px;
  color: #F49F0A;
}

.shortcut {
  height: 40px;

  background-color: #f5f5f5;
  line-height: 40px;
}

.shortcut img {
  float: left;
  width: 50px;
  height: 30px;
  margin-right: 20px;
}

.fr {
  margin-left: 50%;
}

.shortcut ul li {
  float: left;
  list-style: none;

}

.shortcut ul li a {
  color: #666666;
}

.shortcut ul li a:hover {
  color: #F49F0A;
}

.style_red {
  color: #c81623;
}

.shortcut .fr ul li:nth-child(even) {
  width: 1px;
  height: 12px;
  background-color: #666;
  margin: 14px 15px 0;
}


.footer {
  height: 178px;
  padding-bottom: 15px;
  background: #F49F0A;
  text-align: center;
}

.hedingh3 h4 {
  color: #fff;
  margin-top: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  line-height: 23px;
  font-weight: 400;
  text-align: left;
}

.hedingh3 p {
  color: #fff;
  text-align: left;
}

ul.social_icon li {
  display: inline-block;
  margin: 0 2px;
}

ul.social_icon li a i {
  font-size: 17px;
  color: #323757;
  transition: ease-in all 0.5s;
  background: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50px;
  text-align: center;
}

ul.social_icon li a i:hover {
  color: #fff;
  transition: ease-in all 0.5s;
  background: #dc2727;
}

ul.menu_footer {
  text-align: left;

}

ul.menu_footer li a {
  color: #fff;
  font-size: 14px;
  line-height: 18px;
  margin-top: 10px ;
  margin-bottom: 10px ;

  display: block;
}

ul.menu_footer p {
  font-size: 14px;
}
ul.menu_footer li a:hover {
  color: #dc2727;
}

.text_align_left {
  float: left;
  margin: 0;
  padding-right: 256px;
}

.text_align_left1 {
  float: left;
  margin: auto 0;
}

.content {

  background-color: #fff;
  padding: 10px;
}

</style>