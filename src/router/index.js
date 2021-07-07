import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "@/views/Login";
import Home from "@/components/Home";
import Signup from "@/views/Signup";





const routes = [
  {path:'/',redirect:'/Home'},
  {path: '/Login',name:'Login',component:Login},
  {path: '/Home', name:'Home',component:Home},
  {path: '/Signup', name:'Signup',component:Signup}


]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
