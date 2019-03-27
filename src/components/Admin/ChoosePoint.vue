<template>
    <article>
        <section>
            <h1>Choose Point</h1>
            <p>Steg 3/4</p>
            <p @click="$router.push('/choosegame')">Choose Game</p>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'choosepoint'
}
</script>
