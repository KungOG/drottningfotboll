<template>
    <main>
        <section>
            <h1>Make Games</h1>
            <p>Steg 1/4</p>
            <h3 @click="$router.push('/chooseteam')">Välj antal lag</h3>
        </section>
         <router-view />
    </main>
</template>

<script>
export default {
    name : 'makegame'
}
</script>