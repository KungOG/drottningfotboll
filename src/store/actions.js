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

  /* Spara användaren i Databasen */
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

  /* Valen i skapandet av spelet */
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

  /* Ta bort spelare från annan grupp */
  removeGroupPlayer(ctx, payload) {
    ctx.commit('removeGroupPlayer', payload);
  },

  /* Töm grupperna innan grupperna görs */
  clearGroups(ctx) {
    ctx.commit('clearGroups');
  }, 

  /* Ändra en spelare ifrån admins lag */
  remakePlayerFromTeam (ctx, player) {
    var adminTeam = this.state.currentUser.teams[0];
    db.collection('teams').doc(adminTeam).collection('players').doc(player.uid).set(player);
  },

  /* Valt lag av användaren */
  setSelectedTeam(ctx, team) {
    ctx.commit('setSelectedTeam', team)
  },

  /* Hämta senste spelet */
  getCurrentGame(ctx) {
    var selectedTeam = this.state.selectedTeam;
    var item = db.collection('games').doc(selectedTeam).collection('currentGame').doc('1')     
    item.get().then((doc) => {
        var game = doc.data()
        ctx.commit('setCurrentGame', game)
    })
  },

  /* Hämta data ifrån ett specifikt lag */
  async specificTeamData (ctx) {
    var selectedTeam = this.state.selectedTeam;
    var games = [];
    var item = await db.collection('games').doc(selectedTeam).collection('games')
    await item.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var obj = (doc.id, " => ", doc.data())
        games.push(obj)
      })
    })  
    ctx.commit('setSpecificTeamData', games)  
  },

  /* Spara antal, lag, spel och poäng i local storage */
  setGameSettings() {
    let settings = {
      numberOfGames: this.state.numberOfGames,
      numberOfTeams: this.state.numberOfTeams,
      numberOfWin: this.state.numberOfWin,
      numberOfEqual: this.state.numberOfEqual,
      numberOfLoss: this.state.numberOfLoss
    }
    localStorage.setItem('gameSettings', JSON.stringify(settings));
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

    let teams = this.state.numberOfTeams;
    let games = this.state.numberOfGames;
    let counter = 1;
    let schedule = [];
    let teamsArray = [];
 
    /* Gör en array med antal lag */
    for(let i = 0; i<teams; i++) {
      teamsArray[i] = i+1;
    }  
    /* Sätt ihop vem som möter vem */
    for(let i = 0; i < teamsArray.length-1; i++) {      
      for(let j = counter; j < teamsArray.length; j++) {
        var num1 = teamsArray.slice(i,i+1)
        var num2 = teamsArray.slice(j,j+1)
        for(let g = 0; g < games; g++) {  
          if(g % 2 ) {
            schedule.push({round: 0, home: {groupNr: num1[0], win: 0}, away: {groupNr: num2[0], win:0}})            
          } else {
            schedule.push({round: 0, home: {groupNr: num2[0], win: 0}, away: {groupNr: num1[0], win: 0}})
          }
        }
      }
      counter++;
    }    
    /* Shuffla arrayen */
    var j, x, i;
    for (i = schedule.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = schedule[i];
        schedule[i] = schedule[j];
        schedule[j] = x;
    }    
    /* Addera roundnummer  */ 
    for(let i = 0; i < schedule.length; i++) {
      schedule[i].round = i+1;
    }    
   
    ctx.dispatch('saveGameDataToDb', schedule) 
  },

  /* Spara grupperna och matcherna i databasen för att kunna hämta */
  saveGameDataToDb (ctx, teams) {
    let groups = this.state.groups;
    var adminTeam = this.state.currentUser.teams[0];
    var gameData = {groups: groups, games: teams}
    db.collection('games').doc(adminTeam).collection('currentGame').doc('1').set(gameData);
    console.log('Success!')
  },
  
  /* Spara resultaten i databasen */
  saveResult (ctx, payload) {
    let newDate = new Date()    
    var date = newDate.toISOString().slice(0,10);
    let time = newDate.toISOString().slice(11, 16);

    var adminTeam = this.state.currentUser.teams[0];
    var gameData = {
      date: date,
      time: time,
      games: payload.winners,
      groups: payload.currentGame
    }
     db.collection('games').doc(adminTeam).collection('games').doc().set(gameData); 
  },
  
  /* Addera spelarnas nya poäng med de gamla */
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
  },

  /* Spara datumet och tiden i Store och Mutations */
  saveDate(ctx, payload) {
    ctx.commit('setDate', payload)
  },
  saveTime(ctx, payload) {
    ctx.commit('setTime', payload)
  }
}