<template>
    <main class="content">
        <section>
            <p>Burgar</p>
            <a href="#" @click="show = !show">Lägg till Spelare</a>
        </section>

        <section class="search-bar" v-if="!show">
            <label for="">Sök spelare</label>
            <input type="text" v-model="search" placeholder="Sök Spelare">
                <section class="player-list">          
                    <section class="list-wrapper" v-for="(player, index) in filterGroup" :player="player" :key="index">
                        <section class="container" @click="markPlayer(player)" >
                        <h3>{{player.name}}</h3>
                    </section>
                </section>
            </section>
        </section>

        <section>
            <h3>{{group.name}}</h3>
            <addgroupplayer v-for="player in group.players" :key="player.uid" :group="group.id" :player="player"/>
        </section>
        <a href="#" @click="$router.push('/groups')">Grupper</a>
    </main>
</template>

<script>
import addgroupplayer from '@/components/Admin/AddGroupPlayer.vue';
export default {
    name : 'editgroups',
    data () {
        return {
            show : true,
            search : '',
            chosenPlayer: ''
        }
    },
    components : {
        addgroupplayer
    },
    computed: {
        group () {
            return this.$store.getters.getChosenGroup(
                this.$route.params.id
            );
        },
       /* Hämta alla användare */
        teamPlayers () {
            return this.$store.getters.getTeamPlayers;
        },

      /* Sökfunktion */
        filterPlayers () {
            return this.filterGroup.filter((player) => {
                return player.name.match(this.search);
            })
        },

      /* Filtrera ut spelare som inte är i gruppen */
        filterGroup () {
            let otherTeamPlayers = this.teamPlayers;
            for( var i=otherTeamPlayers.length - 1; i>=0; i--){
                for( var j=0; j<this.group.players.length; j++){
                    if(otherTeamPlayers[i] && (otherTeamPlayers[i].uid === this.group.players[j].uid)){
                      otherTeamPlayers.splice(i, 1);
                    }
                }
            }
            return otherTeamPlayers;
        }
    },
    methods : {
        markPlayer(player) {
            this.chosenPlayer = player;
            //Kolla om spelaren finns i en annan grupp
            this.$store.dispatch('addGroupPlayer', {
                player: this.chosenPlayer, 
                group: this.group.id
            })
        }, 
    }
}
</script>