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
            winner : [],
            games: []
        }
    },
    methods: {
        addWinner (num, roun) {
            if (!this.winner.length) {
                console.log('Funkar hit')
                for(let i = 0; i <= 1; i++) {
                    console.log(this.winner[i].round )
                    if(this.winner[i].round === roun) {
                        console.log('Finns i arrayen')
                    } else {
                        console.log('Finns inte i arrayen')
                        this.winner.push({game: round, team: num})
                    }
                }
            } else {
                console.log('arrayen är tom')
                this.winner.push({game: round, team: num})
            }
           
            console.log('slut!')
            
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


