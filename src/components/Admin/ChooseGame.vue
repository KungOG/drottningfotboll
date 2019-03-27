<template>
    <article>
        <section>
            <h1>Choose Game</h1>
            <p @click="$router.push('/choosepoint')">choosepoint</p>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'choosegame'
}
</script>
