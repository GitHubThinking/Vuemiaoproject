
import Vue from 'vue'
import App from './App'
import router from './router'
import stores from './stores'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  stores,
  components: { App },
  template: '<App/>'
})
