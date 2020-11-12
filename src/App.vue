<template>
  <div id="app">
    <Header />
    <Slider :slider-images="sliderImages" :heading="heading" :description="description" />
    <Products />
    <Basket />
    <footer class="footer">

    </footer>
  </div>
</template>

<script>
import Slider from './components/Slider';
import Header from './components/Header';
import Products from './components/Products';
import Basket from './components/Basket';
import store from './store/index';

export default {
  name: 'App',
  store: store,
  components: {
    Slider,
    Header,
    Products,
    Basket
  },
  data() {
    return {
      heading: 'Краски',
      description: 'Идеально подходят для стен и других поверхностей. Найди свой идеальный цвет!',
      sliderImages: [
        {
          id: 1,
          img: require('./assets/slider.png'),
        },
        {
          id: 2,
          img: require('./assets/slider.png'),
        },
        {
          id: 3,
          img: require('./assets/slider.png'),
        },
        {
          id: 4,
          img: require('./assets/slider.png'),
        },
        {
          id: 5,
          img: require('./assets/slider.png'),
        },
        {
          id: 6,
          img: require('./assets/slider.png'),
        },
      ],
    }
  },
  methods: {

  },
  computed: {

  }
}
</script>

<style lang="scss">
* {
  background: none;
  border: none;
  outline: none;
  list-style: none;
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.footer {
  background-color: #000000;
  width: 100%;
  height: 200px;

  @media all and (max-width: 700px){
    height: 100px;
  }
}
</style>
