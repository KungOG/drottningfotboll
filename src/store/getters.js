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
  
  /* Grupp och dess nummer */
  inactiveGroup(state) {
    return state.groups[0].players;
  },
  groupOne(state) {
    return state.groups[1].players;
  },
  groupTwo(state) {
    return state.groups[2].players;
  },
  groupThree(state) {
    return state.groups[3].players;
  },
  groupFour(state) {
    return state.groups[4].players;
  },
  groupFive(state) {
    return state.groups[5].players;
  },

  filterDate(state) {
    let games = state.specificTeamData;
    let date = state.date;
    let time = state.time;
    let matchDate = [];

    for(let i = 0; i < games.length; i++) {
      if( games[i].date === date && games[i].time === time) {
        console.log('match')
        matchDate.push(games[i])
      }
    }
    return matchDate[1];
  },
  filterTime(state) {
    let games = state.specificTeamData;
    let date = state.date;
    let matchDate = [];

    for(let i = 0; i < games.length; i++) {
      if( games[i].date === date) {
        console.log('match')
        matchDate.push(games[i])
      }
    }
    return matchDate;
  }
  
}
