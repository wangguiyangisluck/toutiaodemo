import Vue from 'vue'
import App from './App.vue'
// 导入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入vue-router
// @ 是一个路径的别名 是src路径  在vue-cli项目下才有效
import router from '@/router'

// 导入全局样式
import '@/style/index.less'

// 导入axios
import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
