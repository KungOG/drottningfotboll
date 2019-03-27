<template>
    <article>
        <section>
            <h1>Choose Game</h1>
            <p>Steg 4/4</p>
            <p @click="$router.push('/makegroups')">Submit</p>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'choosegame'
}

</script>
