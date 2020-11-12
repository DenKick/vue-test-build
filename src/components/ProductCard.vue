<template>
  <div class="product">
    <img :src="getImage" :alt="name">
    <span>{{name}}</span>
    <div>
      <span>{{showPrice}}</span>
      <button v-on:click="addToBasket({id, photo, name, price})" class="product__add-btn">+</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    id: Number,
    photo: String,
    name: String,
    price: Number,
  },
  computed: {
    showPrice() {
      return `${this.price} ₽`
    },
    getImage() {
      return require(`../assets/products/${this.photo}`)
    }
  },
  methods: {
    addToBasket(item) {
      this.$store.commit("addItem", item)
      this.$store.commit('plusTotalPrice', this.price);
    }
  }
}
</script>

<style lang="scss" scoped>
.product {
  border-bottom: 1px solid #00000020;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2vh;
  width: 278px;

  @media all and (max-width: 700px) {
    width: 156px;
  }

  @media all and (max-width: 370px) {
    font-size: 14px;
    width: 136px;
  }

  img {
    object-fit: none;
    width: 278px;

    @media all and (max-width: 700px) {
      object-fit: contain;
      width: 156px;
    }

    @media all and (max-width: 370px) {
      width: 136px;
    }
  }

  div {
    display: flex;
    justify-content: space-between;

    padding: 16px 0;

    span {
      align-self: center;
      font-size: 16px;
      font-weight: 600;
    }

    .product__add-btn {
      background-color: #7bb899;
      border-radius: 8px;
      font-size: 26px;
      opacity: 0;

      transition: .3s ease-in;

      height: 35px;
      width: 80px;

      @media (orientation: portrait) {
        opacity: 1;
      }

      @media all and (max-width: 700px) {
        background-color: #f2f2f2;
        width: 40px;
      }
    }

    .product__add-btn:hover {
      background-color: #42b983;
      cursor: pointer;
    }
  }
}
.product:hover {
  .product__add-btn {
    opacity: 1;
  }
}

</style>