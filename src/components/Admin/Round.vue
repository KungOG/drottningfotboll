<template>
    <article class="main">
        <section class="list-wrapper">
            <section class="container">
                <span @click="groupOne" :class="{red:group1}">{{ game.nr1 }}</span> - <span @click="groupTwo" :class="{red:group2}"> {{ game.nr2 }}</span>
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
            group1: false,
            group2: false,
            winner: [],
            result: false
        }
    },
    watch: {
        group1() {
            this.addWinner(1);
        },

        group2() {
            this.addWinner(2);
        }
    },
    mounted() {
           this.getLocalStorage();
    },
     methods: {
        groupOne() {
            if(this.group1 == true) {
                this.group1 = false;
            } else {
                this.group1 = true;
            }

        },
        groupTwo() {
            if(this.group2 == true) {
                this.group2 = false;
            } else {
                this.group2 = true;
            }

        },
        addWinner(num) {
            //Hämta en uppdaterad array från local storage
            if (localStorage.getItem('winner')) {
            this.winner = JSON.parse(localStorage.getItem('winner')); 
            }
            //kolla om denna omgång finns i arrayen, om den finns, uppdatera värdena
            if (!this.winner.length == 0) {                                       
                for(let i = 0; i < this.winner.length; i++) {  
                    if(this.winner[i].game == this.game.round) {  
                        this.result = true
                        if(num === 1) {
                            this.winner[i].group1 = this.group1;
                        } else {
                            this.winner[i].group2 = this.group2;
                        }
                    } else {
                        this.result = false
                    }
                }
            //om denna omgång inte finns i arrayen, lägg till den    
            if(this.result === false) {
                this.winner.push({game: this.game.round, group1: this.group1, group2: this.group2})  
            }    
            this.result = false
            //om arrayen är tom, lägg till denna omgång
            } else {
                this.winner.push({game: this.game.round, group1: this.group1, group2: this.group2})                           
            }    
            //spara winnerarray i localstorage  
            this.setLocalStorage(); 
            this.$emit('checkWinners');
        },
        setLocalStorage() {
            localStorage.setItem('winner', JSON.stringify(this.winner));
        },
        getLocalStorage() {
            if (localStorage.getItem('winner')) {
            this.winner = JSON.parse(localStorage.getItem('winner'));   

            //kolla om winner innehåller samma round, om den gör det, sätt true/false
            for(let i = 0; i < this.winner.length; i++) {
                if(this.winner[i].game == this.game.round) {
                    this.group1 = this.winner[i].group1
                    this.group2 = this.winner[i].group2
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

