<template>
    <main class="aboutContent">
        <h1>Admin</h1>
        <section class="schema">
            <p @click="$router.push('/makegames')">Skapa spel</p>
            <p @click="$router.push('/editplayer')">Redigera spelare</p>
        </section>
        <section class="schema">
            <p @click="$router.push('/group')"> Grupper | </p>
            <p @click="$router.push('/highscore')"> Lista</p>
        </section>
    </main>
</template>

<script>
export default {
    name : 'admin'
}
</script>
