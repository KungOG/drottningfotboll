<template>
    <main class="editgroups">
        <section class="menu">
            <img src="@/assets/icon/person-add.svg" @click="show = !show"/>
        </section>
        <section class="container">
            <section class="search-bar" v-if="!show">
                <input type="text" v-model="search" placeholder="Sök Spelare">
                    <section class="player-list">          
                        <section class="list-wrapper" v-for="(player, index) in filterPlayers" :player="player" :key="index">
                            <section class="container" @click="editGroup(player)" >
                            <h3>{{player.name}}</h3>
                        </section>
                    </section>
                </section>
            </section>
            <section class="grouplist">
                <h3 :style="{background: activeColor}">{{group.name}}</h3>
                <addgroupplayer v-for="player in group.players" :key="player.uid" :group="group.id" :player="player"/>
            </section>
            <img src="@/assets/icon/ok.svg" class="orange-btn" @click="$router.push('/groups')" />
        </section>
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
            chosenPlayer: '',
            otherTeamPlayers: [],
            activeColor: 'red'
        }
    },
    components : {
        addgroupplayer
    },
    beforeMount() {
        this.filterGroup()
        let number = this.group.id;
        if (number === 1) {
            this.activeColor = "green"
        } else if (number === 2) {
            this.activeColor = "red"
        } else if (number === 3) {
            this.activeColor = "orange"  
        } else if (number === 4) {
            this.activeColor = "blue"
        } else if (number === 5) {
            this.activeColor = "pink"    
        } 
        
    },
    computed: {
        group () {
            return this.$store.getters.getChosenGroup(
                this.$route.params.id
            );
        },
       /* Hämta alla användare */
        teamPlayers () {
            return this.$store.getters.getAdminTeamPlayers;
        },

      /* Sökfunktion */
        filterPlayers () {
            return this.otherTeamPlayers.filter((player) => {
                return player.name.match(this.search);
            })
        }
    },

    methods : {

        /* Pop-Out */
        editGroup(player) {
            swal({
                title: `Ojämna grupper?`,
                text: `Vill du verkligen flytta ${player.name} till ${this.group.name}!`,
                icon: "warning",
                buttons: ["Nope", "Yes"],
                dangerMode: false,
            })
            .then((Edited) => {
                if (Edited) {
                    swal(`${player.name} är nu flyttad till ${this.group.name}!`);
                    this.markPlayer(player);
                }
            });
        },

        markPlayer(player) {
            this.chosenPlayer = player;
            this.$store.dispatch('removeGroupPlayer', this.chosenPlayer);
            this.$store.dispatch('addGroupPlayer', {
                player: this.chosenPlayer, 
                group: this.group.id
            })
        }, 
        /* Filtrera ut spelare som inte är i gruppen */
        filterGroup () {
            let check = false;
            for( var i=this.teamPlayers.length - 1; i>=0; i--){
                for( var j=0; j<this.group.players.length; j++){
                    if(this.teamPlayers[i] && this.otherTeamPlayers.indexOf(this.teamPlayers[i]) === -1 && (this.teamPlayers[i].uid !== this.group.players[j].uid)){
                        check = true;
                        } else {
                            check = false;
                            break;
                        }
                }
                if(check) {
                    this.otherTeamPlayers.push(this.teamPlayers[i]);
                    check = false
                }
            }            
        }
    }
}
</script>