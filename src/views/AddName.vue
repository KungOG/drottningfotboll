<template>
    <article class="home-page">
        <section class="home-logo">
            <img src="@/assets/img/logo-text.svg" alt="KungFotboll logo">
        </section>  
        <section class="submit-section">
            <input type="text" placeholder="Namn" label="Name" v-model="name" maxlength="18" />
            <section class="team-selection">
                <select v-model="team">
                    <option v-for="item in teams" :value="item" :key="item">{{item}}</option>
                </select>
            </section>
            <section class="bottom" v-if="name !== null && team !== null">
                <img src="@/assets/icon/ok.svg" class="orange-btn" @click="addName"/>
            </section>
        </section>
    </article>
</template>
<script>
import db from '@/firebaseInit';
import firebase from 'firebase'
export default {
    name: 'addname',
    data () {
        return {
            name: null,
            team: null,
            teams: []
        }
    },
    created() {
        var teams = [];
        db.collection("teams").get().then(function(querySnapshot) {            
            querySnapshot.forEach(function(doc) {
                teams.push(doc.id)
            });
        });       
        this.teams = teams;
    },
    methods: {
        addName () {
            var user = firebase.auth().currentUser;
            this.$store.dispatch('addPlayerName', {name: this.name.toUpperCase(), team: this.team});
            this.$store.dispatch('setSelectedTeam', this.team);
            this.$store.dispatch('setCurrentUser', user);
            this.$store.dispatch('setLoginNumber', 0)
            this.$router.push('/loading');
        }
    }
}
</script>