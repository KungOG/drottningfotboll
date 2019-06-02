<template>
    <main class="content">
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
export default {
    name : 'makegame',
    beforeMount () {
        /* Ta bort föregåendespel */
        localStorage.removeItem('winner')
        localStorage.removeItem('gameSettings')
    },
    data () { 
        return {
            numberOfTeams: 0,
            show: false,     
        }
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