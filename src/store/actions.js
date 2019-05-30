import db from '@/firebaseInit'
export default {

  /* Hämta en spelare ifrån DB:n */
  getPlayerFromDb(ctx, uid) {
    var item = db.collection('users').doc(uid)
    item.get().then((doc) => {
      var player = doc.data();
      ctx.commit('setPlayer', player)
    })
  },

  /* Hämta alla users ifrån DB:n */
  async getAllUsersFromDb(ctx) {
    var allUsers = []
    var item = await db.collection('users')
    await item.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var obj = (doc.id, " => ", doc.data())
        allUsers.push(obj)
      })
    })
    ctx.commit('setAllUsers', allUsers)
  },

  /* Hämta det specifika laget och deras spelare */
  async getTeamPlayersFromDb(ctx) {
    var teamPlayers = []
    var item = await db.collection('teams').doc('skogaby').collection('players').orderBy('point')
    await item.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var obj = (doc.id, " => ", doc.data())
        teamPlayers.push(obj)
      })
    })
    ctx.commit('setTeamPlayers', teamPlayers)
  },

  /* Hämtar din info som användare */
  async setCurrentUser(ctx, user) {
    var item = await db.collection('users').doc(user.uid)
    item.get().then((doc) => {
      
      var currentUser = doc.data(); 
      ctx.commit('setCurrentUser', currentUser)
      sessionStorage.setItem('isAdmin', currentUser.isAdmin);
    })
  },

  /* */
  addUserToDb(ctx, user) {
    db.collection('users').doc(user.uid).set(user)
  },

  /* Tar bort statusen Admin när du loggar ut */
  removeCurrentUser(ctx) {
    sessionStorage.removeItem('isAdmin');
    ctx.commit('removeCurrentUser');
  },

  /* Sätta ditt namn första gången du loggar in */
  addPlayerName (ctx, name) {
    var uid = this.state.currentUser.uid;
    db.collection('users').doc(uid).update({name:name});
  },
  setNumberOfTeams(ctx, num) {
    ctx.commit('setNumberOfTeams', num);
  },
  setNumberOfGames(ctx, num) {
    ctx.commit('setNumberOfGames', num);
  },
  setNumberOfWin(ctx, num) {
    ctx.commit('setNumberOfWin', num);
  },
  setNumberOfLoss(ctx, num) {
    ctx.commit('setNumberOfLoss', num);
  },
  setNumberOfEqual(ctx, num) {
    ctx.commit('setNumberOfEqual', num);
  },

  /* Lägg till spelare till admins lag */
  submitPlayer(ctx, player) {
    var adminTeam = this.state.currentUser.teams[0];
    db.collection('teams').doc(adminTeam).collection('players').doc(player.uid).set(player);
  },

  /* Lägg till en tillfällig spelare till admins lag */
  addPlayerToDb(ctx, player) {
    var adminTeam = this.state.currentUser.teams[0];
    db.collection('teams').doc(adminTeam).collection('players').doc(player.uid).set(player);
  },

  /* Ta bort en spelare ifrån admins lag */
  removePlayerFromTeam (ctx, player) {
    var adminTeam = this.state.currentUser.teams[0];
    db.collection('teams').doc(adminTeam).collection('players').doc(player).delete();
  },

   /* Ta bort spelaren ifrån store */
   deletePlayer(ctx, player) {
    ctx.commit('deletePlayer', player);
  },
  
  /* Ta bort spelaren ifrån laget */
  deleteGroupPlayer(ctx, payload) {
   ctx.commit('deleteGroupPlayer', payload);
 },

  /* Lägg till spelare till gruppen */
  addGroupPlayer(ctx, payload) {
  ctx.commit('addGroupPlayer', payload);
 },
 
  /* Ändra en spelare ifrån admins lag */
  remakePlayerFromTeam (ctx, player) {
    var adminTeam = this.state.currentUser.teams[0];
    db.collection('teams').doc(adminTeam).collection('players').doc(player.uid).set(player);
  },

  setSelectedTeam(ctx, team) {
    ctx.commit('setSelectedTeam', team)
  },

  /* Sortera spelarna i grupperna */
  submitGroups (ctx, teams) {
    for (var i = 0; i < teams.length; i++) {
      if (teams[i].number === 1) {
        ctx.commit('submitGroupOne', teams[i])
      } else if (teams[i].number === 2) {
        ctx.commit('submitGroupTwo', teams[i])       
      } else if (teams[i].number === 3) {
        ctx.commit('submitGroupThree', teams[i])       
      } else if (teams[i].number === 4) {
        ctx.commit('submitGroupFour', teams[i])      
      } else if (teams[i].number === 5){
        ctx.commit('submitGroupFive', teams[i])   
      } else {
        ctx.commit('submitInactiveGroup', teams[i])
      }
    }
  },

  /* Skapa spelschemat */
  submitSchedules (ctx) {
    var teams = 5; //this.state.numberOfTeams
    var teamArray = []
    
    if(teams %2 !=0) {
      teams++
    } 
   
    var no2 = (teams-1)/2;
    
    var theteams = [];
    for(let i = 0; i<teams; i++) {
      theteams[i] = i+1;
    }
    console.log(theteams)
    var team1;
    var team2;
    var count = 0;

    for(let x = 0; x < 5; x++) {
      for(let j = 0; j<no2; j++) {
        team1 = theteams[Math.ceil(no2 - j -1)]
        team2 = theteams[Math.ceil(no2 + j)]
        count++
        teamArray.push({round: count, nr1: team1, nr2: team2})
      }

    var tmp = theteams[1]

    for(let k = 1; k < theteams.length-1; k++) {
      theteams[k] = theteams[k+1]
    }
      theteams[theteams.length-1] = tmp
    }
    console.log(teamArray)
     
    ctx.dispatch('saveGameDataToDb', teamArray)
  },

  /* Spara grupperna och matcherna i databasen för att kunna hämta */
  saveGameDataToDb (ctx, teams) {
    let groups = this.state.groups;
    var adminTeam = this.state.currentUser.teams[0];
    var gameData = {groups: groups, games: teams}
    db.collection('games').doc(adminTeam).collection('currentGame').doc().set(gameData);
    console.log('Success!')
  },
  
  /* Spara resultaten i databasen */
  saveResult (ctx, payload) {
    console.log(payload)
    let date = new Date()
    var adminTeam = this.state.currentUser.teams[0];
    var gameData = {
      date: date,
      games: payload.winners,
      groups: payload.currentGame
    }
    /* db.collection('games').doc(adminTeam).collection('games').doc().set(gameData); */
  },
  
  /* Räkna ut poäng per spelare */
  calculatePoints (ctx, payload) {
    var adminTeam = this.state.currentUser.teams[0];
    let teamPlayers = this.state.teamPlayers;
    let players = [];

    for(let i = 0; i < payload.length; i++) {
      for(let j = 0; j < teamPlayers.length; j++) {
        if(payload[i].uid === teamPlayers[j].uid) {
          players.push({        
              uid: payload[i].uid, 
              point : teamPlayers[j].point + payload[i].point, 
              win: teamPlayers[j].win + payload[i].win, 
              loss: teamPlayers[j].loss + payload[i].loss, 
              tie: teamPlayers[j].tie + payload[i].tie,
              goal: 0,
              name: teamPlayers[j].name            
          }) 
        }

      }
    }
    var batch = db.batch();

    for(let p = 0; p < players.length; p++) {
      batch.update(db.collection('teams').doc(adminTeam).collection('players').doc(players[p].uid), players[p]);
    }
  
    batch.commit().then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });
    console.log('done')
  }
}