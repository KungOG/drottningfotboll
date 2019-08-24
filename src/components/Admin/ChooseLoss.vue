<template>
    <main class="makegames">
            <article class="info-container" v-if="show" @click="edit">
                <p>POÄNG PER FÖRLUST:</p>
                <h3> {{ numberOfLoss }}</h3>            
            </article>
            <article v-if="!show" class="btn-container">
                <h1>VÄLJ ANTAL POÄNG PER FÖRLUST</h1>
                <article v-if="!show" class="setup-btn">
                    <div :class="{btn: editValue == true}" @click="addNumberOfPointsLoss(0)"><p>0</p></div>
                    <div :class="{btn: editValue == true}" @click="addNumberOfPointsLoss(1)"><p>1</p></div>
                    <div :class="{btn: editValue == true}" @click="addNumberOfPointsLoss(2)"><p>2</p></div>
                </article>
            </article>
        <router-view />
    </main>
</template>
<script>
export default {
    name : 'chooseloss',
    data () {
        return {
            show: false,
            numberOfLoss: 0,
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
        addNumberOfPointsLoss(num) {
            this.$store.dispatch('activeSlide', 4);
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