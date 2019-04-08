<template>
    <main>
        <h1>Add Player</h1>
        <section>
          <input type="text" v-model="playerInfo.name" placeholder="Namn">
          <a href="#" @click="addPlayer">Lägg till</a>
        </section>
    </main>
</template>

<script>
export default {
    name : 'addplayer',
    data() {
      return {
        playerInfo: {
          name: "",
          admin: false,
          goal: 0,
          win: 0,
          loss: 0,
          point: 0
      }
      }
    },
    methods: {
      addPlayer() {
        this.$store.dispatch('addPlayerToDb', this.playerInfo)
      }
    }
}
</script>
