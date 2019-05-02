    
<template>
    <main>
        <h1>Make groups</h1>
        <section>        
            <groupplayer v-for="player in players" :key="player.uid" :player="player" @setColor="setColor" />
        </section>
        <section>
            <a href="#">X</a>
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
    data () {
        return {
            teams: []
        }
    },
    components : {
        groupplayer
    },
    methods: {
        setColor (num, id) {
            if (!this.teams.length == 0) {
                console.log('1')

                this.teams.forEach ( (e) =>  {
                    if (e.uid === id) {

                        console.log('2')  
                        return
                    } else {
                        this.teams.push({number: num, uid: id})
                        console.log('3')
                    }
                })
            } else {
                this.teams.push({number: num, uid: id})
                console.log('sist')
            }
        }
    },
    computed: {
        players () {
             return this.$store.getters.getTeamPlayers;
        }

    }
}
</script>
