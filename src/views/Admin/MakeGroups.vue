    
<template>
    <main>
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
    data () {
        return {
            teams: []
        }
    },
    components : {
        groupplayer
    },
    computed: {
        players () {
             return this.$store.getters.getTeamPlayers;
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
        }
    }
}
</script>
      