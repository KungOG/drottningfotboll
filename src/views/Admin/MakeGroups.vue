    
<template>
    <main class="makegroups">
        <section class="nav-middle">
            <img src="@/assets/icon/shuffle.svg" @click="shufflePlayers" />
            <img src="@/assets/icon/repeat.svg" @click="resetPlayers" />
        </section>
        <section class="container">
            <article class="playerlist">         
                <groupplayer v-for="player in players" :key="player.uid" :player="player" @setColor="setColor" @deleteAssignedPlayer="deleteAssignedPlayer"/>
            </article>
            <img src="@/assets/icon/ok.svg" class="orange-btn" @click="submitGroups" v-show="teams.length >= 4" />
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
            result: false
        }
    },
    beforeCreate() {
      this.$store.dispatch('setAdminTeamPlayers');
      this.$store.dispatch('clearGroups');
    },
    components : {
        groupplayer
    },
    computed: {
        players () {
            return this.$store.getters.getAdminTeamPlayers;
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
            let num = 1; 
            this.teams = [];
            this.shuffle(this.players)

            for(let i = 0; i < this.players.length; i++) {                
                num++
                if(num > this.numberOfTeams) {
                    num = 1;
                }                           
                this.teams.push({number: num, uid: this.players[i].uid, name: this.players[i].name})  
            } 
            this.$store.dispatch('submitGroups', this.teams);
            this.$router.push('/groups')          
        },
        shuffle(a) {
            var j, x, i;
            for (i = a.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = a[i];
                a[i] = a[j];
                a[j] = x;
            }
            return a;
        },
        resetPlayers() {
            swal({
                title: `Hämta in spelarna igen?`,
                text: `Tänk på att alla borttagna spelare kommer tillbaka!`,
                icon: "warning",
                buttons: ["Nä", "Japp"],
                dangerMode: true,
            })
            .then((Submitted) => {
                if (Submitted) {
                    swal({
                        text: `Allright, då springer jag och hämtar dem igen!`,
                        icon: "success",
                        button: false,
                    }).then(() => {
                        this.$store.dispatch('setAdminTeamPlayers');
                    });

                } else {
                    swal(`Borttagna spelare är fortfarande borta!`);
                }
            });
        }
    }
}
</script>