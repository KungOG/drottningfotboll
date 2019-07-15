    
<template>
    <main class="makegames-component">
        <section>
            <article class="info-container" v-if="show" @click="show = !show">
                <p>Poäng förlust:</p>
                <h3> {{ numberOfLoss }}</h3>            
            </article>
            <article v-if="!show" class="btn-container">
                <h1>Välj antal poäng förlust</h1>
                <article v-if="!show" class="setup-btn">
                    <div @click="addNumberOfPointsLoss(0)"><p>0</p></div>
                    <div @click="addNumberOfPointsLoss(1)"><p>1</p></div>
                    <div @click="addNumberOfPointsLoss(2)"><p>2</p></div>
                </article>
            </article>
        </section>
        <router-view />
    </main>
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