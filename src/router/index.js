import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "@/views/Login";
import Home from "@/components/Home";





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
