
import db from '@/firebaseInit'

export default {

    getPlayerFromDb(ctx, uid) {
      console.log(uid)
        var item = db.collection('users').doc(uid)
        item.get().then((doc) => {
          var player = doc.data();
          ctx.commit('setPlayer', player)
        })
    },

    async getTeamPlayersFromDb(ctx) {
      var teamPlayers = []
      var item = await db.collection('teams').doc('skogaby').collection('players').orderBy('point')
      await item.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var obj = (doc.id, " => ", doc.data())
          teamPlayers.push(obj)
        })
    })
    
  },

    addUserToDb(ctx, user) {
      console.log(user)
        db.collection('users').doc(user.uid).set(user)

    },

    async setCurrentUser(ctx, user) {
       var item = await db.collection('users').doc(user.uid)
       item.get().then((doc) => {
        var currentUser = doc.data();
       
       console.log(currentUser);   
       ctx.commit('setCurrentUser', currentUser)
       sessionStorage.setItem('isAdmin', currentUser.isAdmin);
   
    })
  },
  
  removeCurrentUser(ctx) {
    sessionStorage.removeItem('isAdmin');
    ctx.commit('removeCurrentUser');

  },

  setSelectedTeam(ctx, selectedTeam) {
    ctx.commit('setSelectedTeam', selectedTeam);
  }
}
