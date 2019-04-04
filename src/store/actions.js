
import db from '@/firebaseInit'

export default {

    getPlayerFromDb(ctx) {
        var item = db.collection('teams').doc('skogaby').collection('players').doc('gcQSGVJISJslv3YKrqNN')
        item.get().then((doc) => {
          var player = doc.data();
          ctx.commit('setPlayer', player)
        })
    }
}
