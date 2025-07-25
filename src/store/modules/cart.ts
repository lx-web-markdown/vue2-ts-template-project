import { Module } from 'vuex'
import { RootState } from '../index'

export interface CartState {
  items: any[]
}

const state: CartState = {
  items: []
}

const mutations = {
  addToCart(state: CartState, product: any) {
    state.items.push(product)
  },
  clearCart(state: CartState) {
    state.items = []
  }
}

const actions = {
  addProductToCart({ commit }: any, product: any) {
    commit('addToCart', product)
  },
  clearCart({ commit }: any) {
    commit('clearCart')
  }
}

const getters = {
  cartItemCount: (state: CartState) => state.items.length,
  cartItems: (state: CartState) => state.items
}

const cart: Module<CartState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default cart
