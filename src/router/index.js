import { createRouter, createWebHashHistory } from 'vue-router'
import Login from "@/components/Login";


const routes = [
  {path:'/',redirect:'/Login'},
  {path: '/Login', component:Login}
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
