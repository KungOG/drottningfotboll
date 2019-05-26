<template>
    <main class="content">
        <h1>Spel Schema</h1>
        <round class="schema" v-for="(game, index) in games" :key="index" :game="game" @checkWinners="checkWinners"></round>
        <section>
            <a href="#" v-if="show">Spara resultaten</a>
        </section>
    </main>
</template>

<script>
import round from '@/components/Admin/Round.vue';
import db from '@/firebaseInit'

export default {
    name : 'schedules',
    components: {
        round
    },
    data () {
        return {
            games: [],
            winner: [],
            show: false            
        }
    },  
    mounted() {       
        var item = db.collection('games').doc('skogaby').collection('currentGame').doc('oq0GBtqK2oskbDMN9wrA')
        
        item.get().then((doc) => {
            var game = doc.data().games
            this.games = game
        })               
    },
    methods: {
        checkWinners() {
            if (localStorage.getItem('winner')) {
            this.winner = JSON.parse(localStorage.getItem('winner')); 
            }
            if(this.winner.length == this.games.length) {
                this.show = true
            } else {
                this.show = false
            }
        }
    }
}
</script>


