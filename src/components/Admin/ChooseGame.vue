<template>
    <article>
        <section class="content">
            <h1>Välj antal matcher varje lag ska möta varandra</h1>
            <p>Steg 2/3</p> <!-- Denna ska bort -->
                <a href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <br>
                <br>
            <p @click="$router.push('/choosepoint')">Nästa</p>
            <br>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'choosegame',
    data () {
        return {
            amountOfMatches: 0,
        }
    }
}
</script>
