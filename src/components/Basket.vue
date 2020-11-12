<template>
  <div>
    <div v-on:click="closeBasket" class="full-width-container" :style="`width: ${computeWidthMain}; background-color: ${computeColor}`">
    </div>
    <div :class="`basket ${computeWidth}`">
      <div class="basket__container">
        <div class="basket__heading">
          <span>Корзина</span>
          <button v-on:click="closeBasket" class="basket__close-btn">X</button>
        </div>
        <div class="basket__empty" v-if="basketItemsCount === 0">
          <span>В корзине нет товаров</span>
        </div>
        <div class="basket__not-empty" v-else>
          <div class="basket__not-empty__heading">
            <span class="basket__basket-count">{{basketItemsCount}} товара</span>
            <button v-on:click="emptyBasket" class="basket__clear-btn">Очистить список</button>
          </div>
          <div class="basket__order-container">
            <BasketItem v-for="item in basketItems" :id="item.id" :name="item.name" :photo="item.photo" :price="item.price" :count="item.count" :key="item.id"/>
          </div>
          <div class="basket__to-order">
            <div class="basket__total-price">
              <span>Итого</span>
              <span>{{computeTotalPrice}}</span>
            </div>
            <button class="basket__order-btn">Оформить заказ</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BasketItem from "./BasketItem";

export default {
  name: "Basket",
  components: {
    BasketItem
  },
  computed: {
    computeWidth() {
      return this.$store.state.openedBasket ? 'opened' : 'closed';
    },
    computeWidthMain() {
      return this.$store.state.openedBasket ? '100%' : 0;
    },
    computeColor() {
      return this.$store.state.openedBasket ? '#00000070' : '#00000000';
    },
    basketItemsCount() {
      return this.$store.state.basket.length;
    },
    basketItems() {
      return this.$store.state.basket;
    },
    computeTotalPrice() {
      return `${this.$store.state.totalPrice} ₽`;
    }
  },
  methods: {
    closeBasket() {
      this.$store.commit('closeBasket');
    },
    emptyBasket() {
      this.$store.commit('emptyBasket')
    }
  }
}
</script>

<style lang="scss" scoped>
.full-width-container {
  transition: background-color .1s ease-in;

  position: fixed;
  top: 0;
  left: 0;

  height: 100%;
  width: 100%;
}

.opened {
  height: 100%;
  width: 600px;

  @media all and (max-width: 600px) {
    width: 100%;
  }

  @media (orientation: landscape) and (max-width: 1000px) {
    width: 100%;
  }
}

.closed {
  height: 0;
  width: 0;
}

.basket {
  background-color: #ffffff;
  position: fixed;
  top: 0;
  right: 0;

  overflow-y: scroll;

  transition: .1s linear;

  z-index: 2;

  &__container {
    padding: 5% 40px 5% 40px;
  }

  &__heading {
    display: flex;
    justify-content: space-between;

    span {
      align-self: center;
      font-size: 30px;
      font-weight: 500;
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    margin: 50px 0;

    height: 90%;
  }

  &__not-empty {
    display: flex;
    flex-direction: column;
    height: 80vh;

    &__heading {
      border-bottom: 1px solid #00000050;
      display: flex;
      justify-content: space-between;

      margin: 80px 0 0 0;
      padding: 10px 0;
    }
  }

  &__order-container {
    margin: 0 0 20px 0;
  }

  &__basket-count {
    font-size: 14px;
  }

  &__to-order {
    display: flex;
    justify-content: space-between;

    margin: auto 0 20px 0;
  }

  &__total-price {
    display: flex;
    flex-direction: column;

    :nth-child(2) {
      font-size: 30px;
      font-weight: 500;
    }
  }

  &__order-btn {
    background-color: #7bb899;
    border-radius: 4px;
    width: 40%;

    &:hover {
      cursor: pointer;
    }
  }

  &__clear-btn {
    color: #1f202070;
    font-size: 14px;
    font-weight: 300;
    text-transform: lowercase;
  }

  &__close-btn {
    border-radius: 50%;
    border: 1px solid #00000030;
    cursor: pointer;
    font-size: 20px;

    height: 50px;
    width: 50px;
  }
}

.basket::-webkit-scrollbar {
  width: 0;
}
</style>