<template>
    <article class="content">
        <p>Logga in med Google eller Facebook</p>
        <button class="googlebtn" @click="googleLogin">
            <img src="@/assets/google-logo.png" alt="Google Logo">
        </button>
        <button class="facebookbtn" @click="facebookLogin">
        <!--    <img src="@/assets/facebook-logo.png" alt="Facebook Logo"> -->
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
        googleLogin () {
            const provider = new firebase.auth.GoogleAuthProvider();

          firebase.auth().signInWithPopup(provider).then(async(result) => {
              this.user = firebase.auth().currentUser;

              var items = db.collection('users');
              await items.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  console.log(doc.id)
                  this.allUsers.push(doc.id)
                })
            })
              console.log(this.allUsers)
              if(!this.allUsers.includes(this.user.uid)) {
                this.addUser();
              } else {
                console.log('Denna user finns redan')
              }
              this.$router.replace('/playerinfo');
              this.$store.dispatch('setCurrentUser', this.user);

            }).catch((err) => {
                alert('Whops, something happend here..' + err.message)
            });
        },
        addUser(){          
              var user = {
              name: "",
              teams: [],
              uid: this.user.uid,
              isAdmin: true
            }
            this.$store.dispatch('addPlayerToDb', user)
            console.log('ny user tillagd')
          
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
