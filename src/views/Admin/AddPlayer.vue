<template>
    <main>

      <section class="main">
        <label for="">Sök spelare</label><br>
        <input type="text" v-model="search" placeholder="Sök Spelare">
        <section class="list-wrappers" v-for="(player, index) in filterUsers" :player="player" :key="index">
          <section @click="markPlayer(player)">
            <h3>{{player.name}}</h3>
            <h3>{{player.email}}</h3>
            <p>{{player.uid}}</p>
          </section>
        </section>
      </section>

      <section class="">
        <label>Add Player</label><br>
        <input type="text" v-model="name" placeholder="Namn">
        <a href="#" @click="addPlayer">Lägg till</a>
      </section>
      <section>
        <a href="#" @click="submitPlayer">Lägg till pigs</a>
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
<style lang="scss">

.main {
  border: 1px solid black;
  border-radius: 5px;

  .list-wrapper {
    display: flex;
    border-bottom: 1px solid gray;
    padding: .5rem;
    .border {
      border: 1px solid red;

    }
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;

      h3 {
        text-transform: uppercase;
        margin: 0;
        font-size: 1.2rem;
      }
      .score {
        display: flex;
        flex-direction: row;
        #win {
          margin-right: 1.5rem;
        }
      }
    }
    #date {
      box-sizing: border-box;
      padding: 10px 5px 15px 5px;
      margin-right: 2rem;
      text-align: center;
      font-size: 3rem;
      width: 70px;
      height: 60px;
    }
  }
}
</style>
