<template>
    <main class="schedules-page">
        <Slide noOverlay id="slide">
            <router-link to="/admin">Admin</router-link>
            <router-link to="/players">Players</router-link>
            <router-link to="/makegames">Make Game</router-link>
            <router-link to="/schedules">Schedules</router-link>
        </Slide>
        <section class="menu">
            <img src="@/assets/icon/crown.svg" @click="$router.push('/schedules')">
            <img src="@/assets/icon/score.svg">
        </section>
        <section v-for="group in currentGame" :key="group.id">            
            <article>
               <goalgroup :goalgroup="group" />
            </article>
        </section>
    </main>
</template>

<script>
import { Slide } from 'vue-burger-menu';
import goalgroup from '@/components/Admin/GoalGroup.vue';
export default {
    name: 'goalboard',
    components: {
       goalgroup,
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