import Vue from 'vue'
import App from './App'
import router from './router'
import stores from './stores'

import axios from 'axios'
Vue.prototype.axios = axios // 暂时可以这么写

Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg) // 因为url里面有w.h，座椅通过滤重新设置
})


Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  stores,
  components: {
    App
  },
  template: '<App/>'
})
