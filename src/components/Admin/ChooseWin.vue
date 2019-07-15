    
<template>
     <main class="makegames">
            <article class="info-container" v-if="show" @click="show = !show">
                <p>Poäng vinst:</p>
                <h3> {{ numberOfWin }}</h3>            
            </article>
            <article v-if="!show" class="btn-container">
                <h1>Välj antal poäng vinster</h1>
                <article v-if="!show" class="setup-btn">
                    <div @click="addNumberOfPointsWin(1)"><p>1</p></div>
                    <div @click="addNumberOfPointsWin(2)"><p>2</p></div>
                    <div @click="addNumberOfPointsWin (3)"><p>3</p></div>
                </article>
            </article>
        <router-view />
    </main>
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