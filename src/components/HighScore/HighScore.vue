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
<!--      <section class="score">
            <div class="name">
              <span>{{item.name}}</span>
            </div>
            <div class='point'>
              <span class="highlight">{{item.point}}</span><br>
              <span>Poäng</span>
            </div>
            <div class="win">
              <span>Vinster </span>
              <span>{{item.win}}</span>
            </div>
            <div class="lost">
              <span>Förluster </span>
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
          </section> -->
          <section class="score">
            <aside>
                <p class="highlight">{{item.point}}</p>
                <p>Poäng</p>
            </aside>
            <article class="scorebox">
              <div>
                <h3>{{item.name}}</h3>
              </div>
              <article>
                <div>
                  <p>Vinster</p>
                  <p>Förluster</p>
                </div>
                <div>
                  <p>{{item.win}}</p>
                  <p>{{item.loss}}</p>
                </div>
                 <div>
                  <p>Oavgjort</p>
                  <p>Mål</p>
                </div>
                 <div>
                  <p>{{item.tie}}</p>
                  <p>{{item.goal}}</p>
                </div>
              </article>
            </article>
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