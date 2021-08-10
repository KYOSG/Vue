import {createApp} from 'vue'

import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import './assets/css/global.css'
import 'lib-flexible'
import axios from 'axios';
import promise from "q";
import echarts from 'echarts'

const app = createApp(App)
app.config.globalProperties.$http = axios;
axios.defaults.baseURL = 'http://192.168.1.111:8083/';
axios.interceptors.request.use(
    config=>{
        let token = sessionStorage.getItem('token')
        if (!config.headers.hasOwnProperty('token') && token){
            config.headers.token = token;
        }
        return config;
    },
    error => {
        return promise.reject(error);
    }
    );
//Echarts
app.config.globalProperties.$echarts=window.echarts;

installElementPlus(app)
app.use(router).mount('#app')
