<template>
    <main class="main">
        <article class="list-wrapper" v-for="(item, index) in teamPlayers.slice().reverse()" :key="index">
          <section class="container">
            <section>
              <h3>{{item.name}}</h3>
            </section>
            <section class="score">
              <p id="win">Poäng: {{item.point}}</p>
              <p id="win">Vinster: {{item.win}}</p>
              <p>Förluster: {{item.loss}}</p>
            </section>
          </section>
        </article>
    </main>
</template>

<script>

export default {
    name : 'players',
    beforeCreate() {
      this.$store.dispatch('getTeamPlayersFromDb');
    },
    computed: {
      teamPlayers() {
        return this.$store.getters.getTeamPlayers;
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
    border-bottom: 1px solid black;
    padding: .5rem;
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
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