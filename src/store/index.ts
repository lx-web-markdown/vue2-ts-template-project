import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import actions from './actions'
import mutations from './mutations'
import cart from './modules/cart'
import products from './modules/product'

Vue.use(Vuex)

export interface RootState {
  user?: any
}

const storeOptions: StoreOptions<RootState> = {
  state: {},
  getters: {},
  actions,
  mutations,
  modules: {
    cart,
    products
  }
}

export default new Vuex.Store<RootState>(storeOptions)
