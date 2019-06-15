<template> 
    <article>
        <Calender @changeDate="changeDate"/>
        <section v-for="group in groups" :key="group.id">
            <h3 v-if="group.players[0]">{{group.name}}</h3>
            <group :group="group.players" />
        </section>
    </article>
</template>

<script>
import db from '@/firebaseInit';
import group from '@/components/Admin/Group.vue';
import Calender from '@/components/HighScore/Calender.vue';

export default {
    name : 'gamegroup',
    components: {
        group,
        Calender
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
            this.groups = this.specificTeamData.groups
        }
    },
    computed: {
        currentGame() {
            return this.$store.state.currentGame.groups;
        },
        specificTeamData() {
            return this.$store.getters.filterDate;
        }
    },
    methods: {
        changeDate() {
            this.groups = this.specificTeamData.groups;
        }
    },
}
</script>