<template>
    <article class="content">
        <section class="logo">
          <img :src=currentUser.photoURL>
          <a href="#" @click="logout">Logout</a>
        </section>

        <section class="player-stats">    
          <select v-model="selectedTeam" @change="getPlayerInfo" class="info-box">
            <option v-for="item in currentUser.teams" :value="item" :key="item" id="opt">{{item}}</option>
          </select>
          <section class="info-box">
            <p> {{ currentUser.name }} </p>
          </section>
          <section class="info-box">
            <p>Poäng: {{ player.point }}</p>
          </section>
          <section class="box-container">
            <section class="info-box square">
              <p>Vinster:</p>
              <p> {{ player.win }}</p>
            </section>
            <section class="info-box square">
              <p>Förluster:</p>
              <p>{{ player.loss }}</p>
            </section>
          </section>
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

