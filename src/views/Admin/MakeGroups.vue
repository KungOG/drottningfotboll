    
<template>
    <main>
        <h1>Make groups</h1>
        <section>        
            <groupplayer v-for="player in players" :key="player.uid" :player="player" @setColor="setColor"/>
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
    },
    methods: {
        setColor(num, id) {
           if(!this.teams.length == 0) {                                        //om arrayen har ett innehåll
               for(var i=0; i < this.teams.length; i++) {                       //loopa igenom varje objekt i arrayen
                   if(this.teams[i].uid == id) {                                //om spelaren redan finns i arrayen
                      
                        this.result = true                                      //sätt värde till true
                        var a = this.teams.indexOf(this.teams[i])               //hitta objektets index
                        this.teams.splice(a, 1)                                 //plocka bort objektet
                        this.teams.push({number: num, uid: id})                 //och lägg till ett nytt      
    
                   } else {
                        this.result = false                                     //om spelaren inte finns sätt värde till false
                   }               
                } 
           if(this.result === false) {                                          //om spelaren inte finns i arrayen
               this.teams.push({number: num, uid: id})                          //lägg till den
           }
            this.result = false                                                 //nollställ värdet

           } else {
               this.teams.push({number: num, uid: id})                          //om arrayen är tom, lägg till spelaren
           }
        }
    }
}
</script>
      