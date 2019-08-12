export default {
  activeSlide (state, activeSlide) {
      state.activeSlide = activeSlide;
  },
  setDate(state, date) {
    state.date = date;
  },
  setTime(state, time) {
    state.time = time;
  },
  setPlayer(state, player) {
    state.player = player;
  },
  setAllUsers(state, allUsers) {
    state.allUsers = allUsers;
  }, 
  setTeamPlayers(state, teamPlayers) {
    state.teamPlayers = teamPlayers;
  },
  setAdminTeamPlayers(state, adminTeamPlayers) {
    state.adminTeamPlayers = adminTeamPlayers;
  },
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser;
  },
  setLoginNumber(state, number) {
    state.loginNumber = number;
  },
  setAdminUser(state, adminUser) {
    state.adminUser = adminUser;
    state.selectedTeam = adminUser.team;
  },
  setSuperAdmin(state, superAdminUser) {
    state.superAdminUser = superAdminUser;
  },
  setSpecificTeamData(state, specificTeamData) {
    state.specificTeamData = specificTeamData;
  },
  setCurrentGame(state, currentGame) {
    state.currentGame = currentGame;
  },
  removeCurrentUser(state) {
    state.currentUser = null;
    state.selectedTeam = '';
  },
  removeCurrentAdminUser(state) {
    state.adminUser = null;
    state.selectedTeam = '';
  },
  clearGroups(state) {
    state.groups = [
      {
        players: [],
        id: 0
      },
      {
        name: 'Grupp 1',
        players: [],
        id: 1
      },
      {
        name: 'Grupp 2',
        players: [],
        id: 2
      },
      {
        name: 'Grupp 3',
        players: [],
        id: 3
      },
      {
        name: 'Grupp 4',
        players: [],
        id: 4
      },
      {
        name: 'Grupp 5',
        players: [],
        id: 5
      }
    ]
  },
  setSelectedTeam(state, selectedTeam) {
    state.selectedTeam = selectedTeam;
    state.time = '';
    state.date = '';
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
  setNumberOfEqual(state, num) {
    state.numberOfEqual = num;
  },
  deletePlayer(state, id) {
    var index = state.adminTeamPlayers.findIndex(player => player.uid == id)
    state.adminTeamPlayers.splice(index, 1)
  },
  deleteGroupPlayer(state, payload) {
    var index = state.groups[payload.group].players.findIndex(player => player.uid == payload.player)
    state.groups[payload.group].players.splice(index, 1)
  },
  removeGroupPlayer(state, payload) {
    for(let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].players.findIndex(player => player.uid == payload.uid) !== -1) {
        var index = state.groups[i].players.findIndex(player => player.uid == payload.uid)
        state.groups[i].players.splice(index, 1)
      }
    }
  },
  addGroupPlayer(state, payload) {
    state.groups[payload.group].players.push({
      name: payload.player.name, 
      number: payload.group, 
      uid: payload.player.uid
    })
  },
  submitInactiveGroup(state, zero) {
    state.groups[0].players.push(zero);  
  },
  submitGroupOne(state, one) {
    state.groups[1].players.push(one);  
  },
  submitGroupTwo(state, two) {
    state.groups[2].players.push(two);  
  },
  submitGroupThree(state, three) {
    state.groups[3].players.push(three); 
  },
  submitGroupFour(state, four) {
    state.groups[4].players.push(four);  
  },
  submitGroupFive(state, five) {
    state.groups[5].players.push(five);  
  },
}