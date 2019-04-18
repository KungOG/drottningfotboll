<template>
    <article>
        <section>
          <section class="info-box">
            <label for="">Namn</label>
            <input type="text" v-model="player.name">
          </section>
          <section class="info-box">
            <label for="">Poäng</label>        
            <input type="number" v-model="player.point">
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
        </section>
    </article>
</template>

<script>
export default {
    name : 'editplayer',
    data() {
        return {
            name: "",
            point: 0,
            win: 0,
            loss: 0
        }
    },
    computed: {
      teamPlayers() {
        return this.$store.getters.getTeamPlayers;
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
    justify-content : center;
    align-items : center;
    flex-direction: column;
    flex: 1;
  }

</style>
