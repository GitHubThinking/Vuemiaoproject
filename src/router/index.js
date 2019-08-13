import Vue from 'vue'
import Router from 'vue-router'

import movieRouter from './movie'
import cinemaRouter from './cinema'
import mineRouter from './mine'
import adminRouter from './admin'
Vue.use(Router)

export default new Router({
  mode:'history',
  base: '/miaoproject',
  routes: [
    // 此处不采用传统的写法
    movieRouter,
    cinemaRouter,
    mineRouter,
    adminRouter,
    {
      path:'/*',
      redirect:'/movie'
    }
  ]
  
})
