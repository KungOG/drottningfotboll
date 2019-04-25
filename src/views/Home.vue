<template>
  <article class="content">
    <section class="logo">
      <h1>Logo</h1>
    </section>
    <section>
      <p>Logga in med Google eller Facebook</p>
      <div>
        <img src="@/assets/google-logo.png" alt="Google Logo" @click="googleLogin">
        <p @click="$router.push('./adminlogin')">Admin</p>
      <!--  <img src="@/assets/facebook-logo.png" alt="Facebook Logo" @click="facebookLogin"> -->
      </div>
      <br>
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
        user: ""
      }
    },
    methods: {
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
              isAdmin: true,
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
            const provider = new firebase.auth.FacebookAuthProvider();

            firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // ...
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            });
        } 
    }
}
</script>
