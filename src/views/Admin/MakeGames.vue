<template>
    <main class="">
        <Slide id="slide">
            <router-link to="/admin">Admin</router-link>
            <router-link to="/players">Players</router-link>
            <router-link to="/makegames">Make Game</router-link>
            <router-link to="/schedules">Schedules</router-link>
        </Slide>
        <section>
            <h1 v-if="!show">Välj antal Lag</h1> 
            <a href="#" v-if="show" @click="show = !show">Antal lag: {{ numberOfTeams }}</a>
            <a href="#" v-if="!show" @click="addNumberOfTeams(2)" >2</a>
            <a href="#" v-if="!show" @click="addNumberOfTeams(3)" >3</a>
            <a href="#" v-if="!show" @click="addNumberOfTeams(4)" >4</a>
            <a href="#" v-if="!show" @click="addNumberOfTeams(5)" >5</a>
            <br>
            <br>
            <br>
        </section>
         <router-view />
    </main>
</template>

<script>
import { Slide } from 'vue-burger-menu';

export default {
    name : 'makegame',
    beforeMount () {
        /* Ta bort föregåendespel */
        localStorage.removeItem('winner')
        localStorage.removeItem('gameSettings')
        localStorage.removeItem('goalTracker')
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