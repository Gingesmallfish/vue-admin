import {createApp} from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import router from './router'
import store from './store'
import './tailwindcss.scss'

const app = createApp(App)
// 注册 ElementPlus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


app.use(ElementPlus)
app.use(store)
app.use(router)

app.mount('#app')



// 应用加载时检查登录状态
if (!store.getters.isLoggedIn) {
  router.push('/login');
} else {
  router.push('/admin');
}


