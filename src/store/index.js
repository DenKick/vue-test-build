import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    openedBasket: false,
    basket: [],
    totalPrice: 0,
  },
  mutations: {
    addItem (state, item) {
      let index = state.basket.findIndex(baseItem => baseItem.id === item.id);
      if (index === -1) {
        state.basket.push({...item, count: 1});
      }
    },
    plusTotalPrice(store, price) {
      store.totalPrice += price;
      console.log('Plus: ', store.totalPrice);
    },
    minusTotalPrice(store, price) {
      store.totalPrice -= price;
      console.log('Minus: ', store.totalPrice);
    },
    deleteItem(state, id) {
      state.basket = state.basket.filter(item => item.id !== id)
    },
    plusCount(state, id) {
      let index = state.basket.findIndex(item => item.id === id);
      if (index >= 0) {
        state.basket[index].count += 1;
      }
    },
    minusCount(state, id) {
      let index = state.basket.findIndex(item => item.id === id);
      if (index >= 0) {
        if (state.basket[index].count > 1) {
          state.basket[index].count -= 1;
        }
      }
    },
    openBasket(state) {
      state.openedBasket = true;
    },
    closeBasket(state) {
      state.openedBasket = false;
    },
    emptyBasket(state) {
      state.basket = [];
      state.totalPrice = 0;
    }
  },
  actions: {

  },
  modules: {
  }
})
