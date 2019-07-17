<template>
    <main class="groupplayer" v-touch:swipe.right="deletePlayer" @click="setColor">
        <section class="list-wrapper">
            <section class="container">
                <p>{{player.name}}</p>
                <aside :style="{background: activeColor}">{{amount}}</aside>
            </section>
        </section>
    </main>
</template>

<script>
export default {
    name : 'player',
    props: ['player'],
    data () {
        return {
            amount : 0,
            activeColor: ''
        }
    },
    computed: {
        numberOfTeams() {
            return this.$store.getters.getNumberOfTeams;
        }    
    },
    methods: {
        deletePlayer () {
            this.$store.dispatch('deletePlayer', this.player.uid);
            this.$emit('deleteAssignedPlayer', this.player.uid);
        },
        setColor () {
            this.amount++
            if (this.amount === 1) {
                this.activeColor = "green"
            } else if (this.amount === 2 && this.amount <= this.numberOfTeams){
                 this.activeColor = "red"
            } else if (this.amount === 3 && this.amount <= this.numberOfTeams){
                this.activeColor = "yellow"  
            } else if (this.amount === 4 && this.amount <= this.numberOfTeams){
                this.activeColor = "blue"
            } else if (this.amount === 5 && this.amount <= this.numberOfTeams){
                this.activeColor = "pink"    
            } else {
                this.activeColor = ''
                this.amount = 0
            }

            this.$emit('setColor', this.amount, {uid: this.player.uid, name: this.player.name})
            
        
        }
    }
}
</script>
