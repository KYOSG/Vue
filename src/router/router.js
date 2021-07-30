import Home from "@/components/Home";
import router from "@/router/index";

var routes = [{
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

export default router