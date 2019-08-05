<template>
    <main class="schedules-page">
        <section class="nav-between">
            <Slide noOverlay id="slide">
                <router-link to="/admin">Admin</router-link>
                <router-link to="/players">Players</router-link>
                <router-link to="/makegames">Make Game</router-link>
                <router-link to="/schedules">Schedules</router-link>
            </Slide>
            <img src="@/assets/icon/score.svg" @click="$router.push('/goalboard')">
        </section>
        <section class="container">
            <section class="gamelist">
                <article v-for="(game, index) in games" :key="index">
                    <round :game="game" @checkWinners="checkWinners"></round>
                </article>
            </section>
        </section>
        <img src="@/assets/icon/ok.svg" v-if="show" class="orange-btn" @click="submitStats" />
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
        submitStats() {
            swal({
                title: `Ska vi sätta spiken i kistan?`,
                text: `Är alla vinnare korade och målskyttarna satta, du kan inte ångra efter detta steg, gör dina val rätt!`,
                icon: "warning",
                buttons: ["Nä", "Japp"],
                dangerMode: true,
            })
            .then((Submitted) => {
                if (Submitted) {
                    swal({
                        text: `Bra, där satte du verkligen spiken i kistan!`,
                        icon: "success",
                        button: false,
                    }).then(() => {
                        this.saveResult();
                            setTimeout(() => this.$router.push({
                            path: '/admin'
                        }), 1000);
                    });

                } else {
                    swal(`Kom du på något? Bra att du ångrade dig nu och inte sen!`);
                }
            });
        },
        checkWinners() {
            if (localStorage.getItem('winner')) {
                this.winner = JSON.parse(localStorage.getItem('winner')); 
            }
            if (this.winner.length == this.games.length) {
                this.show = true
            } else {
                this.show = false
            }
        },
        saveResult () {
            this.$store.dispatch('setAdminTeamPlayers');
            var gameData = {
                currentGame: this.groups,
                winners: this.winner
            }
            this.$store.dispatch('saveResult', gameData)
            this.savePoints();
            localStorage.removeItem('winner');
            localStorage.removeItem('goalTracker');
            localStorage.removeItem('active game');
        }
    }
}
</script>
