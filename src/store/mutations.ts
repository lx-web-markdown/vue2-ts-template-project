import { MutationTree } from 'vuex'
import { RootState } from './index'

const mutations: MutationTree<RootState> = {
  setUser(state, user: any) {
    state.user = user
  }
}

export default mutations
