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
        <img v-if="!hide1" src="@/assets/icon/logo-crown-white.svg" @click="atClick('/highscore', 1)">
        <img v-if="hide1" src="@/assets/icon/logo-crown-orange.svg" @click="atClick('/highscore', 1)">
        <img v-if="!hide2" src="@/assets/icon/people.svg" @click="atClick('/gamegroup', 2)">
        <img v-if="hide2" src="@/assets/icon/people-orange.svg" @click="atClick('/gamegroup', 2)">
        <img v-if="!hide3" src="@/assets/icon/calendar.svg" @click="atClick('/gameschedule', 3)">
        <img v-if="hide3" src="@/assets/icon/calendar-orange.svg" @click="atClick('/gameschedule', 3)">
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
            hide1: true,
            hide2: false, 
            hide3: false
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
        atClick(path, num) {
            if(num === 1) {
                this.hide1 = true
                this.hide2 = false
                this.hide3 = false
            }
            if(num === 2) {
                this.hide1 = false
                this.hide2 = true
                this.hide3 = false
            }
            if(num === 3) {
                this.hide1 = false
                this.hide2 = false
                this.hide3 = true
            }
            this.$router.push(path)
        },
        activeSlide () {
            return this.$store.state.activeSlide;
        },
        leftSwipe () {
            if (this.adminUser !== null) {
                this.$router.push('/admin');
            } else if (this.currentUser !== null) {
                this.$router.push('/playerinfo');
            } else {
                this.$router.push('/home');
            }
        },
        setSelectedTeam() {
            this.$store.dispatch('setSelectedTeam', this.selectedTeam);
            this.$store.dispatch('specificTeamData');
            this.$store.dispatch('getTeamPlayers');
        }
    },
    async created() {
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
        this.$store.dispatch('getCurrentGame');
        this.$router.push('/highscore');
    }
}
</script>