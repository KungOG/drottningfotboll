export default {

  /* Specifik spelare */
  player (state) {
    return state.player;
  },

  /* Användare */
  getCurrentUser(state) {
    return state.currentUser;
  },

  /* Användare */
  getAdminUser(state) {
    return state.adminUser;
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

  /* Lagets spelare */
  getAdminTeamPlayers(state) {
    return state.adminTeamPlayers;
  },
  
  /* Antal lag */
  getNumberOfTeams(state) {
    return state.numberOfTeams;
  },

  /* Hämta specifik lagdata */
  getSpecificTeamData(state) {
    return state.specificTeamData;
  },

  /* Filtrera ut den specifika spelaren */
  getPlayerByUid (state) {
    return (uid) => {
      return state.adminTeamPlayers.filter(
        player => player.uid == uid
      )[0]
    }
  },
  /* Filtrera ut den specifika gruppen */
  getChosenGroup (state) {
    return (id) => {
      return state.groups.filter(
        group => group.id == id
      )[0]
    }
  },

  /* Hämta alla grupperna ifrån State */
  groups(state) {
    return state.groups;
  },

  filterDate(state) {
    let games = state.specificTeamData;
    let date = state.date;
    let time = state.time;
    let matchDate = [];

    for (let i = 0; i < games.length; i++) {
      if (games[i].date === date && games[i].time === time) {
        matchDate.push(games[i])
      }
    }
    return matchDate[0];
  },
  
  filterTime(state) {
    let games = state.specificTeamData;
    let date = state.date;
    let matchDate = [];

    for (let i = 0; i < games.length; i++) {
      if (games[i].date === date) {
        matchDate.push(games[i])
      }
    }
    matchDate.sort((a, b) => (a.time > b.time) ? 1 : -1)
    return matchDate;
  }
}