<template>
  <div id = 'app' class="Background0">
    <router-view :data = "show" @Page="Page"></router-view>
  </div>
</template>

<script>
import Footer from "./components/Footer"
import Header from "./components/Header"
export default {
  name: 'app',
  data(){
    return {
      show: true,
    }
  },
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