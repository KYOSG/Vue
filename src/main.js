import {createApp} from 'vue'

import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import './assets/css/global.css'
import 'lib-flexible'
import axios from 'axios';

const app = createApp(App)
app.config.globalProperties.$http = axios;
//接口请求的基准路径
axios.defaults.baseURL = 'http://192.168.1.111:8083/';
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    // 判断是否存在token,如果存在将每个页面header添加token
    if (sessionStorage.getItem("token")) {
        config.headers.common['Authorization'] = sessionStorage.getItem("token");
    }
    return config
}, function (error) {
    router.push('/login')
    return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response
}, function (error) {
    // 对响应错误做点什么
    if (error.response) {
        switch (error.response.status) {
            case 401:
                router.push('/login')
        }
    }
    return Promise.reject(error)
})

//Echarts
app.config.globalProperties.$echarts = window.echarts;

installElementPlus(app)
app.use(router).mount('#app')
