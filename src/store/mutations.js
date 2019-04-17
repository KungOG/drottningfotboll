export default {

  setPlayer(state, player) {
    state.player = player;
  },
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },
  removeCurrentUser(state) {
    state.currentUser = {};
  },
  setSelectedTeam(state, selectedTeam) {
    state.selectedTeam = selectedTeam;
  }
}
