<template>
    <article>
        <section class="content">
            <p>Steg 2/3</p>
            <p @click="$router.push('/choosepoint')">Välj Poäng</p>
        </section>
        <router-view />
    </article>
</template>

<script>
export default {
    name : 'choosegame'
}

</script>
