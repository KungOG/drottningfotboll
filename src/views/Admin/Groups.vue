<template>
    <main class="groups">
        <section class="nav-left">
            <Slide noOverlay id="slide">
                <router-link to="/admin">Admin</router-link>
                <router-link to="/players">Spelare</router-link>
                <router-link to="/makegames">Setup</router-link>
                <router-link to="/groups">Grupper</router-link>
                <router-link to="/schedules">Schema</router-link>
            </Slide>
        </section>
        <section class="container">
            <section>
                <article v-for="group in groups" :key="group.id" @click="$router.push(`editgroups/${group.id}`)">
                    <group :group="group" v-if="group.players.length !== 0 && group.id !== 0 " />
                </article>
            </section>
        </section>
        <img src="@/assets/icon/ok.svg" class="orange-btn" @click="submitGroup" v-show="active === false" />
    </main>
</template>
<script>
import { Slide } from 'vue-burger-menu';
import group from '@/components/Admin/Group.vue';
import {calculateGames} from '@/mixins/calculateGames.js';
export default {
    name : 'groups',
    mixins : [calculateGames],
    data () {
        return {
            active: false
        }
    },
    components: {
       group,
       Slide
    },
    beforeMount () {
        if (localStorage.getItem('active game')) {
            this.active = true;
        } else {
            this.active = false;
        }
    },
    computed: {
       groups () {
            let allGroups = this.$store.getters.groups;
            return allGroups;
       },
    },
    methods: {
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
            if (this.numberOfTeams === 2) {
                this.gameOfTwo();
            } else if (this.numberOfTeams === 3) {
                this.gameOfThree();
            } else if (this.numberOfTeams === 4) {
                this.gameOfFour();
            } else {
                this.gameOfFive();
            }
            this.$router.push('/schedules')
        }
    }
}
</script>
