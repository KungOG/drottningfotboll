<template>
    <main class="admin-page" v-touch:swipe.left="leftSwipe" v-touch:swipe.right="rightSwipe">
        <Pager :activeSlide='1' />
        <section class="admin-logout">
            <img src="@/assets/icon/logout.svg" alt="Logout" @click="logout">
        </section>
        <section class="admin-logo">
            <img src="@/assets/img/logo-text.svg" alt="KungFotboll logo" />
            <h1>ADMIN</h1>
        </section>
        <section class="admin-btn">        
            <section class="admin">
                <div class="one-admin-btn" @click="$router.push('/players')">
                    <img src="@/assets/icon/person.svg" alt="A Person"> 
                    <p>SPELARE</p>
                </div>
                <div class="one-admin-btn" @click="$router.push('/makegames')">
                    <img src="@/assets/icon/settings.svg" alt="A Cogwheel">
                    <p>SETUP</p>
                </div>
            </section>       
            <section class="admin">
                <div class="one-admin-btn" @click="$router.push('/groups')">
                    <img src="@/assets/icon/people.svg" alt="Group of People"> 
                    <p>GRUPPER</p>
                </div>
                <div class="one-admin-btn" @click="$router.push('/schedules')">
                    <img src="@/assets/icon/calendar.svg" alt="A Calendar">
                    <p>SCHEMA</p>
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
        activeSlide () {
            return this.$store.state.activeSlide;
        },
        leftSwipe () {
            this.$router.push('/stats')
        },
        rightSwipe () {
            this.$router.push('/about')  
        },
        async logout(){
            await firebase.auth().signOut();
            this.$store.dispatch('removeCurrentAdminUser');
            this.$router.push('/');
        }
    }
}
</script>
