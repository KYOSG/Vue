<template>
  <div id = 'app' class="Background0">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Footer from "./components/footer"
import Header from "./components/Header"
export default {
  name: 'app',
  components: {
    Header,
    Footer,
  },
}

</script>

<style>
.Background0{
  background-color: #f7f7f7;
  height: 100%;
  width: 100%
}
</style>