<template>
    <main>
    <Slide id="slide">
        <router-link to="/admin">Admin</router-link>
        <router-link to="/players">Players</router-link>
        <router-link to="/makegames">Make Game</router-link>
        <router-link to="/schedules">Schedules</router-link>
    </Slide>
    <section>
        <h1>Skapa ny Admin</h1>
        <label for="">Användarnamn</label>
        <input type="text">
        <label for="">Lag</label>
        <input type="text">
        <label for="">Lösenord</label>
        <input type="text">
        <label for="">Verifiering</label>
        <input type="text">
        <a href="#">Skapa ny Admin</a>
    </section>
    <section>
        <h1>Skapa nytt lag</h1>
        <label for="">Lag Namn</label>
        <input type="text">
        <a href="#">Skapa nytt lag</a>
    </section>
    </main>
</template>

<script>
import { Slide } from 'vue-burger-menu';

export default {
    name: 'superAdmin',
    components: {
        Slide
    }
}
</script>