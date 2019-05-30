<template>
    <main class="content">
        <h1>Spel Schema</h1>
        <round class="schema" v-for="(game, index) in games" :key="index" :game="game" @checkWinners="checkWinners"></round>
        <section>
            <a href="#" v-if="show" @click="saveResult">Spara resultaten</a>
        </section>
    </main>
</template>

<script>
import round from '@/components/Admin/Round.vue';
import {calculatePoints} from '@/mixins/calculatePoints.js';
import db from '@/firebaseInit'

export default {
    name : 'schedules',
    mixins : [calculatePoints],
    components: {
        round
    },
    data () {
        return {
            games: [],
            winner: [],
            groups: [],
            show: false
        }
    },  
    mounted() {
        /* 
        ! Måste fixas 
        */       
        var item = db.collection('games').doc('skogaby').collection('currentGame').doc('754z5L37YQKkctxIf2vr')
        
        item.get().then((doc) => {
            var game = doc.data().games
            var groups = doc.data().groups
            this.games = game
            this.groups = groups
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
        },
        saveResult () {
            //spara resultatet i databasen
            var gameData = {
                currentGame: this.groups,
                winners: this.winner
            }
            this.$store.dispatch('saveResult', gameData)

            /*
             * Spara spelarens poäng
             ! Funktion finns i CalculatePoint.js
            */
            this.savePoints();
        }
    }
}
</script>
