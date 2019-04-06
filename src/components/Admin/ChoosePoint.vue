<template>
    <article>
        <section class="content">
            <h1>Välj Poäng för vinst/förlust</h1>
            <p>Steg 3/3</p>
            <p @click="$router.push('/makegroups')">Klar</p>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'choosepoint'
}
</script>
