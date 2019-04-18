export default {

  getCurrentUser(state) {
    return state.currentUser;
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
