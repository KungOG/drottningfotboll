<template>
    <main class="home-page">
        <section class="admin-logo">
            <img src="@/assets/img/logo-text.svg" @click="$router.push('/home')" alt="KungFotboll logo" />
            <h1>ADMIN</h1>
        </section>
        <section class="home-admin-login">
            <label name="email">EMAIL</label>
            <input type="email" v-model="email"><br>
            <label name="password">PASSWORD</label>
            <input type="password" v-model="password"><br>
            <img v-show="email !== null && password !==null" src="@/assets/icon/ok.svg" class="orange-btn" @click="LoginAdmin" />
        </section>
        <section class="admin-btn">
        </section>
    </main>
</template>
<script>
import firebase from "firebase";
export default {
    name : 'adminlogin',
    data () {
        return {
            email: null,
            password: null,
            adminUser: null,
        }
    },
    methods : {
        LoginAdmin () {
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(adminUser => {
                    this.adminUser = firebase.auth().currentUser;
                    this.setAdmin();
                    setTimeout(() => this.$router.push({
                        path: '/admin'
                    }), 1000);
                }).catch((err) => {
                    alert("Whops, something wrong happend!" + err.message);
            });
        },
        setAdmin () {
            this.$store.dispatch('setAdminUser', this.adminUser);
        },
    },   
    beforeDestroy () {
        if (this.adminUser !== null) {
            this.$store.dispatch('setAdminTeamPlayers');
        }
    }
}
</script>