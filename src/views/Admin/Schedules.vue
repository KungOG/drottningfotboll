<template>
    <main class="content">
        <h1>Spel Schema</h1>
        <section class="schema" v-for="(game, index) in games" :key="index" >
            <span @click="addWinner(game.nr1, game.round)" >{{ game.nr1 }}</span> - <span @click="addWinner(game.nr2, game.round)"> {{ game.nr2 }}</span>
        </section>
        <section>
            <a href="#">Spara resultaten</a>
        </section>
    </main>
</template>

<script>
import db from '@/firebaseInit'
export default {
    name : 'schedules',
    data () {
        return {
            winner: [],
            games: [],
            result: false
        }
    },
    methods: {
        addWinner (num, round) {
            if (!this.winner.length == 0) {                                       
                for(let i = 0; i < this.winner.length; i++) {  
                    if(this.winner[i].game == round) {  
                        this.result = true
                        var a = this.winner.indexOf(this.winner[i])               
                        this.winner.splice(a, 1)                                 
                        this.winner.push({game: round, team: num})   
                    } else {
                        this.result = false
                    }
                }
            if(this.result === false) {
                this.winner.push({game: round, team: num}) 
            }    
            this.result = false

            } else {
                this.winner.push({game: round, team: num})                          
            }
                  
        }
    },
    mounted() {
        if (localStorage.getItem('winner')) {
            this.winner = JSON.parse(localStorage.getItem('winner'));
        }
        
        var item = db.collection('games').doc('skogaby').collection('currentGame').doc('oq0GBtqK2oskbDMN9wrA')
        
        item.get().then((doc) => {
            var game = doc.data().games
            console.log(game)

            this.games = game
        })               
    }
}
</script>


