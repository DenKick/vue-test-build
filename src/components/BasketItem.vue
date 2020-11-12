<template>
  <div class="basket__item" :style="`display: ${computeDisplay}`">
    <div class="item__photo">
      <img :src="getImage" :alt="name">
    </div>
    <div class="item__info">
      <span>{{name}}</span>
      <span>{{calculatePrice}}</span>
    </div>
    <div class="item__count">
      <button v-on:click="minusCount(id, price)">-</button>
      <span>{{count}}</span>
      <button v-on:click="plusCount(id, price)">+</button>
    </div>
    <div class="item__delete">
      <button v-on:click="deleteItem(id)">X</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "BasketItem",
  props: {
    id: Number,
    name: String,
    photo: String,
    price: Number,
    count: Number,
  },
  computed: {
    computeDisplay() {
      return this.$store.state.openedBasket ? 'flex' : 'none';
    },
    getImage() {
      return require(`../assets/products/${this.photo}`);
    },
    calculatePrice() {
      return `${this.price * this.count} ₽`;
    },
  },
  methods: {
    deleteItem(id) {
      this.$store.commit('deleteItem', id);
      this.$store.commit('minusTotalPrice', this.price * this.count);
    },
    plusCount(id, price) {
      this.$store.commit('plusCount', id);
      this.$store.commit('plusTotalPrice', price)
    },
    minusCount(id, price) {
      if (this.count > 1) {
        this.$store.commit('minusCount', id);
        this.$store.commit('minusTotalPrice', price)
      } else if (this.count === 1){
        this.$store.commit('deleteItem', id);
        this.$store.commit('minusTotalPrice', price)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.basket__item {
  border-bottom: 1px solid #00000030;
  justify-content: space-between;
  padding: 12px 0;

  width: 100%;
}

.item {
  &__photo {
    img {
      object-fit: contain;

      height: 100px;
      width: 100px;

      @media all and (max-width: 600px) {
        height: 80px;
        width: 80px;
      }
    }


  }

  &__info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;

    width: 165px;

    :nth-child(2) {
      font-weight: 600;
    }

    @media all and (max-width: 535px) {
      font-size: 14px;
      width: 150px;
    }
  }

  &__count {
    display: flex;
    justify-content: space-between;

    align-self: center;
    width: 130px;

    @media all and (max-width: 535px) {
      flex-direction: column-reverse;
      gap: 1vh;
      text-align: center;
      width: auto;
    }

    button {
      background-color: #f2f2f2;
      border-radius: 4px;

      font-size: 16px;

      height: 24px;
      width: 40px;

      @media all and (max-width: 535px) {
        font-size: 14px;
        height: 20px;
        width: 30px;
      }
    }
  }

  &__delete {
    align-self: center;

    button {
      color: #e5e5e5;
      font-size: 18px;
    }

    @media all and (max-width: 535px) {
      display: none;
    }

    button:hover {
      cursor: pointer;
    }
  }
}
</style>