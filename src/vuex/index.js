import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import url from '../modules/js/api.js'
import axios from 'axios'

const store = new Vuex.Store({
  state: {
    lists: null
  },
  mutations: {
    init(state,lists) {
      state.lists = lists
    },
    add(state,instance) {
      state.lists.push(instance)
    },
    update(state,instance) {
      let lists = state.lists
      let index = lists.findIndex(list => {
        return list.id === instance.id
      })
      Object.assign(lists[index],instance)
      state.lists = lists
    },
    remove(state,id) {
      let index = state.lists.findIndex(list => {
        return list.id = id
      })
      state.lists.splice(index,1)
    },
    setDefault(state,id) {
      state.lists.map(list => {
        if(list.id === id) {
          list.isDefault = true
        }else {
          list.isDefault = false
        }
      })
    }
  },
  actions: {
    getLists({commit}) {
      axios.get(url.addressLists).then(res => {
        commit('init',res.data.lists)
      })
    },
    addAddress({commit},instance) {
      instance.id = parseInt(Math.random()*10000)
      axios.post(url.addressAdd,instance).then( res =>{
        commit('add',instance)
      })
    },
    updateAddress({commit},instance) {
      axios.post(url.addressUpdate,instance).then(res => {
        commit('update',instance)
      })
    },
    removeAddress({commit},id) {
      axios.post(url.addressRemove,id).then(res => {
        commit('remove',id)
      })
    },
    setDefaultAddress({commit},id) {
      axios.post(url.addressSetDefault,id).then(res => {
        commit('setDefault',id)
      })
    }
  }
})

export default store
