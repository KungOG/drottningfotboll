import db from '@/firebaseInit'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
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
    var selectedTeam = this.state.selectedTeam;
    var teamPlayers = []
    var item = await db.collection('teams').doc(selectedTeam).collection('players')
    await item.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var obj = (doc.id, " => ", doc.data())
        teamPlayers.push(obj)
      })
    })
    ctx.commit('setTeamPlayers', teamPlayers)
  },

  /* Hämta admins spelare för player lista */
  async setAdminTeamPlayers(ctx) {
    var adminTeam = this.state.adminUser.team;
    var adminTeamPlayers = []
    var item = await db.collection('teams').doc(adminTeam).collection('players')
    await item.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var obj = (doc.id, " => ", doc.data())
        adminTeamPlayers.push(obj)
      })
    })
    ctx.commit('setAdminTeamPlayers', adminTeamPlayers)
  },

  /* Hämtar din info som användare */
  async setCurrentUser(ctx, user) {
    var item = await db.collection('users').doc(user.uid)
    item.get().then((doc) => {
      
      var currentUser = doc.data(); 
      ctx.commit('setCurrentUser', currentUser)
    })
  },

  /* Hämta info som Admin */
  async setAdminUser(ctx, adminUser) {
    var item = await db.collection('admins').doc(adminUser.uid)
    item.get().then((doc) => {
      
      var adminUser = doc.data(); 
      ctx.commit('setAdminUser', adminUser)
    })
  },

  /* Hämta info som SuperAdmin */
  async setSuperAdmin(ctx, superAdminUser) {
    var item = await db.collection('superAdmin').doc(superAdminUser.uid)
    item.get().then((doc) => {
      
      var superAdminUser = doc.data(); 
      ctx.commit('setSuperAdmin', superAdminUser)
    })
  },

  /* Spara användaren i Databasen */
  addUserToDb(ctx, user) {
    db.collection('users').doc(user.uid).set(user)
  },

  /* Tar bort statusen user när du loggar ut */
  removeCurrentUser(ctx) {
    ctx.commit('removeCurrentUser');
  },

  /* Tar bort statusen Admin när loggar ut */
  removeCurrentAdminUser(ctx) {
    ctx.commit('removeCurrentAdminUser');
  },

  /* Ändrar aktiv sida */
  activeSlide(ctx, activeSlide) {
    ctx.commit('activeSlide', activeSlide);
  },

  /* Sätta ditt namn första gången du loggar in */
  addPlayerName (ctx, payload) {
    var uid = this.state.currentUser.uid;
    let player = {
      name: payload.name,
      goal: 0,
      win: 0,
      loss: 0,
      point: 0,
      tie: 0,
      uid: uid
    }
    db.collection('users').doc(uid).update({name: payload.name});
    db.collection('teams').doc(payload.team).collection('players').doc(uid).set(player);
    db.collection('users').doc(uid).update({
      teams: firebase.firestore.FieldValue.arrayUnion(payload.team)
    })
  },

  setLoginNumber(ctx, num) {
    ctx.commit('setLoginNumber', num)
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
    var adminTeam = this.state.adminUser.team;
    db.collection('teams').doc(adminTeam).collection('players').doc(player.uid).set(player);
  },

  /* Lägg till lag i användarens lag-array */
  updateUserTeamArray(ctx, payloadUid) {
    var adminTeam = this.state.adminUser.team;
    db.collection('users').doc(payloadUid).update({
      teams: firebase.firestore.FieldValue.arrayUnion(adminTeam)
    })
  },

  /* Ta bort laget i användarens lag-array */
  removeUserTeamArray(ctx, payloadUid) {
    var adminTeam = this.state.adminUser.team;
    db.collection('users').doc(payloadUid).update({
      teams: firebase.firestore.FieldValue.arrayRemove(adminTeam)
    })
  },

  /* Lägg till en tillfällig spelare till admins lag */
  addPlayerToDb(ctx, player) {
    var adminTeam = this.state.adminUser.team;
    db.collection('teams').doc(adminTeam).collection('players').doc(player.uid).set(player);
  },

  /* Ta bort en spelare ifrån admins lag */
  removePlayerFromTeam (ctx, player) {
    var adminTeam = this.state.adminUser.team;
    db.collection('teams').doc(adminTeam).collection('players').doc(player).delete();
  },

  /* Ta bort en spelare ifrån admins lag */
  async removeUserFromTeam (ctx) {
    var uid = this.state.currentUser.uid;
    var user = this.state.currentUser.teams;
    await user.forEach((team) => {  
      db.collection('teams').doc(team).collection('players').doc(uid).delete();
    }) 
  },

  removeUser (ctx) {
    var user = this.state.currentUser.uid;
    db.collection('users').doc(user).delete();
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
    var adminTeam = this.state.adminUser.team;
    db.collection('teams').doc(adminTeam).collection('players').doc(player.uid).set(player);
  },

  /* Koppla samman tillfällig spelare med registrerad spelare */
  mergeUpdatedPlayer (ctx, payload) {
    var adminTeam = this.state.adminUser.team;
    var update = {        
      uid: payload.player1.uid, 
      point : payload.player1.point + payload.player2.point, 
      win: payload.player1.win + payload.player2.win, 
      loss: payload.player1.loss + payload.player2.loss, 
      tie: payload.player1.tie + payload.player2.tie,
      goal: payload.player1.goal + payload.player2.goal,
      name: payload.player1.name            
    }
    db.collection('teams').doc(adminTeam).collection('players').doc(payload.player1.uid).set(update);
    db.collection('teams').doc(adminTeam).collection('players').doc(payload.player2.uid).delete();
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

  /* Hämta alla spel ifrån ett specifikt lag */
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
  
  /* Spara grupperna och matcherna i databasen för att kunna hämta */
  saveGameDataToDb (ctx, teams) {
    let groups = this.state.groups;
    var adminTeam = this.state.adminUser.team;
    var gameData = {groups: groups, games: teams}
    db.collection('games').doc(adminTeam).collection('currentGame').doc('1').set(gameData);
  },
  
  /* Spara resultaten i databasen */
  saveResult (ctx, payload) {
    let newDate = new Date()   
    var date = newDate.toISOString().slice(0, 10);
    let atime = newDate.toISOString().slice(11, 13);
    let btime = newDate.toISOString().slice(14, 16);
    let correctTime = Number(atime) + 2;
    let ctime = correctTime + btime;
    let time = parseInt(ctime);
    
    var adminTeam = this.state.adminUser.team;
    var gameData = {
      date: date,
      time: time,
      games: payload.winners,
      groups: payload.currentGame
    }
     db.collection('games').doc(adminTeam).collection('games').doc().set(gameData); 
  },
  
 /* Nollställ spelarnas statistik i specifika laget */
 resetTeam (ctx, payload) {
   let players = [];
  for(let i = 0; i < payload.teamPlayers.length; i++) {
      players.push({        
      uid: payload.teamPlayers[i].uid, 
      name: payload.teamPlayers[i].name,            
      point : 0, 
      win: 0, 
      loss: 0, 
      tie: 0,
      goal: 0
    }) 
  }
  var batch = db.batch();

  for(let p = 0; p < players.length; p++) {
    batch.update(db.collection('teams').doc(payload.teamName).collection('players').doc(players[p].uid), players[p]);
  }  
  batch.commit().then(function() {
    console.log("Document successfully written!");
  })
  .catch(function(error) {
    console.error("Error writing document: ", error);
  });
    console.log('done')
},

  /* Addera spelarnas nya poäng med de gamla */
  calculatePoints (ctx, payload) {
    var adminTeam = this.state.adminUser.team;
    let teamPlayers = this.state.adminTeamPlayers;
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
              goal: teamPlayers[j].goal + payload[i].goal,
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
  },

  getTeamPlayers(ctx) {
    var teamPlayers = []
    var item = db.collection('teams').doc(this.state.selectedTeam).collection('players').orderBy('point')
      item.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var obj = (doc.id, " => ", doc.data())
          teamPlayers.push(obj)
          
       })
     })
    ctx.commit('setTeamPlayers', teamPlayers)  
  }
}