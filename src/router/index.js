import { createRouter, createWebHashHistory} from 'vue-router'
import Login from "@/components/Login";
import Home from "@/components/Home";
import Signup from "@/components/Signup";
import SchoolSel from "@/views/StudentHome/SchoolSel";
import ManagerHome from "@/components/ManageHome";
import ManagerWelcome from "@/views/ManagerHome/ManagerWelcome";
import StudentHome from"@/components/StudentHome"
import StudentInfManager from "@/views/ManagerHome/StudentInfManager";
import TeacherInfManager from "@/views/ManagerHome/TeacherInfManager";
import StudentWelcome from "@/views/StudentHome/StudentWelcome"
import SchoolInfManager from "@/views/ManagerHome/SchoolInfManager";
import MajorSel from "@/views/StudentHome/MajorSel";
import MajorInf from "@/views/StudentHome/MajorInf";
import SchoolInf from "@/views/StudentHome/SchoolInf";
import Applications from "@/views/StudentHome/Applications";
const routes = [{
  path: '/',
  redirect: '/Home'
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
      path: '/StudentInfManager',
      component: StudentInfManager,
    },{
      path: '/TeacherInfManager',
      component: TeacherInfManager,
    },{
      path: '/SchoolInfManager',
      component: SchoolInfManager,
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
    },{
      path: '/MajorSel',
      component: MajorSel,
    },{
      path: '/SchoolInf',
      component: SchoolInf
    },{
      path: '/MajorInf',
      component: MajorInf
    },{
      path: '/Applications',
      component: Applications
    }]
  },
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
