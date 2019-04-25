<template>
    <article>
        <section>
          <section class="info-box">
            <label for="">Namn</label>
            <input type="text" v-model="player.name">
          </section>
          <section class="box-container">
            <section class="info-box">
                <label for="">Vinster</label>
                <input type="number" v-model="player.win">
            </section>
            <section class="info-box">
                <label for="">Förluster</label>
                <input type="number" v-model="player.loss">
            </section>
          </section>
          <section class="info-box">
            <label for="">Poäng</label>        
            <input type="number" v-model="player.point">
          </section>
            <section>
            <a href="#" class="btn" @click="remakePlayer">Redigera Spelare</a>
            <a href="#" class="btn" @click="deletePlayer">Ta bort Spelaren</a> 
            </section>
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
