    
<template>
    <main>
        <h1>Make groups</h1>
        <section>        
            <groupplayer v-for="player in players" :key="player.uid" :player="player" />
        </section>
    </main>
</template>

<script>
import groupplayer from '@/components/Admin/GroupPlayer.vue';
export default {
    name : 'makegroups',
   beforeCreate() {
      this.$store.dispatch('getTeamPlayersFromDb');
    },
    components : {
        groupplayer
    },
    computed: {
        players () {
             return this.$store.getters.getTeamPlayers;
        }
    }
}
</script>
