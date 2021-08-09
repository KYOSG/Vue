import { createRouter, createWebHashHistory} from 'vue-router'
import Login from "@/components/Login";
import Home from "@/components/Home";
import Signup from "@/components/Signup";
import SchoolSel from "@/views/StudentHome/SchoolSel";
import ManagerHome from "@/components/ManageHome";
import ManagerWelcome from "@/views/ManagerHome/ManagerWelcome";
import StudentHome from"@/components/StudentHome"
import StudentInf from "@/views/ManagerHome/StudentInf";
import TeacherInf from "@/views/ManagerHome/TeacherInf";
import StudentWelcome from "@/views/StudentHome/StudentWelcome"
import SchoolInf from "@/views/ManagerHome/SchoolInf";
import Data from "@/views/StudentHome/Data";
import Test from "@/components/Test";

const routes = [{
  path: '/',
  redirect: '/Home'
},
  {
    path: '/Test',
    name: 'Test',
    component: Test
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
    path: '/Data',
    component: Data,
  },
  //管理员界面
  {
    path: '/ManagerHome',
    name: 'ManagerHome',
    component: ManagerHome,
    redirect: '/ManagerWelcome',
    children: [{
      path: '/ManagerWelcome',
      component: ManagerWelcome
    },{
      path: '/StudentInf',
      component: StudentInf,
    },{
      path: '/TeacherInf',
      component: TeacherInf,
    },{
      path: '/SchoolInf',
      component: SchoolInf,
    },]
  },
    //学生界面
  {
    path: '/StudentHome',
    name: 'StudentHome',
    component: StudentHome,
    redirect: '/StudentWelcome',
    children: [{
      path: '/StudentWelcome',
      component: StudentWelcome,
    },{
      path: '/SchoolSel',
      component: SchoolSel,
    },]
  }
  //老师界面
  ]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//导航守卫
//开启前先做白名单
/*
router.beforeEach((to, from, next) => {
  if (to.path === '/login')
    return next();

  const tokenStr = window.sessionStorage.getItem('token');

  if (!tokenStr)
    return next('/login');
})
*/
export default router
