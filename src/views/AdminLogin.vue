<template>
    <main>
        <section>
            <h1>Admin Login</h1>
            <label name="email">Email: </label>
            <input type="email"><br>
            <label name="password">Password: </label>
            <input type="password"><br><br>
            <a href="#" @click="adminLogin">Submit</a>
        </section>
    </main>
</template>

<script>
export default {
    name : 'adminlogin',
    data () {
        return {
            email: '',
            password: '',
        }
    },
    methods : {
        adminLogin () {
            
        }
    }
}
</script>

<style>

</style>
