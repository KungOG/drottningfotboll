    
<template>
    <article>
        <section class="content">
            <h3 v-if="!show">Poäng vinst</h3>
                <a href="#" v-if="show" @click="show = !show">Poäng vinst: {{ numberOfWin }}</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsWin(1)" :disabled = isDisabled>1</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsWin(2)" :disabled = isDisabled>2</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsWin (3)" :disabled = isDisabled>3</a>
                <br>
                <br>
                <br>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'choosewin',
    data () {
        return {
            isDisabled: false,
            show: false,
            numberOfWin: 0

        }
    },
    methods: {
        addNumberOfPointsWin(num, value1, value2) {
            this.isDisabled = true;
            this.numberOfWin = num;
            this.show = !this.show;
            this.$store.dispatch('setNumberOfWin', num)
            if(this.$router.history.current.name == 'choosewin' ) {
              this.$router.push('/chooseloss');
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