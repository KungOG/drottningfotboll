export default {
  
  player (state) {
    return state.player;
  },
  getCurrentUser(state) {
    return state.currentUser;
  },
  getSelectedTeam(state) {
    return state.selectedTeam;
  },
  getTeamPlayers(state) {
    return state.teamPlayers;
  },
  getPlayerByUid (state) {
    return (uid) => {
      return state.teamPlayers.filter(
        player => player.uid == uid
      )[0]
    }
  }
}
