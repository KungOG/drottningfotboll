<template>
    <main class="groups">
        <Slide id="slide">
            <router-link to="/admin">Admin</router-link>
            <router-link to="/players">Players</router-link>
            <router-link to="/makegames">Make Game</router-link>
            <router-link to="/schedules">Schedules</router-link>
        </Slide>
        <section class="container">
            <section>
                <article v-for="group in groups" :key="group.id" @click="$router.push(`editgroups/${group.id}`)">
                    <group :group="group" v-if="group.players.length !== 0" />
                </article>
            </section>
            <img src="@/assets/icon/ok.svg" class="orange-btn" @click="submitGroup" />
        </section>
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
           /* Plocka ut endast de grupper som har spelare */
            let allGroups = this.$store.getters.groups;
            return allGroups;
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
