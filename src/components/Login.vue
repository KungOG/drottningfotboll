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
        allUsers: []
      }
    },
    methods: {
        googleLogin () {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {
              var user = firebase.auth().currentUser;

              var items = db.collection('users');
              items.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  console.log(doc.id)
                  this.allUsers.push(doc.id)
                })
            })
              console.log(user.uid)

              if(this.allUsers.includes(user.uid)) {
                console.log('hej')

              } else {
                var user = {
                  name: "",
                  teams: [],
                  uid: user.uid
                }
                this.$store.dispatch('addPlayerToDb', user)
                console.log('hejdå')
              }
                this.$router.replace('/playerinfo');
            }).catch((err) => {
                alert('Whops, something happend here..' + err.message)
            });
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
