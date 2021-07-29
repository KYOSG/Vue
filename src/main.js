import {createApp, render} from 'vue'

import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import './assets/css/global.css'
import 'lib-flexible'
import axios from 'axios';

const app = createApp(App)
app.config.globalProperties.$http=axios;
axios.defaults.baseURL = 'http://localhost:8080/';
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';//配置请求头信息。
axios.defaults.headers.common['accessToken'] = 'FA4C308D5E8F6409E01344ADDAEB4C71';

installElementPlus(app)
app.use(router).mount('#app')
