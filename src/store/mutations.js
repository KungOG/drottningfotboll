export default {

  setPlayer(state, player) {
    state.player = player;
},
  setTeamPlayers(state, teamPlayers) {
    state.teamPlayers = teamPlayers;
  },
  allUsers(state, array) {
    state.allUsers = array
  }
}
