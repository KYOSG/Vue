<template>
    <Header />
    <!--路由占位符-->
    <router-view></router-view>
    <Footer />
</template>


<script>
import Footer from "../components/Footer"
import Header from "../components/Header"
export default {
  data() {
    return {

    };
  },
  methods: {
    logout(){
      window.sessionStorage.clear()
      this.$router.push('/Home')
    },
    handleSelect(key, keyPath) {
    }
  },
  components: {
    Header,
    Footer,
  },
}
</script>

<style scoped>

</style>