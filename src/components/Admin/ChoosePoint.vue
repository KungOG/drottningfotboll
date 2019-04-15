    
<template>
    <article>
        <section class="content">
            <h1>Välj Poäng för vinst/förlust</h1>
            <p>Steg 3/3</p> <!-- Denna ska bort -->
            <h3>Poäng vinst</h3>
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">3</a>
            <h3>Poäng förlust</h3>
                <a href="#">0</a>
                <a href="#">1</a>
                <a href="#">2</a>
                <br>
                <br>
            <p @click="$router.push('/makegroups')">Klar</p>
                <br>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'choosepoint',
    data () {
        return {
            amountOfWins:0,
            amountOfLoss:0,
        }
    }
}
</script>
