    
<template>
    <article>
        <section class="">
            <h3 v-if="!show">Poäng vinst</h3>
                <a href="#" v-if="show" @click="show = !show">Poäng vinst: {{ numberOfWin }}</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsWin(1)">1</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsWin(2)">2</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsWin (3)">3</a>
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
            show: false,
            numberOfWin: 0

        }
    },
    methods: {
        addNumberOfPointsWin(num) {
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