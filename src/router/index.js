import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "@/components/Login";
import Home from "@/views/Home";





const routes = [
  {path:'/',redirect:'/Home'},
  {path: '/Login',name:'Login',component:Login},
  {path: '/Home', name:'Home',component:Home},


]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
