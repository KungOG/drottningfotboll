<template>
    <article class="main" v-touch:swipe.right="deletePlayer" @click="setColor">
        <section class="list-wrapper">
            <section class="container">
                {{player.name}}
                {{amount}}
                <aside class="{color}">X</aside>
            </section>
        </section>
    </article>
</template>

<script>
export default {
    name : 'player',
    props: ['player'],
    data () {
        return {
            amount : 0
        }
    },
    methods: {
        deletePlayer () {
            this.$store.dispatch('deletePlayer', this.player.uid);
        },
        setColor () {
            this.amount++
            if (this.amount === 1) {
                return
            } else if (this.amount === 2){
                
            } else if (this.amount === 3){

            } else if (this.amount === 4){

            } else {

            }
            
        
        }
    }
}
</script>