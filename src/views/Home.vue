<template>
  <article class="home-page" v-touch:swipe.left="leftSwipe" v-touch:swipe.right="rightSwipe">
    <section class="home-logo menu">
      <ul class="slider" :class="'slide-' + activeSlide"></ul>
      <img src="@/assets/img/crown.png" alt="">
      <img src="@/assets/img/fotball.png" alt="">
      <h3>Kung<br>Fotboll</h3>
    </section>
    <section class="home-login">
      <div class="login-btn" @click="googleLogin">
        <img src="@/assets/img/google.svg" alt="Google Logo" >
        <p>Logga in med Google</p>
      </div>
      <div class="login-btn" @click="facebookLogin">
        <img src="@/assets/img/facebook.svg" alt="Facebook Logo">
        <p>Logga in med Facebook</p>
      </div>
    </section>
    <section class="admin-login">
        <a href="#" @click="$router.push('./adminlogin')" class="admin-login-btn">Admin</a>
    </section>
  </article>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebaseInit'

export default {
    name : 'home',
    data() {
      return {
        allUsers: [],
        user: ''
      }
    },
    methods: {
        /* Swipe funktionen */
        activeSlide () {
            return this.$store.state.activeSlide;
        },
        leftSwipe () {
            this.$store.commit('swipe', 2);
            this.$router.push('/stats')
        },
        rightSwipe () {
            this.$store.commit('swipe', 0);
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
              alert('Whops, something happend here..' + err.message)
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
            this.$store.dispatch('setCurrentUser', this.user);         
            this.$router.replace('/loading');
          } else {
            this.addUser();
            this.$store.dispatch('setCurrentUser', this.user);  
            this.$router.replace('/addname');            
          }
        },
        
        facebookLogin () {
          // Sign in using a popup.
          var provider = new firebase.auth.FacebookAuthProvider();
          provider.addScope('user_birthday');
          firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
          });
        } 
    }
}
</script>