<template>
    <main>
        <h1>Admin</h1>
        <h3 @click="$router.push('/makegames')">Skapa spel</h3>
        <h3 @click="$router.push('/players')">Lägg till spelare</h3>
    </main>
</template>

<script>
export default {
    name : 'admin'
}
</script>
