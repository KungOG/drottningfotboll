<template>
<main class="makegames-component">
        <section>
            <article class="info-container" v-if="show" @click="show = !show">
                <p>Poäng oavgjort:</p>
                <h3> {{ numberOfEqual }}</h3>            
            </article>
            <article v-if="!show" class="btn-container">
                <h1>Välj antal poäng oavgjort</h1>
                <article v-if="!show" class="setup-btn">                
                    <div @click="addNumberOfPointsEqual(0)"><p>0</p></div>
                    <div @click="addNumberOfPointsEqual(1)"><p>1</p></div>
                    <div @click="addNumberOfPointsEqual(2)"><p>2</p></div>
                </article>
            </article>
            <img src="@/assets/icon/ok.svg" v-if="show" class="orange-btn" @click="submitGameSettings" />
        </section>
    </main>
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