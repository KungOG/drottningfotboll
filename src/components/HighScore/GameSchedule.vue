<template>
    <article class="aboutContent">
        <Calender />
        <section class="schema">
            <div v-for="(game, index) in games" :key="index" :game="game">
                <span>{{ game.home }}</span> - <span> {{ game.away }}</span>
            </div>
        </section>
    </article>
</template>

<script>
import db from '@/firebaseInit';
import Calender from '@/components/HighScore/Calender.vue';
export default {
    name : 'gameschedule',
    components: {
        Calender
    },
    data () {
        return {
            currentGame: 'currentGame',
            games: [],
        }
    },
    mounted() {
   
        var item = db.collection('games').doc(this.selectedTeam).collection(this.currentGame).doc('1')
        
        item.get().then((doc) => {
            var game = doc.data().games
            this.games = game
        })               
    },
    computed: {
        currentUser() {
            return this.$store.getters.getCurrentUser;
        },
        selectedTeam () {
            return this.$store.getters.getSelectedTeam;
        }     
    },
    methods: {
/*         if (date === 1 ) {
            this.currentGame = date
        } else {
            currentGame = 'currentGame'
        } */

    },
}
</script>