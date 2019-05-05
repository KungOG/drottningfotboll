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

  /* Alla users*/
  getAllUsers(state) {
    return state.allUsers;
  },

  /* Lagets spelare */
  getTeamPlayers(state) {
    return state.teamPlayers;
  },
  
  /* Antal lag */
  getNumberOfTeams(state) {
    return state.numberOfTeams;
  },

  /* Filtrera ut den specifika spelaren */
  getPlayerByUid (state) {
    return (uid) => {
      return state.teamPlayers.filter(
        player => player.uid == uid
      )[0]
    }
  },

  /* Grupp och dess nummer */
  inactiveGroup(state) {
    return state.inactiveGroup;
  },
  groupOne(state) {
    return state.groupOne;
  },
  groupTwo(state) {
    return state.groupTwo;
  },
  groupThree(state) {
    return state.groupThree;
  },
  groupFour(state) {
    return state.groupFour;
  },
  groupFive(state) {
    return state.groupFive;
  },
}
