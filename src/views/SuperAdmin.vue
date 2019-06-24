<template>
    <main class="superadmin-page">
        <Slide id="slide">
            <router-link to="/admin">Admin</router-link>
            <router-link to="/players">Players</router-link>
            <router-link to="/makegames">Make Game</router-link>
            <router-link to="/schedules">Schedules</router-link>
        </Slide>
        <section class="input-section">
            <section>
                <h1>Skapa ny Admin</h1>
                <label for="">Namn</label>
                <input v-model="adminName" type="text">
                <label for="">Lag</label>
                <input v-model="team" type="text">
                <label for="">Email</label>
                <input v-model="email" type="text">
                <label for="">Lösenord</label>
                <input v-model="password" type="text">
                <a href="#" @click="createAdmin">Klar</a>
            </section>
            <section>
                <h1>Skapa nytt lag</h1>
                <label for="">Lag Namn</label>
                <input v-model="teamName" type="text">
                <a href="#" @click="createTeam">Skapa nytt lag</a>
            </section>
        </section>
    </main>
</template>

<script>
import { Slide } from 'vue-burger-menu';
import firebase from 'firebase'
import db from '@/firebaseInit'

export default {
    name: 'superAdmin',
    components: {
        Slide
    },
    data() {
        return {
            email: "",
            password: "",
            team: "",
            teamName: "",
            adminName: "",
        }
    },
    methods: {
        createAdmin() {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(
            (user) => {
                db.collection('admins').doc().set({
                    name: this.adminName,
                    isAdmin: 'true',
                    team: this.team
                })          
            },
        )},
        createTeam() {
            
        },
    }
}
</script>