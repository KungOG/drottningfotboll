
import db from '@/firebaseInit'

export default {

    getPlayerFromDb(ctx) {
        var item = db.collection('teams').doc('skogaby').collection('players').doc('gcQSGVJISJslv3YKrqNN')
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
    ctx.commit('setTeamPlayers', teamPlayers)
  },

    addPlayerToDb(ctx, user) {
      console.log(user)
        db.collection('users').doc(user.uid).set(user)

    }
}
