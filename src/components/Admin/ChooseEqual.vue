<template>
    <article>
        <section class="">
            <h3 v-if="!show">Poäng oavgjort</h3>
                <a href="#" v-if="show" @click="show = !show">Poäng oavgjort: {{ numberOfEqual }}</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsEqual(0)">0</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsEqual(1)">1</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsEqual(2)">2</a>
                <br>
                <br>
            <p v-if="show" @click="submitGameSettings">Klar</p>
                <br>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'chooseequal',
    data () {
        return {
            show: false,
            numberOfEqual: 0
        }
    },
    methods: {
        addNumberOfPointsEqual(num) {
            this.isDisabled = true;
            this.show = !this.show;
            this.numberOfEqual = num;
            this.$store.dispatch('setNumberOfEqual', num)
        },    
        submitGameSettings() {
            this.$store.dispatch('setGameSettings')
            this.$router.push('/makegroups')
        }
    }
}
</script>