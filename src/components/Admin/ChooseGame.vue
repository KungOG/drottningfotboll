<template>
    <main class="makegames">
            <article class="info-container" v-if="show" @click="atClick">
                <p>Antal spel:</p>
                <h3> {{ numberOfGames }}</h3>            
            </article>
            <article v-if="!show" class="btn-container">
                <h1>Välj antal matcher</h1>
                <article v-if="!show" class="setup-btn">
                    <div @click="addNumberOfGames(2)"><p>2</p></div>
                    <div @click="addNumberOfGames(3)"><p>3</p></div>
                    <div @click="addNumberOfGames(4)"><p>4</p></div>
                </article>
            </article>
        <router-view />
    </main>
</template>

<script>
export default {
    name : 'choosegame',
    data () {
        return {
            numberOfGames: 0,
            show: false
        }
    },
    methods: {
        atClick() {
            this.show = false 
            this.$router.push('/makegames')
        },
        addNumberOfGames(num) {
            this.isDisabled = true;
            this.numberOfGames = num;
            this.show = !this.show;
            this.$store.dispatch('setNumberOfGames', num)
            if(this.$router.history.current.name == 'choosegame' ) {
              this.$router.push('/choosewin');
            }
        }
    }
}
</script>

