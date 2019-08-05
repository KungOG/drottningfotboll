<template>
    <main>
      <section class="nav-between">
        <Slide noOverlay id="slide">
            <router-link to="/admin">Admin</router-link>
            <router-link to="/players">Players</router-link>
            <router-link to="/makegames">Make Game</router-link>
            <router-link to="/schedules">Schedules</router-link>
        </Slide>
        <img src="@/assets/icon/person-add.svg" @click="$router.push('/addplayer')"/>
      </section>
      <section class="search-bar">
        <input type="text" v-model="search" placeholder="Sök Spelare">
      </section>
      <section class="player-list">
        <section class="list-wrapper" v-for="(player, index) in filterUsers" :key="index" @click="$router.push(`/editplayer/${player.uid}`)">
          <section class="container">
            <section>
              <h3>{{player.name}}</h3>
            </section>
            <section class="score">
              <article>
                <p>Poäng</p>
                <p>{{player.point}}</p>
              </article>
              <article>
                <p>Vinster</p>
                <p>{{player.win}}</p>
              </article>
              <article>
                <p>Oavgjort</p>
                <p>{{player.tie}}</p>
              </article>
              <article>
                <p>Förluster</p>
                <p>{{player.loss}}</p>
              </article>
              <article>
                <p>Mål</p>
                <p>{{player.goal}}</p>
              </article>
            </section>
          </section>
        </section>
      </section>
    </main>
</template>
<script>
import { Slide } from 'vue-burger-menu';
export default {
    name : 'players',
    data () {
      return {
        search: ''
      }
    },
    beforeCreate() {
      this.$store.dispatch('setAdminTeamPlayers');
    },
    components: {
        Slide
    },
    computed: {
      adminTeamPlayers() {
        return this.$store.state.adminTeamPlayers;
      },
      filterUsers () {
        return this.adminTeamPlayers.filter((player) => {
          return player.name.match(this.search.toUpperCase());
        })
      }
  }
}
</script>
