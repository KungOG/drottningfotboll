<template>
    <main class="goalgroup">
        <section class="container">
            <section class="name-list">
                <h3 :style="{background: activeColor}">{{goalgroup.name}}</h3>
                <goalgroupplayer class="list-item-group" :goalgroupplayer="player" v-for="player in goalgroup.players" :key="player.uid"/>
            </section>
        </section>
    </main>
</template>
<script>
import goalgroupplayer from '@/components/Admin/GoalGroupPlayer.vue';
export default {
    name : 'goalgroup',
    props: ['goalgroup'],
    components: {
       goalgroupplayer
    },
    data() {
        return {
            activeColor: "red",
        }
    },
    beforeMount() {
        let number = this.goalgroup.id;
        if (number === 1) {
            this.activeColor = "#fa3737"
        } else if (number === 2) {
            this.activeColor = "#ebdf04"
        } else if (number === 3) {
            this.activeColor = "#3737fa"  
        } else if (number === 4) {
            this.activeColor = "#FF780A"
        } else if (number === 5) {
            this.activeColor = "#54b725"    
        } 
    }
}
</script>
