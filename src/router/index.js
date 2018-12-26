import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式

import Bigscreeninter from '@/pages/Bigscreen_inter'
import Bigscreenmap from '@/pages/Bigscreen_map'

Vue.use(Router)

const initialRouteMap = [
  {
    path: '/',
    redirect: '/bigscreen/inter'
  },
  {
    path: '/bigscreen/inter',
    name: 'bigScreen',
    component: Bigscreeninter
  },
  {
    path: '/bigscreen/map',
    name: 'bigMap',
    component: Bigscreenmap
  }
]

const router = new Router({
  routes: initialRouteMap
})

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 全局路由开始守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(to)
  next()
  NProgress.done()
})

// 全局路由结束守卫
router.afterEach(() => {
  NProgress.done()
})

export default router
