<template>
    <main class="">
        <Slide id="slide">
            <router-link to="/admin">Admin</router-link>
            <router-link to="/players">Players</router-link>
            <router-link to="/makegames">Make Game</router-link>
            <router-link to="/schedules">Schedules</router-link>
        </Slide>
        <section>
            <a href="#">Krona</a>
            <img src="@/assets/icon/score.svg" @click="$router.push('/goalboard')">
        </section>
        <h1>Spel Schema</h1>
        <round class="schema" v-for="(game, index) in games" :key="index" :game="game" @checkWinners="checkWinners"></round>
        <section>
            <a href="#" v-if="show" @click="submitStats">Spara resultaten</a>
        </section>
    </main>
</template>

<script>
import { Slide } from 'vue-burger-menu';
import round from '@/components/Admin/Round.vue';
import {calculatePoints} from '@/mixins/calculatePoints.js';
import db from '@/firebaseInit'

export default {
    name : 'schedules',
    mixins : [calculatePoints],
    components: {
        round,
        Slide
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
        this.$store.dispatch('getCurrentGame');
        var adminTeam = this.$store.state.adminUser.team;
        var item = db.collection('games').doc(adminTeam).collection('currentGame').doc('1')
        
        item.get().then((doc) => {
            var game = doc.data().games
            var groups = doc.data().groups
            this.games = game
            this.groups = groups
        })               
    },  
    methods: {

        /* Pop-Out */
        submitStats() {
            swal({
                title: `Ska vi sätta spiken i kistan?`,
                text: `Är alla vinnare korade och målskyttarna satta? 
                Du kan inte ångra efter detta steg, gör dina val rätt!`,
                icon: "warning",
                buttons: ["Nä", "Japp"],
                dangerMode: true,
            })
            .then((Submitted) => {
                if (Submitted) {
                    swal(`Bra, där satte du verkligen spiken i kistan!`);
                    this.saveResult();
                } else {
                    swal(`Kom du på något? Bra att du ångrade dig nu och inte sen!`);
                }
            });
        },
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
            this.$store.dispatch('getTeamPlayersFromDb');
            /* spara resultatet i databasen */
            var gameData = {
                currentGame: this.groups,
                winners: this.winner
            }
            this.$store.dispatch('saveResult', gameData)

            /*
             * Spara spelarens poäng
             ! Funktion finns i calculatePoint.js
            */
            this.savePoints();

        }
    }
}
</script>
