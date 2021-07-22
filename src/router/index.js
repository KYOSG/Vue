import { createRouter, createWebHashHistory} from 'vue-router'
import Login from "@/components/Login";
import Home from "@/components/Home";
import Signup from "@/components/Signup";
import searchSchool from "@/views/ManagerHome/StudentHome/searchSchool";
import ManagerHome from "@/components/ManageHome";
import ManagerWelcome from "@/views/ManagerHome/ManagerWelcome";
import StudentHome from"@/components/StudentHome"

const routes = [{
  path: '/',
  redirect: '/StudentHome'
},
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/searchSchool',
    name: 'searchSchool',
    component: searchSchool
  },
  {
    path: '/ManagerHome',
    name: 'ManagerHome',
    component: ManagerHome,
    redirect: '/ManagerWelcome',
    children: [{
      path: '/ManagerWelcome',
      component: ManagerWelcome
    }]
  },
  {
    path: '/StudentHome',
    name: 'StudentHome',
    component: StudentHome
  }
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router