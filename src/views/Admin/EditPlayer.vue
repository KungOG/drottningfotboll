<template>
    <article class="content">
      <section class="navbar-admin">
        <a href="#" @click="showList">Visa</a>
      </section>
        <section class="fix-player">
          <section class="name-input">
            <label>Namn</label>
            <input type="text" v-model="player.name">
          </section>
          <section class="stats-input">
            <label>Antal Vinster</label>
            <input type="number" v-model="player.win">
            <label>Antal Förluster</label>
            <input type="number" v-model="player.loss"> 
          </section>                   
          <section class="points-input">
              <label>Poäng</label> 
              <input type="number" v-model="player.point">
              <label>Mål</label> 
              <input type="number" v-model="player.goal">
          </section>
          <section v-if="show">
            <img src="@/assets/icon/bin.svg" class="btn" @click="deletePlayer" /> 
            <a href="#" @click="remakePlayer">Nummer 1</a>
          </section>
        </section>
        <section v-if="!show">
          <article class="list-item-group" v-for="player in filterPlayers" :key="player.uid">
            <p>{{player.name}}</p>
          </article>
          <a href="#" @click="mergeUpdatedPlayer">Nummer 2</a>
      </section>
    </article>
</template>

<script>
export default {
    name : 'editplayer',
    data () {
      return {
         show: true
      }
    },
    computed : {

      /* Kolla spelarens UID */
      player () {
        return this.$store.getters.getPlayerByUid(
          this.$route.params.uid
        );
      },

      /* Lagspelare  */
      teamPlayers() {
        return this.$store.getters.getTeamPlayers;
      },

      /* Filtrera spelare med lägre UID */
      filterPlayers () {
          return this.teamPlayers.filter((player) => {
            return player.uid.length <= 20;
          })
        }
    }, 
    methods : {

        /* Ta bort en spelare */
        deletePlayer () {
          console.log('deleted');
          this.$store.dispatch('removePlayerFromTeam', this.player.uid);
          setTimeout(() => this.$router.push({
            path: '/players'
          }), 1000);
        },

        /* Ändra spelaren */
        remakePlayer () {
          console.log(this.player);
          this.$store.dispatch('remakePlayerFromTeam', this.player);
        },

        /* Lägg samman spelaren och den tillfälliga */
        mergeUpdatedPlayer () {
          this.$store.dispatch('mergeUpdatedPlayer', this.player);
        },

        /* Visa ny sektion */
        showList() {
          if(this.show != false) {
            this.show = false;
          } else {
            this.show = true;
          }
        }
    }
}

</script>
<style scoped lang="scss">

  .box-container {
    display: flex;
    flex-direction: row;
  }

  .info-box {
    display : flex;
    margin: 1rem;
    justify-content : center;
    align-items : center;
    flex-direction: column;
    flex: 1;
  }

</style>
