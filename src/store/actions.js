
import db from '@/firebaseInit'

export default {

  async firestoreTeams(ctx) {
      var teams = await db.collection('test').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
          console.log(doc.data())
        })
      })
      console.log(teams)
      ctx.commit('setTeams', teams)
    }



}
