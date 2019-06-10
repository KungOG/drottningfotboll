<template>
    <article class="aboutContent">
        <Calender @changeDate="changeDate"/>
        <section class="schema">
            <div v-for="(game, index) in games" :key="index" :game="game">
                <span>{{ game.home.groupNr }}</span> - <span> {{ game.away.groupNr }}</span>
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
            games: [],
        }
    },
    mounted () {
        if(!this.$store.state.date || !this.$store.state.time) {
            this.games = this.currentGame;
        } else {
            this.games = this.specificTeamData.games
        }
    },
    computed: {
        currentGame() {
            return this.$store.state.currentGame.games;
        },
        specificTeamData() {
            return this.$store.getters.filterDate;
        }
    },
    methods: {
        changeDate() {
            this.games = this.specificTeamData.games;
        }
    },
}
</script>