<template>
    <main>
        <Slide id="slide">
            <router-link to="/admin">Admin</router-link>
            <router-link to="/players">Players</router-link>
            <router-link to="/makegames">Make Game</router-link>
            <router-link to="/schedules">Schedules</router-link>
        </Slide>
        <section>
            <a href="#">Krona</a>
            <img src="@/assets/icon/score.svg">
        </section>
        <section v-for="group in currentGame" :key="group.id">            
            <article>
               <group :group="group" />
            </article>
        </section>
    </main>
</template>

<script>
import { Slide } from 'vue-burger-menu';
import group from '@/components/Admin/Group.vue';
export default {
    name: 'goalboard',
    components: {
       group,
       Slide
    },
    computed: {
        currentGame() {
            /* Plocka ut endast de grupper som har spelare */
            let allGroups = this.$store.state.currentGame.groups;
            if(allGroups[0].players.length === 0) {
                allGroups.shift();
            }
            for(let i = allGroups.length -1; i >= 0; i--) {
                if(allGroups[i].players.length === 0) {      
                    allGroups.pop();
                }
            }
            return allGroups;
        }
    }
}
</script>