export default {

  setPlayer(state, player) {
    state.player = player;
  },
  setTeamPlayers(state, teamPlayers) {
    state.teamPlayers = teamPlayers;
  },
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },
  removeCurrentUser(state) {
    state.currentUser = {};
  }
}
