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
  },

  /* Skapa spelschemat */
  submitSchedules (ctx) {
    var teams = [1,3,2,4,1,2,4,3]
    ctx.dispatch('saveGameDataToDb', teams)


  },



  /* Spara grupperna och matcherna i databasen för att kunna hämta */
  saveGameDataToDb (ctx, teams) {
    let date = new Date()
    let groups = this.state.groups;
    var adminTeam = this.state.currentUser.teams[0];
    var gameData = {date: date, groups: groups, games: teams}
    db.collection('games').doc(adminTeam).collection('currentGame').doc().set(gameData);
    console.log('Success!')
  }
}


/* 

//Create players
  for (let p=0; p<number; p++) {
    var letter = p+65;
    var k = letter.toString();
    players.push(String.fromCharCode(k));
  };

//Create rounds
for (let i=0; i<number-1; i++) {
  var x = players.pop();
  players.splice(1,0,x);
  var counter = number-1;
  var rounds = [];
  var udda = [];
  for (let i=0; i<number-1; i++) {
    var x = players.pop();
    players.splice(1,0,x);
    var counter = number-1;
    var rounds = [];
    var udda = [];
 //Create opponents
     for (let j=0; j<number/2; j++) {
       if (players[j] !== players[counter]) {
       var matcher = players[j] + " - " + players[counter];
       rounds.push(matcher)
       } else {
       udda.push(players[j])
       }
       counter--;
     }
     output.push(
       `<div class="game-container">
         <h2 class="round">Round ${[i+1]}</h2>
         <p class="games">${rounds.join("")}</p>
         <p class="player-x">Player ${udda} will <br> pass this round</p>
        </div>`
     );
  games.innerHTML = output.join("")
  }
  if(number%2 == 0){
    for (i = 0; i < c.length; i++) {
    c[i].style.display = "none";
    }
  }
};
 */