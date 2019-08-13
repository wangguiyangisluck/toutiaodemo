import VueRouter from 'vue-router'
// 使用时要导入Vue包
import Vue from 'vue'
// 导入Login路由
import Login from '@/views/login'
// 使用VueRouter
Vue.use(VueRouter)

// 初始化router
const router = new VueRouter({
  routes: [
    // 跳转路由 $router.push('/login') 或者 $router.push({name:'login'})
    { path: '/login', name: 'login', component: Login }
  ]
})

// 导出配置项
export default router
