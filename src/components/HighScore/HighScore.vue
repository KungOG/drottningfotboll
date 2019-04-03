<template>
    <article>
        <h1>High Score</h1>
        <section>
          
        </section>
    </article>
</template>

<script>
export default {
    name : 'highscore',
    computed: {
      teamPlayers() {
        return this.$store.getters.teamPlayers;
      }
    },
    beforeMount() {
      this.$store.dispatch('getTeamPlayersFromDb');
    }
}
</script>
