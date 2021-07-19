import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "@/views/Login";
import Home from "@/components/Home";
import Signup from "@/views/Signup";
import searchSchool from "@/components/searchSchool";





const routes = [
  {path:'/',redirect:'/searchSchool'},
  {path: '/Login',name:'Login',component:Login},
  {path: '/Home', name:'Home',component:Home},
  {path: '/Signup', name:'Signup',component:Signup},
  {path: '/searchSchool', name:'searchSchool',component:searchSchool}

]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
