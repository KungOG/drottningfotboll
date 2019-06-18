<template>
  <main class="stats-page" v-touch:swipe.right="leftSwipe"> 
    <section class="navigation">
      <ul class="slider" :class="'slide-' + activeSlide"></ul>
      <section class="team-selection">
        <select v-model="selectedTeam" @change="setSelectedTeam">
          <option v-for="item in teams" :value="item">{{item}}</option>
        </select>
      </section>
    </section>
    <router-view />
      <section class="stats-navigation">
        <img src="@/assets/icon/cancel.svg" @click="$router.push('/highscore')">
        <img src="@/assets/icon/people.svg" @click="$router.push('/gamegroup')">
        <img src="@/assets/icon/calendar-event.svg" @click="$router.push('/gameschedule')">
      </section>
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
        /* Swipe funktionen */
        activeSlide () {
            return this.$store.state.activeSlide;
        },
        leftSwipe () {
            this.$store.commit('swipe', 1);
            this.$router.push('/home')
            console.log('Left S')
        },
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



