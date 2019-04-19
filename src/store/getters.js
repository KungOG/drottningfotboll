export default {

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
      return state.players.filter(
        player => player._uid == uid
      )[0]
    }
  }
}
