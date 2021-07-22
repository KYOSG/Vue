import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import installElementPlus from './plugins/element'
import './assets/css/global.css'
import 'lib-flexible'
import store from './store'

const app = createApp(App).use(store)
installElementPlus(app)
app.use(router).mount('#app')