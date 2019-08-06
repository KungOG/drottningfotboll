<template>
    <main class="goalboard">
        <section class="nav-between">
            <Slide noOverlay id="slide">
                <router-link to="/admin">Admin</router-link>
                <router-link to="/players">Spelare</router-link>
                <router-link to="/makegames">Setup</router-link>
                <router-link to="/groups">Grupper</router-link>
                <router-link to="/schedules">Schema</router-link>
            </Slide>
            <img src="@/assets/icon/logo-crown-white.svg" @click="$router.push('/schedules')">
        </section>
        <section class="group-list">
            <section v-for="group in currentGame" :key="group.id">            
                <goalgroup :goalgroup="group" />
            </section>
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