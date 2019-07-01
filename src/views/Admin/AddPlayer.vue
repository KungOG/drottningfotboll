<template>
    <main class="addplayer-page">
      <section class="navbar-admin">
        <Slide id="slide">
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
          <section class="container" @click="submitPlayer(player)" >
            <h3>{{player.name}}</h3>
            <p>{{player.email}}</p>
          </section>
        </section>
      </section>

      <section class="addplayer">
        <h3>Lägg till en tillfällig spelare</h3>
        <article>
          <input type="text" v-model="name" placeholder="Namn">
          <img src="@/assets/icon/ok.svg" @click="addPlayer">
        </article>
      </section>
    </main>
</template>

<script>
import { Slide } from 'vue-burger-menu';

export default {
    name : 'addplayer',
    beforeCreate () {
      this.$store.dispatch('getAllUsersFromDb');
    },
    data() {
      return {
        id: '',
        search: '',
        name: ''
      }
    },   
    components: {
        Slide
    },
    computed: {

      /* Hämta alla användare */
      allUsers () {
        return this.$store.getters.getAllUsers;
      },

      /* Sök funktion */
      filterUsers () {
        return this.allUsers.filter((player) => {
          return player.name.match(this.search);
        })
      }
    },
    methods: {

      /* Lägg till en tillfällig spelare */
      addPlayer() {
        this.idCode ();
        var newPlayer = {
          name: this.name,
          goal: 0,
          win: 0,
          loss: 0,
          point: 0,
          uid: this.id,
        }
        this.$store.dispatch('addPlayerToDb', newPlayer)
        this.name = ''
      },

      /* Addera en spelare som har ett konto */
      submitPlayer(player) {
        confirm('Vill du lägga till ' + player.name)
        this.idCode ();
        var addPlayer = 
          {
            name: player.name,
            goal: 0,
            loss: 0, 
            win: 0, 
            point: 0, 
            uid: player.uid,
          }
        
        this.$store.dispatch('submitPlayer', addPlayer);
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