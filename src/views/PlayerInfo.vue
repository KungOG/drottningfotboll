<template>
  <article class="player-page" v-touch:swipe.left="leftSwipe" v-touch:swipe.right="rightSwipe">
      <section class="player-logo">
        <Pager :activeSlide = '1' />
        <img src="@/assets/img/logo-crown-black.svg" alt="KungFotboll crown">
        <img :src=currentUser.photoURL alt="">          
      </section>

      <section class="bottom-section">
        <section class="player-stats">    
          <section class="info-box">
            <span class="username-text">{{ currentUser.name }}</span>
            <span class="username-email">{{ currentUser.email }}</span>
          </section>
          <section class="box-container">
            <section class="point-box">
              <span class="point">{{ player.point }}</span>
              <span class="täxt">Poäng</span>
            </section>
            <section class="stats-box">
              <section class="stats">
                <span class="number">{{ player.win }}</span>
                <span class="text">Vinster</span>
              </section>
              <section class="stats">
                <span class="number">{{ player.loss }}</span>
                <span class="text">Förluster</span>
              </section>
              <section class="stats">
                <span class="number">{{ player.tie }}</span>
                <span class="text">Oavgjort</span>
              </section>
              <section class="stats">
                <span class="number">{{ player.goal }}</span>
                <span class="text">Mål</span>
              </section>
            </section>
            </section>
          <select v-model="selectedTeam" @change="getPlayerInfo" class="info-box team">
            <option v-for="item in currentUser.teams" :value="item" :key="item" id="opt">{{item}}</option>
          </select>
      </section>
      <section class="player-footer">
        <img src="@/assets/icon/entrance.svg" @click="logout">
      </section>
    </section>
  </article>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebaseInit'
import Pager from '@/components/Pager.vue'

export default {
    name : 'playerinfo',
    data() {
      return {
        selectedTeam: '',
        player: {}
      }
    },

    components: {
      Pager
    },
    
    computed: {

      currentUser() {
        return this.$store.state.currentUser;
      },

      firstTeam() {
        return this.$store.state.currentUser.teams[0];
      }
    },

    methods: {

        /* Swipe funktionen */
        activeSlide () {
            return this.$store.state.activeSlide;
        },
        /* Swipe mot High Score */
        leftSwipe () {
            this.$router.push('/stats')
        },

        /* Swipe mot About */
        rightSwipe () {
            this.$router.push('/about')  
        },

        /* Sätt valt lag */
        setSelectedTeam() {
            this.$store.dispatch('setSelectedTeam', this.selectedTeam);
      },

      /* Logga ut */
      async logout(){
        await firebase.auth().signOut();
        this.$store.dispatch('removeCurrentUser');
        this.$router.push('/');
      },

      /* Hämta Spelarinfo:n */
      getPlayerInfo() {
        var item = db.collection('teams').doc(this.selectedTeam).collection('players').doc(this.currentUser.uid)
        item.get().then((doc) => {
          var player = doc.data();
          this.player = player;
        })        
      }      
    },

    /* Hämta data innan allt körs */
    beforeMount() {

      this.selectedTeam = this.firstTeam;
        this.getPlayerInfo();     
        this.setSelectedTeam();     
    }    
}
</script>

