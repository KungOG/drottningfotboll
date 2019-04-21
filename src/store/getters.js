export default {

  /* Specifik spelare */
  player (state) {
    return state.player;
  },

  /* Användare */
  getCurrentUser(state) {
    return state.currentUser;
  },

  /* Valda laget */
  getSelectedTeam(state) {
    return state.selectedTeam;
  },

  /* Lagets spelare */
  getTeamPlayers(state) {
    return state.teamPlayers;
  },

  /* Filtrera ut den specifika spelaren */
  getPlayerByUid (state) {
    return (uid) => {
      return state.teamPlayers.filter(
        player => player.uid == uid
      )[0]
    }
  }
}
