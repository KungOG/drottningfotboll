<template>
    <main>
        <section class="navigation">
            <h1>Stats</h1>
            <thead>
                <tr>
                    <td @click="$router.push('/gameschedule')">Spel Schema | </td>
                    <td @click="$router.push('/gamegroup')"> Grupper | </td>
                    <td @click="$router.push('/highscore')"> highscore</td>
                </tr>
            </thead>
            <section>
                <select v-model="selectedTeam" @change="setSelectedTeam">
                    <option v-for="item in teams" :value="item">{{item}}</option>
                </select>
            </section>
        </section>
        <router-view />
    </main>
</template>

<script>
import db from '@/firebaseInit';
export default {
    name : 'stats',
    data() {
        return {
            selectedTeam: '',
            teams: [],
        }
    },
    computed: {
        currentUser() {
            return this.$store.getters.getCurrentUser;
        }
    },
    methods: {
        //Send chosen team to store 
        setSelectedTeam() {
            this.$store.dispatch('setSelectedTeam', this.selectedTeam);
            this.$store.dispatch('specificTeamData');
        }
    },
    async beforeMount() {
        //Get all teams from database for dropdown
            var teams = [];
            await db.collection("teams").get().then(function(querySnapshot) {            
                querySnapshot.forEach(function(doc) {
                    teams.push(doc.id)
                });
            });       
           this.teams = teams;
       
        if (this.$store.state.currentUser !== null) {
            if(this.$store.state.selectedTeam) {
                this.selectedTeam = this.$store.state.selectedTeam;
            } else {
                this.selectedTeam = this.$store.state.currentUser.teams[0];
                this.$store.dispatch('getCurrentGame');
            }
        } else {
            if(this.$store.state.selectedTeam) {
                this.selectedTeam = this.$store.state.selectedTeam;
            } else {
                this.selectedTeam = teams[0];
            }
        }
        this.$router.push('/highscore');
    }
}
</script>



