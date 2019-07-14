<template>
    <main>
        <Slide id="slide">
            <router-link to="/admin">Admin</router-link>
            <router-link to="/players">Players</router-link>
            <router-link to="/makegames">Make Game</router-link>
            <router-link to="/schedules">Schedules</router-link>
        </Slide>
        <h1>Admin grupper</h1>
        <section v-for="group in groups" :key="group.id" @click="$router.push(`editgroups/${group.id}`)">
            <h3 v-if="group.players[0]">{{group.name}}</h3>
           <group :group="group.players" />
        </section>
        <a href="#" @click="submitGroup" >OK</a> 
    </main>
</template>

<script>
import { Slide } from 'vue-burger-menu';
import group from '@/components/Admin/Group.vue';

export default {
    name : 'groups',
    components: {
       group,
       Slide
    },
    computed: {
       groups () {
           return this.$store.getters.groups;
       }
    },
    methods: {
        /* Pop-Out */
        submitGroup() {
            swal({
                title: `Är ni redo för spel?`,
                text: `Vill du spika grupperna och skapa ett spelschema?`,
                icon: "info",
                buttons: ["Inte nu", "Hämta hammarn"],
                dangerMode: false,
            })
            .then((Submitted) => {
                if (Submitted) {
                    this.submitSchedules();
                } else {
                    swal(`Vi alla har ångrat oss någon gång i livet, detta var din gång!`);
                }
            });
        },
        submitSchedules() {
            this.$store.dispatch('submitSchedules')
            this.$router.push('/schedules')
        }
    }
}
</script>
