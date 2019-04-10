<template>
    <article class="content">
        <p>Logga in med Google eller Facebook</p>
        <button class="googlebtn" @click="googleLogin">
            <img src="@/assets/google-logo.png" alt="Google Logo">
        </button>
        <button class="facebookbtn" @click="facebookLogin">
            <img src="@/assets/facebook-logo.png" alt="Facebook Logo">
        </button>
        <br>
    </article>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebaseInit'

export default {
    name : 'login',
    data() {
      return {
        allUsers: [],
        user: ""
      }
    },
    methods: {
        async googleLogin () {
            const provider = new firebase.auth.GoogleAuthProvider();

          await firebase.auth().signInWithPopup(provider).then(async(result) => {
              this.user = firebase.auth().currentUser;

              var items = db.collection('users');
              await items.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  console.log(doc.id)
                  this.allUsers.push(doc.id)
                })
            })
              console.log(this.user.uid)
              console.log(this.allUsers)

            }).catch((err) => {
                alert('Whops, something happend here..' + err.message)
            });
          this.addUser();
          this.$router.replace('/playerinfo');

        },
        addUser(){
          if(this.allUsers.includes(this.user.uid)) {
            console.log('hej')

          } else {
            var user = {
              name: "",
              teams: [],
              uid: this.user.uid
            }
            this.$store.dispatch('addPlayerToDb', user)
            console.log('hejdå')
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
