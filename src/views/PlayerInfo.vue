<template>
    <article>
        <section>
          <img src="photo" style="height: 120px"><br>
          <p>{{userId}}</p>
          <section class="info-box">
            <p>{{ player.name }}</p>
          </section>
          <section class="info-box">
            <p>Poäng: {{ player.point }}</p>
          </section>
          <section class="box-container">
            <section class="info-box">
              <p>Vinster:</p>
              <p>{{ player.point }}</p>
            </section>
            <section class="info-box">
              <p>Förluster:</p>
              <p>{{ player.loss }}</p>
            </section>
              <button @click="logout">Logout</button>
          </section>
        </section>
    </article>
</template>

<script>
import firebase from 'firebase'
export default {
    name : 'playerinfo',
    data() {
      return {
        selected: "",
        userId: '',
        photo: ''
      }
    },
    computed: {
      player() {
        return this.$store.getters.getPlayer;
      }
    },
    methods: {
      logout(){
        firebase.auth().signOut();
      }
    },
  created () { 
    this.user = firebase.auth().currentUser; 
    if(this.user) { 
      this.photo = this.user.photoURL; 
      this.userId = this.user.uid; 
  } 
}
}
</script>

<style scoped lang="scss">
  @import "../scss/main";

  .box-container {
    display: flex;
    flex-direction: row;
  }

  .info-box {
    @extend %center;
    border: 1px solid black;
    border-radius: 5px;
    flex-direction: column;
    flex: 1;
  }


</style>
