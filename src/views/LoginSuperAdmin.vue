<template>
    <main class="home-page">
        <section class="home-logo">
            <img src="@/assets/img/logo-text.svg" alt="KungFotboll logo" />
        </section>
        <section class="home-login">
            <div class="login-btn" @click="googleLogin">
                <img src="@/assets/img/google.svg" alt="Google Login Logo" >
                <p>Logga in med Google</p>
            </div>
        </section>
    </main>
</template>

<script>
import firebase from 'firebase'
export default {
    name: 'loginsuperadmin',
    methods: {
        googleLogin () {
            const provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider).then(async(result) => {
                let user = firebase.auth().currentUser;
                this.$store.dispatch('setSuperAdmin', user)
                setTimeout(() => this.$router.push({
                    path: '/superadmin'
                }), 1000);
            }).catch((err) => {
              alert('Whops, something happend here..' + err.message)
            });
        }
    }
}
</script>