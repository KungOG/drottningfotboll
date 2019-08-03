<template>
  <main class="stats-page" v-touch:swipe.right="leftSwipe"> 
    <section class="navigation">
      <Pager :activeSlide = '2' />
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
        <img src="@/assets/icon/logo-crown-white.svg" @click="$router.push('/highscore')">
        <img src="@/assets/icon/people.svg" @click="$router.push('/gamegroup')">
        <img src="@/assets/icon/calendar-event.svg" @click="$router.push('/gameschedule')">
    </section>
  </main>
</template>

<script>
import db from '@/firebaseInit';
import Pager from '@/components/Pager.vue';

export default {
    name : 'stats',
    data () {
        return {
            selectedTeam: '',
            teams: [],
        }
    },

    components: {
        Pager
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

        /* Swipe mot Home sidan */
        leftSwipe () {
            if (this.adminUser !== null) {
                this.$router.push('/admin');
            } else if (this.currentUser !== null) {
                this.$router.push('/playerinfo');
            } else {
                this.$router.push('/home');
            }
        },

        /* Skicka valt lag till Store */
        setSelectedTeam() {
            this.$store.dispatch('setSelectedTeam', this.selectedTeam);
            this.$store.dispatch('specificTeamData');
            this.$store.dispatch('getTeamPlayers');
        }
    },
    async created() {

        /* Hämta alla lag ifrån DB:n för lista */
        var teams = [];
        await db.collection("teams").get().then(function(querySnapshot) {            
            querySnapshot.forEach(function(doc) {
                teams.push(doc.id)
            });
        });       
        this.teams = teams;

       /* Kolla ifall användaren finns */
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
        this.$store.dispatch('getCurrentGame');
        this.$router.push('/highscore');
    }
}
</script>