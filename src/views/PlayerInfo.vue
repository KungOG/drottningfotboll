<template>
  <main class="player-page" v-touch:swipe.left="leftSwipe" v-touch:swipe.right="rightSwipe">

      <Pager :activeSlide = '1' />
      <section class="player-logo">
        <img class="crown" src="@/assets/img/logo-queen-notext.svg" alt="Drottning Fotboll Crown">
        <img class="user-img" :src=currentUser.photoURL alt="användarbild">          
      </section>

      <section class="player-section">
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
      </section>
            <section class="team-select">
              <select v-model="selectedTeam" @change="getPlayerInfo">
                <option v-for="item in currentUser.teams" :value="item" :key="item" id="opt">{{item}}</option>
              </select>
          </section>
    <section class="player-footer">
      <img src="@/assets/icon/removeBin.svg" @click="remove">
      <img src="@/assets/icon/logout.svg" @click="logout">
    </section>
    </section>

  </main>
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
        activeSlide () {
            return this.$store.state.activeSlide;
        },
        leftSwipe () {
            this.$router.push('/stats')
        },
        rightSwipe () {
            this.$router.push('/about')  
        },
        setSelectedTeam() {
            this.$store.dispatch('setSelectedTeam', this.selectedTeam);
      },
      async logout(){
        await firebase.auth().signOut();
        this.$store.dispatch('removeCurrentUser');
        this.$router.push('/');
      },
      remove(){
        swal({
          title: "Är du säker?",
          text: "Du kommer inte kunna ångra dig!",
          icon: "warning",         
          buttons: {
            cancel: "Ångra dig",
          catch: {
            text: "Ta bort mig",
            value: "catch",
          },
          allt: {
            text: "Mig + Statistik",
            value: "allt",
          },
        },
        }
      )
      .then((value) => {
        switch (value) {
          case "allt":
            swal("Borttagen", "Nu tog vi bort all din data!", "success");
            this.$store.dispatch('removeUserFromTeam');
            this.$store.dispatch('removeUser');
            firebase.auth().currentUser.delete() 
            setTimeout(() => this.logout(), 1500);
            break;
      
          case "catch":
            swal("Borttagen!", "Nu är ditt konto borttaget!", "success");
            this.$store.dispatch('removeUser'); 
            firebase.auth().currentUser.delete()
            this.logout();
            break;
      
          default:
            swal("Mes!");
        }
      });
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

