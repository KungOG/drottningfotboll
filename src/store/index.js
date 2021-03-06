import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import touch from 'vue2-touch-events'

Vue.use(Vuex, touch)
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})