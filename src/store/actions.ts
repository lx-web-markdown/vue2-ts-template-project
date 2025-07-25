import { ActionTree } from 'vuex'
import { RootState } from './index'

const actions: ActionTree<RootState, RootState> = {
  async fetchUser({ commit }, userId: string) {
    // 假设有API
    const res = await fetch(`/api/user/${userId}`)
    const data = await res.json()
    commit('setUser', data)
  }
}

export default actions
