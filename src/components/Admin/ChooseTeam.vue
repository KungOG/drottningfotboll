<template>
    <article>
        <section>
            <h1>Choose Team</h1>
            <p @click="$router.push('/choosepoint')">Choose Point</p>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'chooseteam'
}
</script>

<style>

</style>
