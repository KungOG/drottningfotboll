<template>
    <article>
        <h1>Login</h1>
        <button class="googlebtn" @click="googleLogin">
            <img src="../assets/google-logo.png" alt="Google Logo">
        </button>
        <button class="facebookbtn" @click="facebookLogin">
            <img src="../assets/facebook-logo.png" alt="Facebook Logo">
        </button>
        <br>
    </article>
</template>

<script>
import firebase from 'firebase'
import {db, fb} from '../firebase-config'
export default {
    name : 'login',
    methods : {
        googleLogin () {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {
                this.$router.replace('/playerInfo');
            }).catch((err) => {
                alert('Whops, something happend here..' + err.message)
            });

        },
        facebookLogin () {
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