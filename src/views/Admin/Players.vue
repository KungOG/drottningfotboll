<template>
    <main class="content">
      <section class="navbar-admin">
        <img src="@/assets/icon/person-add.svg" @click="$router.push('/addplayer')"/>
      </section>
      <section class="search-bar">
        <label>Sök spelare</label>
        <input type="text" v-model="search" placeholder="Sök Spelare">
      </section>
      <section class="player-list">
        <section class="list-wrapper" v-for="(player, index) in filterUsers" :key="index" @click="$router.push(`/editplayer/${player.uid}`)">
          <section class="container">
            <section>
              <h3>{{player.name}}</h3>
            </section>
            <section class="score">
              <p>Poäng: {{player.point}}</p>
              <p>Vinster: {{player.win}}</p>
              <p>Förluster: {{player.loss}}</p>
            </section>
          </section>
        </section>
      </section>
    </main>
</template>

<script>

export default {
    name : 'players',
    data () {
      return {
        search: ''
      }
    },
    beforeCreate() {
      this.$store.dispatch('getTeamPlayersFromDb');
    },
    computed: {
      teamPlayers() {
        return this.$store.getters.getTeamPlayers;
      },
      /* Sök funktion */
        filterUsers () {
          return this.teamPlayers.filter((player) => {
            return player.name.match(this.search);
          })
      }
  }
}
</script>
