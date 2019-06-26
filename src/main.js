import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import firebase from 'firebase'
import touch from 'vue2-touch-events'

Vue.use(touch);
Vue.config.productionTip = false;
let app = '';
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      created: function(){
		  	firebase.auth().onAuthStateChanged((currentUser) => {
			  if(currentUser) {
          this.$router.replace('/playerinfo')
			    console.log(currentUser)
			  } else {
			    this.$router.replace('/home')
			  }
			})
		  },
      render: (h) => h(App)
    }).$mount('#app');
  }

});

