export default {
  
  /* Spara valt datum i Calender komponenten */
  setDate(state, date) {
    state.date = date;
  },

  /* Spara tiden i Calender komponenten */
  setTime(state, time) {
    state.time = time;
  },
  
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

  /* Hämta specifik data */
  setSpecificTeamData(state, specificTeamData) {
    state.specificTeamData = specificTeamData;
  },

  /* Spara senaste spel */
  setCurrentGame(state, currentGame) {
    state.currentGame = currentGame;
  },

  /* Ta bort dig när du loggar ut */
  removeCurrentUser(state) {
    state.currentUser = {};
  },
  
  /* Töm grupperna */
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
  setNumberOfEqual(state, num) {
    state.numberOfEqual = num;
  },

  /* Ta bort spelaren i listan TeamPlayer */
  deletePlayer(state, id) {
    var index = state.teamPlayers.findIndex(player => player.uid == id)
    state.teamPlayers.splice(index, 1)
  },

  /* Ta bort spelaren från specifik grupp */
  deleteGroupPlayer(state, payload) {
    var index = state.groups[payload.group].players.findIndex(player => player.uid == payload.player)
    state.groups[payload.group].players.splice(index, 1)
  },

  /* Ta bort spelaren från okänd grupp */
  removeGroupPlayer(state, payload) {
    for(let i = 0; i < state.groups.length; i++) {
      if (state.groups[i].players.findIndex(player => player.uid == payload.uid) !== -1) {
        var index = state.groups[i].players.findIndex(player => player.uid == payload.uid)
        state.groups[i].players.splice(index, 1)
      }
    }
  },

  /* Lägg till spelaren i gruppen */
  addGroupPlayer(state, payload) {
    
    state.groups[payload.group].players.push({
      name: payload.player.name, 
      number: payload.group, 
      uid: payload.player.uid
    })
  },

  /* Spara grupperna */
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
