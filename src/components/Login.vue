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
/* eslint-disable */
import firebase from 'firebase'
export default {
    name : 'login',
    methods: {
        googleLogin () {
            const provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {
                this.$router.replace('/playerinfo');
            }).catch((err) => {
                alert('Whops, something happend here..' + err.message)
            });   
        }   
    }
}
</script>