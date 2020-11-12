<template>
  <div class="products-container">
    <div class="products-filter">
      <FilterItem v-for="filter in filters" :key="filter.id" :id="filter.id" :name="filter.name" v-on:click.native="showSale(filter.id)"/>
    </div>
    <div>
      <div class="products-sort">
        <span class="products__count">{{calculateItemsCount}}</span>
        <div class="products__mobile-filter">
          <span v-on:click="showMobileFilter = true">Фильтры</span>
        </div>
        <div class="dropdown">
          <div v-on:click="isDropdownActive = !isDropdownActive">
            <span>{{selectedSort.name}}</span>
            <div class="dropdown__arrow"></div>
          </div>
          <div v-if="isDropdownActive" :class="`dropdown-full ${calculateDropdownClass}`">
            <span v-for="sort in sorts" :key="sort.key" v-on:click="selectSort(sort)">
              {{sort.name}}
            </span>
          </div>
        </div>
      </div>
      <div class="products">
        <ProductCard v-for="product in products"
                     :key="product.id"
                     :id="product.id"
                     :name="product.name"
                     :photo="product.photo"
                     :price="product.price"
        />
      </div>
    </div>
    <div v-if="isDropdownActive" v-on:click="isDropdownActive = !isDropdownActive" class="background-opened-dropdown"></div>
    <div :class="`mobile-filter ${calculateMobileFilterClass}`">
      <FilterItem v-for="filter in filters" :key="filter.id" :id="filter.id" :name="filter.name" v-on:click.native="showSale(filter.id)"/>
    </div>
    <div v-if="showMobileFilter" v-on:click="showMobileFilter = !showMobileFilter" class="background-opened-dropdown"></div>
  </div>
</template>

<script>
import ProductCard from "./ProductCard";
import FilterItem from "./FilterItem";
import products from '../store/products';

export default {
  name: "Products",
  components: {
    ProductCard,
    FilterItem
  },
  data() {
    return {
      filters: [{id: 'new', name: 'Новинки'},
        {id: 'presence', name: 'Есть в наличии'},
        {id: 'contract', name: 'Контрактные'},
        {id: 'exclusive', name: 'Экслюзивные'},
        {id: 'sale', name: 'Распродажа'},],
      sorts: [{key: 'expensive', name: 'Сначала дорогие'}, {key: 'cheap', name: 'Сначала дешевые'}],
      allProducts: products,
      products: products,
      selectedSort: {key: 'expensive', name: 'Сначала дорогие'},
      isDropdownActive: false,
      showMobileFilter: false,
    }
  },
  watch: {
    selectedSort(n) {
      this.showSorted(n);
    }
  },
  computed: {
    calculateItemsCount() {
      return `${this.products.length} товаров`
    },
    calculateDropdownClass() {
      return this.isDropdownActive ? 'open' : 'close';
    },
    calculateMobileFilterClass() {
      return this.showMobileFilter ? 'opened' : 'closed';
    }
  },
  methods: {
    selectSort(sort) {
      this.isDropdownActive = false;
      this.selectedSort = sort;
    },
    showSale(filter) {
      switch(filter) {
        case 'new':
          this.products = this.allProducts.filter(item => item.new === true);
          break;
        case 'presence':
          this.products = this.allProducts.filter(item => item.presence === true);
          break;
        case 'contract':
          this.products = this.allProducts.filter(item => item.contract === true);
          break;
        case 'exclusive':
          this.products = this.allProducts.filter(item => item.exclusive === true);
          break;
        case 'sale':
          this.products = this.allProducts.filter(item => item.sale === true);
          break;
        default:
          break;
      }
    },
    showSorted(sort) {
      switch(sort.key) {
        case 'expensive':
          this.products.sort((a, b) => b.price - a.price);
          break;
        case 'cheap':
          this.products.sort((a, b) => a.price - b.price);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.background-opened-dropdown {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #00000050;

  z-index: 3;
}

.products-container {
  display: flex;

  @media (orientation: landscape) and (max-width: 1000px) {
    padding: 15vh 3.3vw 3.3vw 3.3vw;
  }

  @media (max-width: 1080px) {
    padding: 10vh 3.3vw 3.3vw 3.3vw;
  }
}
.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  gap: 2vw;
  padding: 3.3vw 0;

  @media all and (max-width: 700px) {
    gap: 2vw;
  }
}

.products-filter {
  display: flex;
  flex-direction: column;

  padding: 64px;

  height: 100%;

  @media (max-width: 1025px) {
    display: none;
  }
}

.products__count {
  @media (max-width: 1025px) {
    display: none;
  }
}

.products__mobile-filter {
  @media (min-width: 1025px) {
    display: none;
  }
}

.products-sort {
  display: flex;
  justify-content: space-between;
  padding: 72px 3.3vw 0 0;

  span {
    font-size: 12px;
    text-transform: uppercase;
    margin-right: 10px;
  }

  @media (max-width: 1025px) {
    padding: 72px 0 0 0;
  }
}

.dropdown {
  display: flex;
  flex-direction: row;
  position: relative;

  cursor: pointer;

  span {
    display: inline-block;
  }

  &__arrow {
    align-self: center;
    display: inline-block;
    width: 0;
    height: 0;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 6px solid #000;
  }
}

.dropdown-full {
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: column;

  margin: -10px -24px;

  z-index: 4;

  span {
    background-color: #fff;
    padding: 10px 24px;
    cursor: pointer;

    &:hover {
      background-color: #7bb899;
    }
  }
}

.mobile-filter {
  position: fixed;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 30px;
  align-items: center;
  transition: .3s linear;

  z-index: 4;
}

.opened {
  top: 25%;
  left: 0;
  right: 0;
  bottom: 0;
}

.closed {
  top: 100vh;
  left: 0;
  right: 0;
  bottom: 0;
}

</style>