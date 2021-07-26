import {createApp, render} from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import './assets/css/global.css'
import 'lib-flexible'
import store from './store'
import axios from'axios'


/*
axios.defaults.baseUrl = '此处填端口地址'
axios.interceptors.request.use(config =>{
    config.headers.authorization = window.sessionStorage.getItem('token')
})
app.config.globalProperties.$http = axios

app.config.productionTip = false
*/
const app = createApp(App).use(store)
installElementPlus(app)
app.use(router).mount('#app')