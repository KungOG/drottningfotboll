<template>
    <article class="editplayer-page">
      <section class="editplayer-navbar">
        <img src="@/assets/icon/merge-people.svg" @click="showList"  v-if="show" />
        <img src="@/assets/icon/back-left.svg" @click="showList"  v-if="!show" />
      </section>
        <section class="editplayer-input-field">
          <section class="input-field-name">
            <label>Namn</label>
            <input type="text" v-model="player.name">
          </section>
          <section class="input-field-top">
            <section>
              <label>Antal vinster</label>
              <input type="number" v-model="player.win">
            </section>
            <section>
              <label>Antal förluster</label>
              <input type="number" v-model="player.loss"> 
            </section>
          </section>                   
          <section class="input-field-middle">
            <section>
              <label>Antal poäng</label> 
              <input type="number" v-model="player.point">
            </section>
            <section>
              <label>Antal oavgjort</label> 
              <input type="number" v-model="player.tie">
            </section>
          </section>
          <section class="input-field-bottom">
            <section>
              <label>Antal mål</label> 
              <input type="number" v-model="player.goal">
            </section>
          </section>
        </section>
        <section class="editplayer-bottom">
          <section v-if="show" class="edit-player-btn1">
            <img src="@/assets/icon/bin.svg" @click="deleteBtn" class="bin-btn"/> 
            <img src="@/assets/icon/ok.svg" class="orange-btn" @click="remakePlayer" />
          </section>
          <section v-if="!show" class="edit-player-btn2">
            <p>Välj spelare att överföra</p>
          <section class="editplayer-list">
            <section class="editplayer-player" v-for="player in filterPlayers" :key="player.uid">
              <span @click="markedPlayer = player">{{player.name}}</span>
            </section>
          </section>
          <img src="@/assets/icon/ok.svg" class="orange-btn" @click="mergeBtn" />
        </section>
      </section>
    </article>
</template>

<script>
export default {
    name : 'editplayer',
    data () {
      return {
         show: true,
         markedPlayer: null
      }
    },
    components: {
      
    },
    computed : {

      /* Kolla spelarens UID */
      player () {
        return this.$store.getters.getPlayerByUid(
          this.$route.params.uid
        );
      },

      /* Lagspelare  */
      teamPlayers() {
        let array = this.$store.state.adminTeamPlayers;
        let check = false;
        let filteredPlayers = [];
            
        for( var i = 0; i < array.length; i++){
            if(array[i].uid !== this.player.uid ){
                filteredPlayers.push(array[i]);
            }
        }
        return filteredPlayers
      },

      /* Filtrera spelare med lägre UID */
      filterPlayers () {
          return this.teamPlayers.filter((player) => {
            return player.uid.length <= 20;
          })
        }
    }, 
    methods : {

       /* Pop-Out */
        deleteBtn() {
          swal({
              title: "Är du helt säker?",
              text: `Vill du verkligen ta bort ${this.player.name} ifrån laget!`,
              icon: "warning",
              buttons: ["Nä", "Helt klart"],
              dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
              swal(`Du har nu tagit bort ${this.player.name} ifrån laget, fy dig!`, {
                icon: "success",
              });
              this.deletePlayer();
            } else {
              swal(`Wiiihooo, ${this.player.name} överlevde en dag till! :)`);
            }
          });
        },
        
        /* Pop-Out */
        mergeBtn() {
          swal({
              title: "Är du helt säker?",
              text: `Vill du överföra statistiken ifrån gästspelaren ${this.markedPlayer.name} till ${this.player.name}?

              ${this.markedPlayer.name} kommer att tas bort!`,
              icon: "info",
              buttons: ["Nä", "Ja"],
              dangerMode: true,
            })
            .then((willMerge) => {
            if (willMerge) {
              swal(`${this.player.name} har nu samlat på sig en jäkla massa poäng, dopad?`, {
                icon: "success",
              });
              this.mergeUpdatedPlayer();
            } else {
              swal(`${this.markedPlayer.name} kan nu fajtas ännu en dag mot ${this.player.name}, arrrgh!`);
            }
          });
        },

        /* Ta bort en spelare */
        deletePlayer () {
          console.log('deleted');
          this.$store.dispatch('removePlayerFromTeam', this.player.uid);
          setTimeout(() => this.$router.push({
            path: '/players'
          }), 1000);
        },

        /* Ändra spelaren */
        remakePlayer () {
          console.log(this.player);
          this.$store.dispatch('remakePlayerFromTeam', this.player);
          setTimeout(() => this.$router.push({
            path: '/players'
          }), 1000);
        },

        /* Lägg samman spelaren och den tillfälliga */
        mergeUpdatedPlayer () {
          this.$store.dispatch('mergeUpdatedPlayer', {player1: this.player, player2: this.markedPlayer});
          setTimeout(() => this.$router.push({
            path: '/players'
          }), 1000)
        },

        /* Visa ny sektion */
        showList() {
          if(this.show != false) {
            this.show = false;
          } else {
            this.show = true;
          }
        }
    }
}

</script>
<style scoped lang="scss">

  .box-container {
    display: flex;
    flex-direction: row;
  }

  .info-box {
    display : flex;
    margin: 1rem;
    justify-content : center;
    align-items : center;
    flex-direction: column;
    flex: 1;
  }

</style>
