    
<template>
    <article>
        <section class="content">
            <h3 v-if="!show">Poäng förlust</h3>
                <a href="#" v-if="show" @click="show = !show">Poäng förlust: {{ numberOfLoss }}</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsLoss(0)" :disabled = isDisabled>0</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsLoss(1)" :disabled = isDisabled>1</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsLoss(2)" :disabled = isDisabled>2</a>
                <br>
                <br>
            <p v-if="show" @click="$router.push('/makegroups')">Klar</p>
                <br>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'chooseloss',
    data () {
        return {
            isDisabled: false,
            show: false,
            numberOfLoss: 0
        }
    },
    methods: {
        addNumberOfPointsLoss(num) {
            this.isDisabled = true;
            this.show = !this.show;
            this.numberOfLoss = num;
            this.$store.dispatch('setNumberOfLoss', num)
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