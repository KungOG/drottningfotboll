<template>
    <main class="superadmin-page">
        <section class="input-section">
            <section>
                <h1>Skapa ny Admin</h1>
                <label>Namn</label>
                <input v-model="adminName" type="text">
                <label>Lag</label>
                <input v-model="teamName" type="text">
                <label>Email</label>
                <input v-model="email" type="text">
                <label>Lösenord</label>
                <input v-model="password" type="text">
                <a href="#" @click="createAdmin">Klar</a>
            </section>
            <section>
                <h1>Nollställ ett lag</h1>
                <select v-model="team">
                    <option v-for="(team, index) in teamArray" :key="index" :value="team">{{team}}</option>
                </select>
                <a href="#" @click="totalResetTeam">Nollställ {{team}}</a>
            </section>
        </section>
    </main>
</template>
<script>
import { Slide } from 'vue-burger-menu';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
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
            teamName: '',
            adminName: '',
            team: '',
            teamArray: [],
            id: ''
        }
    },
    created () {
        let teamArray = [];
            db.collection("teams").get().then(function(querySnapshot) {            
                querySnapshot.forEach(function(doc) {
                    teamArray.push(doc.id)
                });
            }); 
        this.teamArray = teamArray;
    },
    methods: {
        createAdmin() {
        this.idCode();
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
            .then(
                (user) => {
                    db.collection('admins').doc(user.user.uid).set({
                        name: this.adminName.toUpperCase(),
                        team: this.teamName.toUpperCase(),
                        uid: user.user.uid
                    })          
                },
            )
            var trainer = {
                uid: this.id, 
                name: this.adminName,            
                point : 0, 
                win: 0, 
                loss: 0, 
                tie: 0,
                goal: 0
            }
            db.collection('teams').doc(this.teamName.toUpperCase()).collection('players').doc(this.id).set(trainer)
            db.collection('teams').doc(this.teamName.toUpperCase()).set({name: this.teamName});
        },
        async totalResetTeam () {
            let teamPlayers = [];
            var item = await db.collection('teams').doc(this.team.toUpperCase()).collection('players')
                await item.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    var obj = (doc.id, " => ", doc.data())
                    teamPlayers.push(obj)
                })
            })
            this.$store.dispatch('resetTeam', {teamName: this.team.toUpperCase(), teamPlayers: teamPlayers})
        },
        idCode()   {     
            let chars = "ABCDEFGHIJKLMNOPQRSTVWXYZ0123456789abcdefghijklmnopqrstvwxyz";
            let code = [];
            for (let i = 0; i < 20; i++) {
                let rand = Math.floor(Math.random() * chars.length);
                code.push(chars[rand]);
            }
            this.id = code.join(""); 
        }
    }
}
</script>