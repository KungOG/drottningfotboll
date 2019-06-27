<template> 
    <main class="gamegroup-page">
        <Calendar @changeDate="changeDate"/>
        <section v-for="group in groups" :key="group.id">
            <aside>
               <h3 v-if="group.players[0]">{{group.name}}</h3>
            </aside>
            <article>
               <group :group="group.players" />
            </article>
        </section>
    </main>
</template>

<script>
import db from '@/firebaseInit';
import group from '@/components/Admin/Group.vue';
import Calendar from '@/components/HighScore/Calendar.vue';

export default {
    name : 'gamegroup',
    components: {
        group,
        Calendar
    },   
    data () {
        return {
            groups: [],
        }
    },
    mounted () {
        if(!this.$store.state.date || !this.$store.state.time) {
            this.groups = this.currentGame;
        } else {
            this.groups = this.specificTeamData
        }
    },
    computed: {
        currentGame() {
            /* Plocka ut endast de grupper som har spelare */
            let allGroups = this.$store.state.currentGame.groups;
            for(let i = 0; i < allGroups.length; i++) {
                if(allGroups[i].players.length === 0) {
                    allGroups.splice(i,1)
                }
            }
            return allGroups;

        },
        specificTeamData() {
            /* Plocka ut endast de grupper som har spelare */
            let allGroups = this.$store.getters.filterDate.groups;
            for(let i = 0; i < allGroups.length; i++) {
                if(allGroups[i].players.length === 0) {
                    allGroups.splice(i,1)
                }
            }
            return allGroups;
        }
    },
    methods: {
        changeDate() {
            this.groups = this.specificTeamData;
        }
    },
}
</script>