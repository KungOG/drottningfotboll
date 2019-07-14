<template>
  <main class="stats-page" v-touch:swipe.right="leftSwipe"> 
    <section class="navigation">
      <ul class="slider" :class="'slide-' + activeSlide"></ul>
      <section class="team-selection">
        <select v-model="selectedTeam" @change="setSelectedTeam">
          <option v-for="item in teams" :value="item" :key="item">{{item}}</option>
        </select>
      </section>
    </section>
    <section class="router-content">
        <router-view />
    </section>
    <section class="stats-navigation">
        <img src="@/assets/icon/crown.svg" @click="$router.push('/highscore')">
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
        },
        adminUser() {
            return this.$store.getters.getAdminUser;
        }
    },
    methods: {
        /* Swipe funktionen */
        activeSlide () {
            return this.$store.state.activeSlide;
        },
        leftSwipe () {
            if (this.adminUser !== null) {
                this.$store.commit('swipe', 1);
                this.$router.push('/admin')
            } else if (this.currentUser !== null) {
                this.$store.commit('swipe', 1);
                this.$router.push('/playerinfo');
            } else {
                this.$store.commit('swipe', 1);
                this.$router.push('/home')
            }
        },
        //Send chosen team to store 
        setSelectedTeam() {
            this.$store.dispatch('setSelectedTeam', this.selectedTeam);
            this.$store.dispatch('specificTeamData');
            this.$store.dispatch('getTeamPlayers');
        }
    },
    async created() {
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
                this.selectedTeam = this.teams[0];
            }
        }
        this.setSelectedTeam();
        this.$store.dispatch('getTeamPlayers');
        this.$router.push('/highscore');
    }
}
</script>