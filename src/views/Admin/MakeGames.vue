<template>
    <main>
        <section class="content">
            <h1>Välj antal Lag</h1> 
            <p>Steg 1/3</p> <!-- Denna ska bort -->
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <br>
                <br>
            <p @click="$router.push('/choosegame')">Nästa</p>
            <br>
        </section>
         <router-view />
    </main>
</template>

<script>
export default {
    name : 'makegame',
    data () {
        return {
            amountOfTeams: 0,
        }
    }
}
</script>