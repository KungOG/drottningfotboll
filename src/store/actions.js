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
  }
}
