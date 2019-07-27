<template>
    <main class="gameschedule-page">
        <Calendar class="calender" @changeDate="changeDate"/>
        <section class="container">
            <section class="gamelist">
                <article v-for="(game, index) in games" :key="index" :game="game">
                    <Game :game="game"/>
                </article>
            </section>
        </section>
    </main>
</template>

<script>
import db from '@/firebaseInit';
import Calendar from '@/components/HighScore/Calendar.vue';
import Game from '@/components/HighScore/Game.vue';

export default {
    name : 'gameschedule',
    components: {
        Calendar,
        Game
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
            if (this.$store.state.currentGame !== undefined) {
                return this.$store.state.currentGame.games;
            }
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