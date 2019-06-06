<template>
    <main>
        <h1>Admin grupper</h1>
        <section v-for="group in groups" :key="group.id" @click="$router.push(`editgroups/${group.id}`)">
            <h3 v-if="group.players[0]">{{group.name}}</h3>
           <group :group="group.players" />
        </section>
        <a href="#" @click="submitSchedules" >OK</a> 
    </main>
</template>

<script>
import group from '@/components/Admin/Group.vue';

export default {
    name : 'groups',
    components: {
       group 
    },
    computed: {
       groups () {
           return this.$store.getters.groups;
       }
    },
    methods: {
        submitSchedules() {
            this.$store.dispatch('submitSchedules')
            this.$router.push('/schedules')
        }
    }
}
</script>
