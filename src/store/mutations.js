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
  },
  setSelectedTeam(state, selectedTeam) {
    state.selectedTeam = selectedTeam;
  },
  setNumberOfTeams(state, num) {
    state.numberOfTeams = num;
  },
  setNumberOfGames(state, num) {
    state.numberOfGames = num;
  },
  setNumberOfWin(state, num) {
    state.numberOfWin = num;
  },
  setNumberOfLoss(state, num) {
    state.numberOfLoss = num;
  }
}
