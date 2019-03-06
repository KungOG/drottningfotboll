import Vue from 'vue'
import App from './App.vue'
import router from './router'
import index from './store'

Vue.config.productionTip = false

new Vue({
  router,
  index,
  render: h => h(App)
}).$mount('#app')
