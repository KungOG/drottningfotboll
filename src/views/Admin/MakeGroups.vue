    
<template>
    <main>
        <h1>Make groups</h1>
        <section>        
            <groupplayer v-for="player in players" :key="player.uid" :player="player" @setColor="setColor"/>
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
           if(!this.teams.length == 0) {                                        //om arrayen har ett innehåll
               for(var i=0; i < this.teams.length; i++) {                       //loopa igenom varje objekt i arrayen
                   if(this.teams[i].uid == player.uid) {                                //om spelaren redan finns i arrayen
                      
                        this.result = true                                      //sätt värde till true
                        var a = this.teams.indexOf(this.teams[i])               //hitta objektets index
                        this.teams.splice(a, 1)                                 //plocka bort objektet
                        this.teams.push({number: num, uid: player.uid, name: player.name})                 //och lägg till ett nytt      
    
                   } else {
                        this.result = false                                     //om spelaren inte finns sätt värde till false
                   }               
                } 
           if(this.result === false) {                                          //om spelaren inte finns i arrayen
               this.teams.push({number: num, uid: player.uid, name: player.name})                       //lägg till den
           }
            this.result = false                                                 //nollställ värdet

           } else {
               this.teams.push({number: num, uid: player.uid, name: player.name})                          //om arrayen är tom, lägg till spelaren
           }
        },
        submitGroups () {
            this.$store.dispatch('submitGroups', this.teams);
            this.$router.push('/groups')
        }
    }
}
</script>
      