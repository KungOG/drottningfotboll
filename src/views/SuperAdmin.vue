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
                <select v-model="selected" @change="setTeam">
                    <option v-for="team in allTeams" :key="team.uid">{{team}}</option>
                </select>
                <a href="#">Nollställ {{team}}</a>
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
            email: '',
            password: '',
            team: '',
            teamName: '',
            adminName: '',
            team: '',
        }
    },
    computed : {
        allTeams () {
            let teamNames = [];
            db.collection("teams").get().then(function(querySnapshot) {            
                querySnapshot.forEach(function(doc) {
                    teamNames.push(doc.id)
                });
            }); 
            return teamNames;
        }
    },
    methods: {
        createAdmin() {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(
            (user) => {
                db.collection('admins').doc(user.user.uid).set({
                    name: this.adminName,
                    team: this.team,
                    uid: user.user.uid
                })          
            },
        )},
        totalResetTeam () {

        },
        setTeam () {

        }
    }
}
</script>