<template>
    <main class="content">
        <h1>Spel Schema</h1>
        <section class="schema" v-for="(game, index) in games" :key="index" >
            <p>{{ game.nr1 }} - {{ game.nr2 }}</p>
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
    mounted() {
        
        var item = db.collection('games').doc('skogaby').collection('currentGame').doc('g7r2HSW4RfywAnJFgRlh')
        
        item.get().then((doc) => {
            var game = doc.data().games
            console.log(game)

            this.games = game
        })               
    }
}
</script>


