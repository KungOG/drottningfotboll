<template>
    <main class="addplayer-page">
      <section class="nav-left">
        <Slide noOverlay id="slide">
          <router-link to="/admin">Admin</router-link>
          <router-link to="/players">Players</router-link>
          <router-link to="/makegames">Make Game</router-link>
          <router-link to="/schedules">Schedules</router-link>
        </Slide>
      </section>
     
      <section class="search-bar">
        <input type="text" v-model="search" placeholder="Sök Spelare">
      </section>

      <section class="player-list">          
        <section class="list-wrapper" v-for="(player, index) in filterUsers" :player="player" :key="index">
          <section class="container" @click="submitPlayerBtn(player)" >
            <h3>{{player.name}}</h3>
            <p>{{player.email}}</p>
          </section>
        </section>
      </section>

      <section class="addplayer">
        <h3>Lägg till en tillfällig spelare</h3>
        <article>
          <input type="text" v-model="name" placeholder="Namn">
          <img src="@/assets/icon/ok.svg" @click="addPlayerBtn">
        </article>
      </section>
    </main>
</template>

<script>
import { Slide } from 'vue-burger-menu';

export default {
    name : 'addplayer',
    data() {
        return {
          id: '',
          search: '',
          name: '',
          users: [],
        }
      },  
    components: {
      Slide
    },
    beforeMount() {
      this.$store.dispatch('getAllUsersFromDb');
    },
    computed: {
      
      /* Hämta alla admins spelare för sortering av spelare */
      allAdminPlayers () {
        return this.$store.state.adminTeamPlayers;
      },

      /* Hämta alla användare */
      allUsers () {
        return this.$store.getters.getAllUsers;
      },

      /* Sök och filter funktion */
      filterUsers () {
        let check = false;
        this.users.length = 0;
          for( var i=this.allUsers.length - 1; i>=0; i--){
            for( var j=0; j<this.allAdminPlayers.length; j++){
              if(this.allUsers[i] && this.users.indexOf(this.allUsers[i]) === -1 && (this.allUsers[i].uid !== this.allAdminPlayers[j].uid)){
                check = true;
                } else {
                    check = false;
                    break;
                }
              }
              if(check) {
                this.users.push(this.allUsers[i]);
                  check = false
                
              }
          }
      
        return this.users.filter((player) => {
          return player.name.match(this.search.toUpperCase());
        })
      }
    },
    methods: {

      /* Pop-Out */
      submitPlayerBtn(player) {
        swal({
            title: "Har du valt rätt spelare?",
            text: `Vill du lägga till ${player.name} i ditt lag?`,
            icon: "info",
            buttons: ["Nä", "Helt klart"],
            dangerMode: true,
          })
          .then((willSubmit) => {
          if (willSubmit) {
            swal(`Du har nu lagt till ${player.name} i laget!`, {
              icon: "success",
            });
            this.submitPlayer(player);
          }
       });
      },
      
      /* Pop-Out */
      addPlayerBtn() {
        swal({
            title: `Stavat ${this.name} rätt?`,
            text: `Vill du verkligen lägga till ${this.name} i ditt lag?`,
            icon: "info",
            buttons: ["Ångrat mig", "Klart"],
            dangerMode: false,
          })
          .then((willAdd) => {
          if (willAdd) {
            swal(`Nu finns den hära ${this.name} i ditt lag!`, {
              icon: "success",
            });
            this.addPlayer();
          } else {
              swal(`Puuuh, jag tänkte nästan det! ;)`);
          }
       });
      },
      /* Lägg till en tillfällig spelare */
      addPlayer() {
        this.idCode ();
        var newPlayer = {
          name: this.name.toUpperCase(),
          goal: 0,
          win: 0,
          loss: 0,
          point: 0,
          tie: 0,
          uid: this.id,
        }
        this.$store.dispatch('addPlayerToDb', newPlayer)
        this.$router.push('/players');
      },

      /* Addera en spelare som har ett konto */
      submitPlayer(player) {
        this.idCode ();
        var addPlayer = 
          {
            name: player.name,
            goal: 0,
            loss: 0, 
            win: 0, 
            point: 0, 
            tie: 0, 
            uid: player.uid,
          }

        this.$store.dispatch('submitPlayer', addPlayer);
        this.$store.dispatch('updateUserTeamArray', addPlayer.uid);
        this.$router.push('/players');
      },
      
      /* Skaffa ett random UID */
      idCode() {       
        let chars = "ABCDEFGHIJKLMNOPQRSTVWXYZ0123456789abcdefghijklmnopqrstvwxyz";
          let code = [];
          for (let i = 0; i < 20; i++) {
            let rand = Math.floor(Math.random() * chars.length);
              code.push(chars[rand]);
          }
          this.id = code.join(""); 
      }
    }
}
</script>

