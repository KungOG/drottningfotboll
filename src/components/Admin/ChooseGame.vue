<template>
    <main class="makegames">
            <article class="info-container" v-if="show" @click="edit">
                <p>ANTAL OMGÅNGAR:</p>
                <h3> {{ numberOfGames }}</h3>            
            </article>
            <article v-if="!show" class="btn-container">
                <h1>VÄLJ ANTAL OMGÅNGAR</h1>
                <article v-if="!show" class="setup-btn">
                    <div :class="{btn: editValue == true}" @click="addNumberOfGames(2)"><p>2</p></div>
                    <div :class="{btn: editValue == true}" @click="addNumberOfGames(3)"><p>3</p></div>
                    <div :class="{btn: editValue == true}" @click="addNumberOfGames(4)"><p>4</p></div>
                </article>
            </article>
        <router-view />
    </main>
</template>
<script>
export default {
    name : 'choosegame',
    data () {
        return {
            numberOfGames: 0,
            show: false,
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
        addNumberOfGames(num) {
            this.$store.dispatch('activeSlide', 2);
            this.isDisabled = true;
            this.numberOfGames = num;
            this.show = !this.show;
            this.$store.dispatch('setNumberOfGames', num)
            if(this.$router.history.current.name == 'choosegame' ) {
              this.$router.push('/choosewin');
            }
        }
    }
}
</script>

