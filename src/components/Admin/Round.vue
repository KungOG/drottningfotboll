<template>
    <main class="game-component">
        <article @click="groupOne">
            <img v-show="home" src="@/assets/icon/logo-crown-white.svg">
            <div class="group" :style="{background: activeColor1}">
                <p>Grupp</p>
                <p>{{ game.home.groupNr }}</p>
            </div>  
        </article>
        <div class="line"><hr></div>
        <article @click="groupTwo">
            <img v-show="away" src="@/assets/icon/logo-crown-white.svg">
            <div class="group" :style="{background: activeColor2}">
                <p>Grupp</p>
                <p>{{ game.away.groupNr }}</p>
            </div>
        </article>
    </main>
</template>

<script>
export default {
    name : 'round',
    props: ['game'],
    data () {
        return {
            activeColor1: 'red',
            activeColor2: 'green',
            winner: [],
            result: false,
            home: false,
            away: false
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
        this.setBackgroundColor();
    },
     methods: {
        groupOne() {
            if (this.home == true) {
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
        setBackgroundColor() {
            let number1 = this.game.home.groupNr;
            let number2 = this.game.away.groupNr;

            switch(number1) {
                case 1:
                    this.activeColor1 = "#fa3737"
                    break;
                case 2:
                    this.activeColor1 = "#ebdf04"
                    break;
                case 3:
                    this.activeColor1 = "#3737fa"
                    break;
                case 4:
                    this.activeColor1 = "#FF780A"
                    break;
                case 5:
                    this.activeColor1 = "#54b725"
                    break;
            }

            switch(number2) {
                case 1:
                    this.activeColor2 = "#fa3737"
                    break;
                case 2:
                    this.activeColor2 = "#ebdf04"
                    break;
                case 3:
                    this.activeColor2 = "#3737fa"
                    break;
                case 4:
                    this.activeColor2 = "#FF780A"
                    break;
                case 5:
                    this.activeColor2 = "#54b725"
                    break;
            }
        },
        addWinner(num) {
            if (localStorage.getItem('winner')) {
                this.winner = JSON.parse(localStorage.getItem('winner')); 
            }
            if (!this.winner.length == 0) {                                       
                for (let i = 0; i < this.winner.length; i++) { 
                    if (this.winner[i].game == this.game.round) {  
                        this.result = true
                        if (this.home == false && this.away == false) {
                            var a = this.winner.indexOf(this.winner[i])               
                            this.winner.splice(a, 1)
                            break;
                        } else {
                            if (num === 1) {
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
            if(this.result === false) {
                this.addRoundToArray();
            }    
            this.result = false
            } else {
                this.addRoundToArray();                          
            }    
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


