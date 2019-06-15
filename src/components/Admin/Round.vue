<template>
    <article class="main">
        <section class="list-wrapper">
            <section class="container">
                <span @click="groupOne" :class="{red:home}">{{ game.home.groupNr }}</span> - <span @click="groupTwo" :class="{red:away}"> {{ game.away.groupNr }}</span>
            </section>
        </section>
    </article>
</template>

<script>
export default {
    name : 'round',
    props: ['game'],
    data () {
        return {
            home: false,
            away: false,
            winner: [],
            result: false
        }
    },
    watch: {
        home() {
            this.addWinner(1);
        },

        away() {
            this.addWinner(2);
        }
    },
    mounted() {
           this.getLocalStorage();
    },
     methods: {
        groupOne() {
            if(this.home == true) {
                this.home = false;
            } else {
                this.home = true;
            }

        },
        groupTwo() {
            if(this.away == true) {
                this.away = false;
            } else {
                this.away = true;
            }

        },
        addWinner(num) {
            //Hämta en uppdaterad array från local storage
            if (localStorage.getItem('winner')) {
            this.winner = JSON.parse(localStorage.getItem('winner')); 
            }
            //kolla om arrayen har ett innehåll
            if (!this.winner.length == 0) {                                       
                for(let i = 0; i < this.winner.length; i++) { 
                    //om den har det, kolla om denna omgång finns med 
                    if(this.winner[i].game == this.game.round) {  
                        this.result = true
                        //om den finns och båda värdena är false, ta bort den från arrayen
                        if(this.home == false && this.away == false) {
                            var a = this.winner.indexOf(this.winner[i])               
                            this.winner.splice(a, 1)
                            break;
                        } else {
                            //om den finns uppdatera annars värderna
                            if(num === 1) {
                                this.winner[i].home.win = this.home;
                            } else {
                                this.winner[i].away.win = this.away;
                            }
                            break;
                        }
                        
                    } else {
                        this.result = false
                        
                    }
                }
            //om denna omgång inte finns i arrayen, lägg till den    
            if(this.result === false) {
                this.addRoundToArray();
            }    
            this.result = false
            //om arrayen är tom, lägg till denna omgång
            } else {
                this.addRoundToArray();                          
            }    
            //spara winnerarray i localstorage  
            this.setLocalStorage(); 
            this.$emit('checkWinners');
        },
        addRoundToArray() {
            this.winner.push({
                game: this.game.round, 
                home: {
                    groupNr: this.game.home.groupNr, 
                    win: this.home
                    }, 
                away: {
                    groupNr: this.game.away.groupNr, 
                    win: this.away
                    }
            })  
        },
        setLocalStorage() {
            localStorage.setItem('winner', JSON.stringify(this.winner));
        },
        getLocalStorage() {
            if (localStorage.getItem('winner')) {
            this.winner = JSON.parse(localStorage.getItem('winner'));   

            //kolla om winner innehåller samma round, om den gör det, sätt värdena i data till true/false
            for(let i = 0; i < this.winner.length; i++) {
                if(this.winner[i].game == this.game.round) {
                    this.home = this.winner[i].home.win
                    this.away = this.winner[i].away.win
                }
            }
        } 
        }
    },
}
</script>

<style>
.red {
    color: red;
}
</style>

