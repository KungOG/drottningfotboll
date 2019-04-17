<template>
    <article>
        <section>
          <img :src=currentUser.photoURL><br>
          <select v-model="selectedTeam" @change="getPlayerInfo">
            <option v-for="item in currentUser.teams" :value="item" :key="item">{{item}}</option>
          </select>
          <section class="info-box">
            <p> {{ currentUser.name }} </p>
          </section>
          <section class="info-box">
            <p>Poäng: {{ player.point }}</p>
          </section>
          <section class="box-container">
            <section class="info-box">
              <p>Vinster:</p>
              <p> {{ player.win }}</p>
            </section>
            <section class="info-box">
              <p>Förluster:</p>
              <p>{{ player.loss }}</p>
            </section>
              <button @click="logout">Logout</button>
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
      logout(){
        firebase.auth().signOut();
        this.$store.dispatch('removeCurrentUser');
        this.$router.push('/');
      },
      getPlayerInfo() {
        console.log('2');
        var item = db.collection('teams').doc(this.selectedTeam).collection('players').doc(this.currentUser.uid)
        item.get().then((doc) => {
          var player = doc.data();
          this.player = player;
        })        
      }      
    },
    beforeMount() {
         this.selectedTeam = this.firstTeam;
         console.log(this.selectedTeam, this.firstTeam);
             
         this.getPlayerInfo();
      }    
}
</script>

<style scoped lang="scss">
  @import "../scss/main";

  .box-container {
    display: flex;
    flex-direction: row;
  }

  .info-box {
    @extend %center;
    border: 1px solid black;
    border-radius: 5px;
    flex-direction: column;
    flex: 1;
  }

  img {
    width: 100px;
    height: 100px;

  }


</style>
