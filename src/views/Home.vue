<template>
  <article class="home-page" v-touch:swipe.left="leftSwipe" v-touch:swipe.right="rightSwipe">
    <section class="home-logo menu">
      <Pager :activeSlide='1' />
      <img src="@/assets/img/logo-queen-text.svg" alt="Drottning Fotboll logo" >
    </section>
    <section class="home-login">
      <div class="login-btn" @click="googleLogin">
        <img src="@/assets/img/google.svg" alt="Google Login Logo" >
        <p>Logga in med Google</p>
      </div>
      <div class="login-btn" @click="facebookLogin">
        <img src="@/assets/img/facebook.svg" alt="Facebook Login Logo">
        <p>Logga in med Facebook</p>
      </div>
    </section>
    <section class="admin-login">
      <a href="#" @click="$router.push('./adminlogin')" class="admin-login-btn">Admin</a>
    </section>
  </article>
</template>
<script>
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import db from '@/firebaseInit';
import Pager from '@/components/Pager.vue';
export default {
    name : 'home',
    data() {
      return {
        allUsers: [],
        user: ''
      }
    },    
    components: {
      Pager
    },
    methods: {
        activeSlide () {
            return this.$store.state.activeSlide;
        },
        leftSwipe () {
            this.$router.push('/stats')
        },
        rightSwipe () {
            this.$router.push('/about')  
        },
        googleLogin () {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(async(result) => {
              this.user = firebase.auth().currentUser;
              var items = db.collection('users');
              await items.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  this.allUsers.push(doc.id)
                })
              })
              this.loadPage();
            }).catch((err) => {
              alert('Whops, något hände! Prova igen lite senare!')
            });
        },
        addUser(){
          var user = {
            name: "",
            teams: [],
            uid: this.user.uid,
            photoURL: this.user.photoURL,
            email: this.user.email
          }
          this.$store.dispatch('addUserToDb', user) 
        },
        loadPage() {     
          if(this.allUsers.includes(this.user.uid)) {
            this.$store.dispatch('setLoginNumber', 0)
            this.$store.dispatch('setCurrentUser', this.user);         
            this.$router.replace('/loading');
          } else {
            this.addUser();
            this.$store.dispatch('setLoginNumber', 1)
            this.$store.dispatch('setCurrentUser', this.user);  
            this.$router.replace('/addname');            
          }
        },
        facebookLogin () {
          var provider = new firebase.auth.FacebookAuthProvider();
          firebase.auth().signInWithPopup(provider).then(async(result) => {
              this.user = firebase.auth().currentUser;
              var items = db.collection('users');
              await items.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  this.allUsers.push(doc.id)
                })
              })
              this.loadPage();
            }).catch((error) => {
              alert('Whops, något hände! Prova igen lite senare!')
            });
        }    
    }
}
</script>