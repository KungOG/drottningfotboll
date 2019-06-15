<template>
    <main class="main">
        <article class="list-wrapper" v-for="(item, index) in teamPlayers.slice().reverse()" :key="index">
          <aside id="date">
            {{item.point}}
          </aside>
          <section class="container">
            <section>
              <h3>{{item.name}}</h3>
            </section>
            <section class="score">
              <p id="win">Vinster: {{item.win}}</p>
              <p>Förluster: {{item.loss}}</p>
            </section>
          </section>
        </article>
    </main>
</template>

<script>

import db from '@/firebaseInit'

export default {
    name : 'highscore',
    data() {
      return {
        teamPlayers: []
      }
    },
    watch: {
      selectedTeam() {
        this.getTeamplayers();
      }
    },
    
    computed: {
      selectedTeam() {
        return this.$store.getters.getSelectedTeam;
      }
    },
    mounted() {
      this.getTeamplayers();
    },
    methods: {
      getTeamplayers() {
      var teamPlayers = []
      var item = db.collection('teams').doc(this.selectedTeam).collection('players').orderBy('point')
      item.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var obj = (doc.id, " => ", doc.data())
          teamPlayers.push(obj)
        })
       })
      this.teamPlayers = teamPlayers; 
      console.log(this.teamPlayers)
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
