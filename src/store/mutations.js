export default {
  
  /* När du ska ha en specifik spelare */
  setPlayer(state, player) {
    state.player = player;
  },

  /* Hämtat alla users */
  setAllUsers(state, allUsers) {
    state.allUsers = allUsers;
  }, 

  /* Hämtat alla lagetsspelare */
  setTeamPlayers(state, teamPlayers) {
    state.teamPlayers = teamPlayers;
  },

  /* Du som användare och dess info */
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },

  /* Ta bort dig när du loggar ut */
  removeCurrentUser(state) {
    state.currentUser = {};
  },

  /* När du väljer team ska det visas lagras här */
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
  },

  /* Ta bort spelaren i listan TeamPlayer */
  deletePlayer(state, id) {
    var index = state.teamPlayers.findIndex(player => player.uid == id)
    state.teamPlayers.splice(index, 1)
  },

  /* Spara grupperna */
  submitInactiveGroup(state, zero) {
  state.InactiveGroup.push(zero);  
  },
  submitGroupOne(state, one) {
  state.groupOne.push(one);  
  },
  submitGroupTwo(state, two) {
  state.groupTwo.push(two);  
  },
  submitGroupThree(state, three) {
  state.groupThree.push(three); 
  },
  submitGroupFour(state, four) {
  state.groupFour.push(four);  
  },
  submitGroupFive(state, five) {
  state.groupFive.push(five);  
  },
}
