<template>
    <article class="player-page">
        <section class="player-logo">
          <img src="@/assets/img/crown.png" alt="">
          <img :src=currentUser.photoURL alt="">          
        </section>

        <section class="player-stats">    
          <section class="info-box">
            <p class="username-text">{{ currentUser.name }}</p>
          </section>
          <section class="info-box">
            <span class="point">{{ player.point }}</span>
            <p class="text">Poäng</p>
          </section>
          <section class="box-container">
            <section class="info-box">
              <span  class="number">{{ player.win }}</span>
              <p class="text">Vinster</p>
            </section>
            <section class="info-box">
              <span class="number">{{ player.loss }}</span>
              <p class="text">Förluster</p>
            </section>
          </section>
          <select v-model="selectedTeam" @change="getPlayerInfo" class="info-box team">
            <option v-for="item in currentUser.teams" :value="item" :key="item" id="opt">{{item}}</option>
          </select>
        </section>
        <section class="player-footer">
          <img src="@/assets/icon/entrance.svg" @click="logout">
        </section>
    </article>
</template>

<script>
import firebase from 'firebase'
import db from '@/firebaseInit'

export default {
    name : 'playerinfo',
    data() {
      return {
        selectedTeam: '',
        player: {}
      }
    },
    computed: {
      currentUser() {
        return this.$store.getters.getCurrentUser;
      },
      firstTeam() {
        return this.$store.getters.getCurrentUser.teams[0];
      }
    },
    methods: {
      setSelectedTeam() {
          this.$store.dispatch('setSelectedTeam', this.selectedTeam);
      },
      logout(){
        firebase.auth().signOut();
        this.$store.dispatch('removeCurrentUser');
        this.$router.push('/');
      },
      getPlayerInfo() {
        var item = db.collection('teams').doc(this.selectedTeam).collection('players').doc(this.currentUser.uid)
        item.get().then((doc) => {
          var player = doc.data();
          this.player = player;
        })        
      }      
    },
    beforeMount() {
         this.selectedTeam = this.firstTeam;
         this.getPlayerInfo();     
         this.setSelectedTeam();     
    }    
}
</script>

