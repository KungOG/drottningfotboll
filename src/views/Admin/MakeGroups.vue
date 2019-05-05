    
<template>
    <main>
        <section>
            <a href="#" @click="shufflePlayers">Shuffla</a>
        </section>
        <h1>Make groups</h1>
        <section>        
            <groupplayer v-for="player in players" :key="player.uid" :player="player" @setColor="setColor" @deleteAssignedPlayer="deleteAssignedPlayer"/>
        </section>
        <section>
            <a href="#" @click="submitGroups">X</a>
        </section>
    </main>
</template>

<script>
import groupplayer from '@/components/Admin/GroupPlayer.vue';
export default {
    name : 'makegroups',
    data() {
        return {
            teams: [],
            resultOne: false
        }
    },
    beforeCreate() {
      this.$store.dispatch('getTeamPlayersFromDb');
    },
    components : {
        groupplayer
    },
    computed: {
        players () {
             return this.$store.getters.getTeamPlayers;
        },
        numberOfTeams() {
            return this.$store.getters.getNumberOfTeams;
        }
    },
    methods: {
        setColor(num, player) {
           if(!this.teams.length == 0) {                                       
               for(var i=0; i < this.teams.length; i++) {                       
                   if(this.teams[i].uid == player.uid) {                         
                        this.result = true                                      
                        var a = this.teams.indexOf(this.teams[i])               
                        this.teams.splice(a, 1)                                 
                        this.teams.push({number: num, uid: player.uid, name: player.name})              
                    } else {
                        this.result = false                                     
                   }               
                } 
           if(this.result === false) {                                          
               this.teams.push({number: num, uid: player.uid, name: player.name})                       
           }
            this.result = false                                                 

           } else {
               this.teams.push({number: num, uid: player.uid, name: player.name})                          
           }
        },
        submitGroups () {
            this.$store.dispatch('submitGroups', this.teams);
            this.$router.push('/groups')
        },
        deleteAssignedPlayer(id) {
            if(!this.teams.length == 0) {                                        
               for(var i=0; i < this.teams.length; i++) {                       
                    if(this.teams[i].uid == id) {                                                             
                        var a = this.teams.indexOf(this.teams[i])               
                        this.teams.splice(a, 1)    
                    }              
                }                                                       
            }
        },
        shufflePlayers() {
            let numberOfPlayers = this.players.length;    
            let amountOfEach = this.players / numberOfPlayers;   
            let numArray = [];   
            
            // lägg in alla nummer i en array och shuffla arrayen.

            for(let i = 0; i < numberOfPlayers; i++) {

                let num = 0;

                // tilldela spelaren första numret i arrayen

                this.teams.push({number: num, uid: this.player[i].uid, name: this.player[i].name})  
            } 
            this.$store.dispatch('submitGroups', this.teams);
            this.$router.push('/groups')            
        }
    }
}
</script>
