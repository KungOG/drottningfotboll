<template>
    <main class="makegames-page">
        <Slide noOverlay v-if="!show" id="slide">
            <router-link to="/admin">Admin</router-link>
            <router-link to="/players">Players</router-link>
            <router-link to="/makegames">Make Game</router-link>
            <router-link to="/schedules">Schedules</router-link>
        </Slide>
        <section>
            <article class="info-container" v-if="show" @click="show = !show">
                <p>Antal lag:</p>
                <h3> {{ numberOfTeams }}</h3>
            </article>
            <article v-if="!show" class="btn-container">
                <h1>Välj antal Lag</h1> 
                <article v-if="!show" class="setup-btn">
                    <div @click="addNumberOfTeams(2)"><p>2</p></div>
                    <div @click="addNumberOfTeams(3)"><p>3</p></div>
                    <div @click="addNumberOfTeams(4)"><p>4</p></div>
                    <div @click="addNumberOfTeams(5)"><p>5</p></div>
                </article>
            </article>
         <router-view />
        </section>
    </main>
</template>

<script>
import { Slide } from 'vue-burger-menu';

export default {
    name : 'makegame',
    beforeMount () {
        /* Ta bort föregåendespel */
        localStorage.removeItem('winner');
        localStorage.removeItem('gameSettings');
        localStorage.removeItem('goalTracker');
    },
    data () { 
        return {
            numberOfTeams: 0,
            show: false,     
        }
    },
    components: {
        Slide
    },
    methods: {
        addNumberOfTeams(num) {
            this.isDisabled = true;
            this.numberOfTeams = num;
            this.show = !this.show;
            this.$store.dispatch('setNumberOfTeams', num)
            if(this.$router.history.current.name == 'makegames' ) {
                this.$router.push('/choosegame');
            }  
        }           
    }
}
</script>