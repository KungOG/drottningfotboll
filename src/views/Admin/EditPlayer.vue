<template>
    <article class="content">
      <section class="navbar-admin">
        <p>Hambugar menu</p>
        <img src="@/assets/deleteplayer.png" class="btn" @click="deletePlayer" /> 
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
          </section>
        </section>
        <section class="btn">
          <a href="#" @click="remakePlayer">Klar</a>
      </section>
    </article>
</template>

<script>
export default {
    name : 'editplayer',
    data () {
      return {
        player: {
          namn: '',
          point: '',
          win: '',
          loss: '',
          uid: player.uid
        }
      }
    },
    computed : {

      player () {
        return this.$store.getters.getPlayerByUid(
          this.$route.params.uid
        );
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
        }
    }
}

</script>
<style scoped lang="scss">
@import '@/scss/main.scss';

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
