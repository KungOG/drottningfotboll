<template>
    <main>
        <section>
            <h1>Admin Login</h1>
            <label name="email">Email: </label>
            <input type="email" v-model="email"><br>
            <label name="password">Password: </label>
            <input type="password" v-model="password"><br><br>
            <a href="#" @click="LoginAdmin">Submit</a>
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
                .auth().signInWithEmailAndPassword(this.email, this.password).then(adminUser => {
                    this.adminUser = firebase.auth().currentUser;
                    this.$router.replace("admin");
                    this.setAdmin();
                }).catch((err) => {
                    alert("Whops, something wrong happend!" + err.message);
            });
        },
        setAdmin () {
            this.$store.dispatch('setAdminUser', this.adminUser); 
        }
    }
}
</script>