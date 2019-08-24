<template>
     <main class="makegames">
        <article class="info-container" v-if="show" @click="edit">
            <p>POÄNG PER VINST:</p>
            <h3> {{ numberOfWin }}</h3>            
        </article>
        <article v-if="!show" class="btn-container">
            <h1>VÄLJ ANTAL POÄNG PER VINST</h1>
            <article v-if="!show" class="setup-btn">
                <div :class="{btn: editValue == true}" @click="addNumberOfPointsWin(1)"><p>1</p></div>
                <div :class="{btn: editValue == true}" @click="addNumberOfPointsWin(2)"><p>2</p></div>
                <div :class="{btn: editValue == true}" @click="addNumberOfPointsWin (3)"><p>3</p></div>
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
            numberOfWin: 0,
            editValue: false
        }
    },
    computed: {
        activeSlide () {
            return this.$store.state.activeSlide;
        }
    },
    methods: {
        edit() {
            this.show = !this.show
            this.editValue = true
        },
        addNumberOfPointsWin(num) {
            this.$store.dispatch('activeSlide', 3);
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