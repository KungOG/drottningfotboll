<template>
    <main class="makegames-page">
        <Slide v-if="!show" noOverlay id="slide">
                <router-link to="/admin">Admin</router-link>
                <router-link to="/players">Spelare</router-link>
                <router-link to="/makegames">Setup</router-link>
                <router-link to="/groups">Grupper</router-link>
                <router-link to="/schedules">Schema</router-link>
            </Slide>
        <section>
            <article class="info-container" v-if="show" @click="edit">
                <p>ANTAL LAG:</p>
                <h3> {{ numberOfTeams }}</h3>
            </article>
            <article v-if="!show" class="btn-container">
                <h1>VÄLJ ANTAL LAG</h1> 
                <article v-if="!show" class="setup-btn">
                    <div :class="{btn: editValue == true}" @click="addNumberOfTeams(2)"><p>2</p></div>
                    <div :class="{btn: editValue == true}" @click="addNumberOfTeams(3)"><p>3</p></div>
                    <div :class="{btn: editValue == true}" @click="addNumberOfTeams(4)"><p>4</p></div>
                    <div :class="{btn: editValue == true}" @click="addNumberOfTeams(5)"><p>5</p></div>
                </article>
            </article>
            <router-view />
            <AdminPager :activeSlide = 'activeSlide' v-if="activeSlide !== 5"/>
        </section>
    </main>
</template>
<script>
import { Slide } from 'vue-burger-menu';
import AdminPager from '@/components/AdminPager.vue';
export default {
    name : 'makegame',
    beforeMount () {
        this.$store.dispatch('activeSlide', 0);
        localStorage.removeItem('winner');
        localStorage.removeItem('gameSettings');
        localStorage.removeItem('goalTracker');
    },
    data () { 
        return {
            numberOfTeams: 0,
            show: false,  
            editValue: false
        }
    },
    components: {
        Slide,
        AdminPager
    },
    computed: {
        activeSlide() {
            return this.$store.state.activeSlide;
        }
    },
    methods: {
        edit() {
            this.show = !this.show
            this.editValue = true
        },
        addNumberOfTeams(num) {
            this.$store.dispatch('activeSlide', 1)
            this.isDisabled = true;
            this.numberOfTeams = num;
            this.show = !this.show;
            this.$store.dispatch('setNumberOfTeams', num)
            if(this.$router.history.current.name == 'makegames' ) {
                this.$router.push('/choosegame');
            }  
        }           
    }
}
</script>