<template>
    <main>
        <section class="content">
            <h1>Välj antal Lag</h1>
            <p>Steg 1/3</p>
            <h3 @click="$router.push('/choosegame')">Välj antal matcher</h3>
        </section>
         <router-view />
    </main>
</template>

<script>
export default {
    name : 'makegame'
}
</script>