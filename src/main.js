import {createApp} from 'vue'
import App from './App.vue'
/**
 * 全局导入，然后我们后这里不需要去用全局导入了，element-puls组件库了，我们这里使用按需映入，
 * 是在vite.config.js配置了全局导入，这里就不需要了 我这里不需要了直接删掉了
 */
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

app.use(store)
app.use(router)
app.mount('#app')


// 应用加载时检查登录状态
if (!store.getters.isLoggedIn) {
  router.push('/login');
} else {
  router.push('/Admin');
}


