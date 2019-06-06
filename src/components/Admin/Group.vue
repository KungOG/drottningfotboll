<template>
    <article>
        <section class="aboutContent" v-for="player in group" :key="player.uid">
            <p> {{player.name}}</p>
        </section>
    </article>
</template>

<script>

export default {
    name : 'group',
    props: ['group']
}
</script>