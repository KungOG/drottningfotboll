<template>
    <main class="home-page">
        <section class="home-logo">
            <img src="@/assets/img/crown.png" />
            <img src="@/assets/img/fotball.png"/>
        </section>
        <section class="home-admin-login">
            <h1>Admin Login</h1>
            <label name="email">EMAIL</label>
            <input type="email" v-model="email"><br>
            <label name="password">PASSWORD</label>
            <input type="password" v-model="password"><br>
            <img src="@/assets/icon/ok.svg" class="orange-btn" @click="LoginAdmin" />
        </section>
    </main>
</template>

<script>
import firebase from "firebase";
export default {
    name : 'adminlogin',
    data () {
        return {
            email: '',
            password: '',
            adminUser: ''
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
        }
    },
    beforeDestroy () {
        this.$store.dispatch('setAdminTeamPlayers');
    }
}
</script>