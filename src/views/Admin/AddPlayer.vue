<template>
    <main class="content">
      <section class="navbar-admin">
        <p>hamburgar meny</p>
      </section>

      <section class="search-bar">
        <label for="">Sök spelare</label>
        <input type="text" v-model="search" placeholder="Sök Spelare">
      </section>

      <section class="player-list">          
        <section class="list-wrapper" v-for="(player, index) in filterUsers" :player="player" :key="index">
          <section class="container" @click="markPlayer(player)" >
            <h3>{{player.name}}</h3>
            <p>{{player.email}}</p>
          </section>
        </section>
      </section>

      <section class="addplayer">
        <label>Lägg till en tillfällig spelare</label>
        <input type="text" v-model="name" placeholder="Namn">
        <a href="#" @click="addPlayer">Lägg till</a>
      </section>
      <section class="btn">
        <a href="#" @click="submitPlayer">Knapp</a>
      </section>
    </main>
</template>

<script>
export default {
    name : 'addplayer',
    beforeCreate () {
      this.$store.dispatch('getAllUsersFromDb');
    },
    data() {
      return {
        id: '',
        search: '',
        chosenPlayer: '',
        name: ''
      }
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

      /* Markerad vald spelare */
      markPlayer(player) {
        this.chosenPlayer = player;
      },

      /* Addera en spelare som har ett konto */
      submitPlayer() {
        this.idCode ();
        var addPlayer = 
          {
            name: this.chosenPlayer.name,
            goal: 0,
            loss: 0, 
            win: 0, 
            point: 0, 
            uid: this.chosenPlayer.uid,
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