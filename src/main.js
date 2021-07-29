import {createApp, render} from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import './assets/css/global.css'
import 'lib-flexible'
import axios from "./assets/Js/axios";


const app = createApp(App)
app.config.globalProperties.$http=axios;
installElementPlus(app)
app.use(router).mount('#app')