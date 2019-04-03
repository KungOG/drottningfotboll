<template>
    <article>
        <select v-model="selected">
          <option disabled value="">Välj klubb</option>
          <option>Klubb A</option>
          <option>Klubb B</option>
          <option>Klubb C</option>
        </select>
        <section>
          <p>{{ player.name }}</p>
          <p>Poäng: {{ player.point }}</p>
          <p>Vinster: {{ player.win }}</p>
          <p>Förluster: {{ player.loss }}</p>
        </section>
    </article>
</template>

<script>
export default {
    name : 'playerinfo',
    data() {
      return {
        selected: ""
      }
    },
    computed: {
      player() {
        return this.$store.getters.getPlayer;
      }
    }
}
</script>
