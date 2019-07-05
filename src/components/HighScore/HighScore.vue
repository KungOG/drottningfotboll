<template>
    <main class="highscore-page">
      <section class="highscore-header">
        <select v-model="selected" @change="setOption">
          <option>Poäng</option>
          <option>Vinst</option>
          <option>Lika</option>
          <option>Förlust</option>
          <option>Mål</option>
        </select>
      </section>
      <article class="list-wrapper" v-for="(item, index) in teamPlayers.slice().reverse()" :key="index">
          <section class="score">
            <div class="name">
              <span>{{item.name}}</span>
            </div>
            <div class='point'>
              <span class="highlight">{{item.point}}</span><br>
              <span>Poäng</span>
            </div>
            <div class="win">
              <span>Vinst </span>
              <span>{{item.win}}</span>
            </div>
            <div class="lost">
              <span>Förlust </span>
              <span>{{item.loss}}</span>
            </div>
            <div class="tie">
              <span>Oavgjort </span>
              <span>{{item.tie}}</span>
            </div>
            <div class="goal">
              <span>Mål </span>
              <span>{{item.goal}}</span>
            </div>
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
        selected: '',
      }
    },
    computed: {
      teamPlayers() {
        return this.$store.state.teamPlayers;
      }
    },
    methods: {
      setOption () {
        console.log(this.selected)
      }
    }
  }

</script>