<template>
    <main class="group-component">
        <section>
            <aside :style="{background: activeColor}">
                <h3>{{goalgroup.name}}</h3>
            </aside>
            <section class="group-item">
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
            this.activeColor = "green"
        } else if (number === 2) {
            this.activeColor = "red"
        } else if (number === 3) {
            this.activeColor = "orange"  
        } else if (number === 4) {
            this.activeColor = "blue"
        } else if (number === 5) {
            this.activeColor = "pink"    
        } 
    }
}
</script>
