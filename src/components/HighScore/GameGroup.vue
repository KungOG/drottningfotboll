<template> 
    <main class="gamegroup-page">
        <Calendar @changeDate="changeDate"/>
        <section class="container">
            <section class="grouplist">
            <section v-for="group in groups" :key="group.id">            
                <article>
                <group :group="group" />
                </article>
            </section>
        </section>
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
            this.groups = this.chosenGame;
        }
    },
    computed: {
        currentGame() {
            if(this.$store.state.currentGame !== undefined) {
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
        },
        chosenGame() {
            let allGroups = this.$store.getters.filterDate.groups;
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
    },
    methods: {
        changeDate() {
            this.groups = this.chosenGame;
        }
    },
}
</script>