<template>
    <main>
        <section class="content">
            <h1>Välj antal Lag</h1> 
                <a href="#" :class="[{hide1:select1 == 1}, {hide2:select2 == 1}]" @click="addNumberOfTeams(2, 2, 3)" :disabled = isDisabled>2</a>
                <a href="#" :class="[{hide1:select1 == 2}, {hide2:select2 == 2}]" @click="addNumberOfTeams(3, 1, 3)" :disabled = isDisabled>3</a>
                <a href="#" :class="[{hide1:select1 == 3}, {hide2:select2 == 3}]" @click="addNumberOfTeams(4, 1, 2)" :disabled = isDisabled>4</a>

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
    data () {
        return {
            isDisabled: false,
            select1: undefined,
            select2: undefined
        }
    },
    methods: {
        addNumberOfTeams(num, value1, value2) {
            this.isDisabled = true;
            this.select1 = value1;
            this.select2 = value2;
            this.$store.dispatch('setNumberOfTeams', num)
            this.$router.push('/choosegame');
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
