<template>
    <article>
        <h1>Player Info</h1>
        <button @click="logout">Logout</button>
    </article>
</template>

<script>
import firebase from 'firebase'
export default {
    name : 'playerinfo',
    methods: {
        logout () {
            firebase.auth().signOut().then(function() {
            // Sign-out successful.
            }).catch(function(error) {
            // An error happened.
        });
    }
  }
}
</script>
