import Vue from 'vue'
import App from './App'
import router from './router'
import store from './stores'

import axios from 'axios'
Vue.prototype.axios = axios // 暂时可以这么写

Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg) // 因为url里面有w.h，座椅通过滤重新设置
})

import Scroller from '@/components/Scroller'
Vue.component('Scroller',Scroller)

import Loading from '@/components/Loading'
Vue.component('Loading',Loading)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template:'<app />'
})
