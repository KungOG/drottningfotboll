<template>
    <main class="groups">
        <Slide noOverlay id="slide">
            <router-link to="/admin">Admin</router-link>
            <router-link to="/players">Players</router-link>
            <router-link to="/makegames">Make Game</router-link>
            <router-link to="/schedules">Schedules</router-link>
        </Slide>
        <section class="container">
            <section>
                <article v-for="group in groups" :key="group.id" @click="$router.push(`editgroups/${group.id}`)">
                    <group :group="group" v-if="group.players.length !== 0 && group.id !== 0 " />
                </article>
            </section>
            <img src="@/assets/icon/ok.svg" class="orange-btn" @click="submitGroup" v-show="active === false" />
        </section>
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
           /* Plocka ut endast de grupper som har spelare */
            let allGroups = this.$store.getters.groups;
            return allGroups;
       },
 
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
            if (this.numberOfTeams === 2) {
                console.log('2')
                this.gameOfTwo();
            } else if (this.numberOfTeams === 3) {
                console.log('3')
                this.gameOfThree();
            } else if (this.numberOfTeams === 4) {
                console.log('4')
                this.gameOfFour();
            } else {
                console.log('5')
                this.gameOfFive();
            }
            this.$router.push('/schedules')
        }
    }
}
</script>
