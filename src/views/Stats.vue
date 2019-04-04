<template>
    <main>
        <section class="navigation">
            <h1>Stats</h1>
            <thead>
                <tr>
                    <td @click="$router.push('/gameschedule')">Spel Schema | </td>
                    <td @click="$router.push('/group')"> Grupper | </td>
                    <td @click="$router.push('/highscore')"> Lista</td>
                </tr>
            </thead>
        </section>
        <router-view />
    </main>
</template>

<script>
export default {
    name : 'stats'
}
</script>
