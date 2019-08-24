<template>
    <main :class="{ equal: show == true, makegames: show == false}">
        <article class="info-container" v-if="show" @click="edit">
            <p>POÄNG PER OAVGJORD:</p>
            <h3> {{ numberOfEqual }}</h3>            
        </article>
        <article v-if="!show" class="btn-container">
            <h1>VÄLJ ANTAL POÄNG PER OAVGJORD</h1>
            <article v-if="!show" class="setup-btn">                
                <div :class="{btn: editValue == true}" @click="addNumberOfPointsEqual(0)"><p>0</p></div>
                <div :class="{btn: editValue == true}" @click="addNumberOfPointsEqual(1)"><p>1</p></div>
                <div :class="{btn: editValue == true}" @click="addNumberOfPointsEqual(2)"><p>2</p></div>
            </article>
        </article>
        <img src="@/assets/icon/ok.svg" v-if="show" class="orange-btn" @click="submitGameSettings" />
    </main>
</template>
<script>
export default {
    name : 'chooseequal',
    data () {
        return {
            show: false,
            numberOfEqual: 0,
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
        addNumberOfPointsEqual(num) {
            this.$store.dispatch('activeSlide', 5);
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