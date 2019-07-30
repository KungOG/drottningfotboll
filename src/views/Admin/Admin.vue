<template>
    <main class="admin-page" v-touch:swipe.left="leftSwipe" v-touch:swipe.right="rightSwipe">
        <Pager :activeSlide='1' />
        <section class="admin-logout">
            <img src="@/assets/icon/entrance.svg" alt="Logout" @click="logout">
        </section>
        <section class="admin-logo">
            <img src="@/assets/img/crown.png">
            <img src="@/assets/img/fotball.png">
            <h1>ADMIN</h1>
        </section>
        <section class="admin-btn">        
            <section class="admin">
                <div class="one-admin-btn" @click="$router.push('/players')">
                    <img src="@/assets/icon/person.svg" alt="A Person"> 
                    <span>SPELARE</span>
                </div>
                <div class="one-admin-btn" @click="$router.push('/makegames')">
                    <img src="@/assets/icon/settings.svg" alt="A Cogwheel">
                    <span>SETUP</span>
                </div>
            </section>       
            <section class="admin">
                <div class="one-admin-btn" @click="$router.push('/groups')">
                    <img src="@/assets/icon/people.svg" alt="Group of People"> 
                    <span>GRUPPER</span>
                </div>
                <div class="one-admin-btn" @click="$router.push('/schedules')">
                    <img src="@/assets/icon/calendar-event.svg" alt="A Calendar">
                    <span>SCHEMA</span>
                </div>
            </section>
        </section>
    </main>
</template>

<script>
import firebase from 'firebase';
import Pager from '@/components/Pager.vue';
export default {
    name : 'admin',
    components: {
      Pager
    },
    methods: {

        /* Swipe funktionen */
        activeSlide () {
            return this.$store.state.activeSlide;
        },
        leftSwipe () {
            this.$router.push('/stats')
        },
        rightSwipe () {
            this.$router.push('/about')  
        },
        logout(){
            firebase.auth().signOut();
            this.$store.dispatch('removeCurrentAdminUser');
            this.$router.push('/');
        }
    }
}
</script>
