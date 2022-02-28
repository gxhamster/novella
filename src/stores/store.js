import { defineStore } from 'pinia'

export const useStore = defineStore('duebooks', {
  state: () => { 
    return {
      dues: new Array(),
      data_fetched: false
    } 
  },
  actions: {
    setDues(newDues) {
      this.dues = newDues
    },
    setDataFetched(v) {
      this.data_fetched = v
    }
  }
})