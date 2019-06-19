<template>
    <main class="highscore-page">
      <section class="highscore-header">
        <span>Vinst</span>
        <span>Lika</span>
        <span>Förlust</span>
        <span>Mål</span>
        <span>Poäng</span>
      </section>
      <article class="list-wrapper" v-for="(item, index) in teamPlayers.slice().reverse()" :key="index">
        <section class="container">
          <section class="name">
            <h3>{{item.name}}</h3>
          </section>
          <section class="score">
            <p>{{item.win}}</p>
            <p>{{item.loss}}</p>
            <p>{{item.loss}}</p>
          </section>
          <aside id="date">
            {{item.point}}
          </aside>
        </section>
      </article>
    </main>
</template>

<script>
import db from '@/firebaseInit'

export default {
    name : 'highscore',
    computed: {
      teamPlayers() {
        return this.$store.state.teamPlayers;
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
