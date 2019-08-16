import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import touch from 'vue2-touch-events'
import VueSwal from 'vue-swal'

Vue.use(touch, VueSwal)
Vue.config.productionTip = false;
let app = '';
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App)
    }).$mount('#app');
  }
});