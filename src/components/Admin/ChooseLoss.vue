    
<template>
    <article>
        <section class="">
            <h3 v-if="!show">Poäng förlust</h3>
                <a href="#" v-if="show" @click="show = !show">Poäng förlust: {{ numberOfLoss }}</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsLoss(0)">0</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsLoss(1)">1</a>
                <a href="#" v-if="!show" @click="addNumberOfPointsLoss(2)">2</a>
                <br>
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
            
            if(this.$router.history.current.name == 'chooseloss' ) {
              this.$router.push('/chooseequal');
            }
        }
    }
}
</script>