<template>
    <article>
        <section class="content">
            <h1>Välj antal matcher</h1>
                <a href="#" :class="[{hide1:select1 == 1}, {hide2:select2 == 1}]" @click="addNumberOfGames(2, 2, 3)" :disabled = isDisabled>2</a>
                <a href="#" :class="[{hide1:select1 == 2}, {hide2:select2 == 2}]" @click="addNumberOfGames(3, 1, 3)" :disabled = isDisabled>3</a>
                <a href="#" :class="[{hide1:select1 == 3}, {hide2:select2 == 3}]" @click="addNumberOfGames (4, 1, 2)" :disabled = isDisabled>4</a>
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
            isDisabled: false,
            select1: undefined,
            select2: undefined
        }
    },
    methods: {
        addNumberOfGames(num, value1, value2) {
            this.isDisabled = true;
            this.select1 = value1;
            this.select2 = value2;
            this.$store.dispatch('setNumberOfGames', num)
            this.$router.push('/choosepoint');
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

