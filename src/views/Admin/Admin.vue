<template>
    <main class="content">
        <section class="logo">
            <h1>Logo</h1>
        </section>
        <section class="btn-container">
            <h1>Admin</h1>        
            <section class="admin-btn">
                <p @click="$router.push('/players')">Spelare</p> 
                <p @click="$router.push('/makegames')">Spel</p>
            </section>       
            <section class="admin-btn">
                <p @click="$router.push('/group')"> Grupper</p>
                <p @click="$router.push('/highscore')"> Lista</p>
            </section>
        </section>
    </main>
</template>

<script>
export default {
    name : 'admin'
}
</script>
