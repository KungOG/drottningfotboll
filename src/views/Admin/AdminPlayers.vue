<template>
    <main>
        <section>
            <h1>Admin Players</h1>
            <thead>
                <tr>
                    <td @click="$router.push('/editplayer')">Edit Player | </td>
                    <td @click="$router.push('/addplayer')"> Add Player | </td>
                </tr>
            </thead>
        </section>
        <router-view />
    </main>
</template>

<script>
export default {
    name : 'adminplayers'
}
</script>
