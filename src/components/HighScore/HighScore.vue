<template>
    <main class="highscore-page">
      <section class="highscore-header">
          <select v-model="selected">
            <option v-for="(option, index) in options" :key="index" :value="option.value">{{option.name}}</option>
          </select>
      </section>
      <article class="container">
        <section>        
          <section class="highscore-list" v-for="(item, index) in teamPlayers" :key="index">
            <section class="score">
              <div class="name">
                <span>{{item.name}}</span>
              </div>
              <div :class="{ point: selected == 'point', win: selected == 'win', lost: selected == 'loss', goal: selected == 'goal', tie: selected == 'tie'}">
                <span>Poäng </span>
                <span class="highlight">{{item.point}}</span>
              </div>
              <div class="win" :class="{ point: selected == 'win'}">
                <span>Vinster </span>
                <span class="highlight">{{item.win}}</span>
              </div>
              <div class="lost" :class="{ point: selected == 'loss'}">
                <span>Förluster </span>
                <span class="highlight">{{item.loss}}</span>
              </div>
              <div class="tie" :class="{ point: selected == 'tie'}">
                <span>Oavgjort </span>
                <span class="highlight">{{item.tie}}</span>
              </div>
              <div class="goal" :class="{ point: selected == 'goal'}">
                <span>Mål </span>
                <span class="highlight">{{item.goal}}</span>
              </div>
            </section>
          </section>
        </section>
      </article>
    </main>
</template>

<script>
import db from '@/firebaseInit'

export default {
    name : 'highscore',
    beforeUpdate() {
      this.sortTeamPlayersByPoints();
    },
    data() {
      return {
        selected: 'point',
        options : [
          {name: 'poäng', value: 'point'},
          {name: 'vinster', value: 'win'},
          {name: 'oavgjort', value: 'tie'},
          {name: 'förluster', value: 'loss'},
          {name: 'mål', value: 'goal'},
        ]
      }
    },
    computed: {
      teamPlayers() {
        return this.$store.state.teamPlayers;
      }
    },
    watch: {
      selected() {
        this.sortTeamPlayersByPoints();
      }
    },
    methods: {
      sortTeamPlayersByPoints () {
        if(this.selected == 'point') {
          this.teamPlayers.sort((a, b) => (a.point > b.point) ? -1 : 1)
        }
        if(this.selected == 'win') {
          this.teamPlayers.sort((a, b) => (a.win > b.win) ? -1 : 1)
        }
        if(this.selected == 'loss') {
          this.teamPlayers.sort((a, b) => (a.loss > b.loss) ? -1 : 1)
        }
        if(this.selected == 'tie') {
          this.teamPlayers.sort((a, b) => (a.tie > b.tie) ? -1 : 1)
        }
        if(this.selected == 'goal') {
          this.teamPlayers.sort((a, b) => (a.goal > b.goal) ? -1 : 1)
        }
      }
   }
}
</script>