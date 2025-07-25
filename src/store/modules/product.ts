import { Module } from 'vuex'
import { RootState } from '../index'

export interface ProductState {
  all: any[]
}

const state: ProductState = {
  all: []
}

const mutations = {
  setProducts(state: ProductState, products: any[]) {
    state.all = products
  }
}

const actions = {
  async fetchProducts({ commit }: any) {
    // 假设有API
    const res = await fetch('/api/products')
    const products = await res.json()
    commit('setProducts', products)
  }
}

const getters = {
  allProducts: (state: ProductState) => state.all
}

const products: Module<ProductState, RootState> = {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

export default products
