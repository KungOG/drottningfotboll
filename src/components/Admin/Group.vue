<template>
    <main class="group-component">
        <section>
            <aside>
                <h3>{{group.name}}</h3>
            </aside>
            <section class="group-item">
                <article class="list-item-group" v-for="player in group.players" :key="player.uid">
                    <p> {{player.name}}</p>
                </article>
            </section>
        </section>
    </main>
</template>

<script>

export default {
    name : 'group',
    props: ['group']
}
</script>
