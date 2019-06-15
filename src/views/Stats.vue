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
        },
      /*   firstTeam() {
            return this.$store.getters.getCurrentUser.teams[0];
        } */
    },
    methods: {
        //Send chosen team to store 
        setSelectedTeam() {
            this.$store.dispatch('setSelectedTeam', this.selectedTeam);
            this.$store.dispatch('specificTeamData');
            console.log(this.selectedTeam)
        }
    },
    mounted() {
        //Get all teams from database for dropdown
            var teams = [];
            db.collection("teams").get().then(function(querySnapshot) {            
                querySnapshot.forEach(function(doc) {
                    teams.push(doc.id)
                });
            });       
           this.teams = teams;

        if (this.$store.state.currentUser !== null) {
            this.selectedTeam = this.$store.state.currentUser.teams[0];
            this.$store.dispatch('getCurrentGame');
        }

    }
}
</script>



