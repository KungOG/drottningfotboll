<template>
    <article>
        <section class="content">
            <h1 v-if="!show">Välj antal matcher</h1>
            <a href="#" v-if="show" @click="show = !show">Antal spel: {{ numberOfGames }}</a>
            <a href="#" v-if="!show" @click="addNumberOfGames(2)" :disabled = isDisabled>2</a>
            <a href="#" v-if="!show" @click="addNumberOfGames(3)" :disabled = isDisabled>3</a>
            <a href="#" v-if="!show" @click="addNumberOfGames(4)" :disabled = isDisabled>4</a>
            <br>
            <br>
            <br>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'choosegame',
    data () {
        return {
            numberOfGames: 0,
            isDisabled: false,
            show: false
        }
    },
    methods: {
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

<style lang="scss" scoped>
.hide1,
.hide2 {
    display: none !important;
}
</style>

