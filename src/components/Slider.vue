<template>
  <div class="slider">
    <button class="slider__next-button"
            v-on:click="handleNextClick"
            v-if="activeSlideIndicator !== sliderImages.length">
      <img :src="require('../assets/arrow.png')" alt="Next Image">
    </button>
    <button class="slider__prev-button"
            v-if="activeSlideIndicator !== 1"
            v-on:click="handlePrevClick">
      <img :src="require('../assets/arrow.png')" alt="Previous Image">
    </button>
    <div class="slider__body" :style="'margin-left:' + sliderOffset + 'vw'">
      <img v-for="slide in sliderImages" :src="slide.img" alt="Slider Image" v-bind:key="slide.id">
    </div>
    <div v-if="heading || description" class="slider__text">
      <span v-if="heading" class="slider__heading">{{heading}}</span>
      <span v-if="description" class="slider__description">{{description}}</span>
    </div>
    <div class="slider__indicator">
      <div class="slider__active-indicator" v-on:click="handleIndicatorClick(number)" v-for="number in indicatorCounts" v-bind:key="number">
        <div class="active" v-if="number === activeSlideIndicator"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Slider",
  data() {
    return {
      sliderOffset: 0,
      activeSlideIndicator: 1,
    }
  },
  methods: {
    handleNextClick() {
      if (this.sliderOffset === (this.sliderImages.length - 1) * -100) {
        this.sliderOffset = 0;
        this.activeSlideIndicator = 1;
      } else {
        this.sliderOffset -= 100;
        this.activeSlideIndicator += 1;
      }
    },
    handlePrevClick() {
      this.sliderOffset += 100;
      this.activeSlideIndicator -= 1;
    },
    handleIndicatorClick(id) {
      this.activeSlideIndicator = id;
      this.sliderOffset = (id - 1) * -100;
    }
  },
  computed: {
    indicatorCounts: function () {
      return this.sliderImages.length;
    },
  },
  props: {
    sliderImages: Array,
    heading: String,
    description: String,
  }
}
</script>

<style lang="scss" scoped>
.slider {
  position: relative;


  @media all and (max-width: 1080px) {
    display: none;
  }

  &__body {
    display: flex;
    overflow: hidden;
    transition: .3s linear;

    margin: 10vh 0 0 0;

    img {
      width: 100vw;
    }
  }

  &__next-button, &__prev-button {
    transition: .3s linear;

    position: absolute;

    width: 50px;
    height: 100px;
  }

  &__next-button {
    top: 50%;
    right: 10%;
    transform: translate(-50%, -50%);
  }

  &__prev-button {
    top: 50%;
    left: 10%;
    transform: translate(-50%, -50%) rotateY(180deg);
  }

  &__next-button:hover, &__prev-button:hover {
    cursor: pointer;
  }

  &__text {
    color: #fff;

    display: flex;
    flex-direction: column;
    text-align: center;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    width: 430px;

    @media all and (max-width: 1280px) {
      text-align: right;
      width: 380px;
    }
  }

  &__heading {
    font-size: 72px;
    font-weight: 400;
    line-height: 63px;

    margin: 0 0 24px 0;
  }

  &__description {
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
  }

  &__indicator {
    display: flex;
    flex-direction: row;

    position: absolute;
    left: 50%;
    bottom: 5%;
    transform: translate(-50%, -50%);

    padding: 13px 20px;

    border-radius: 16px;
    background-color: #00000066;
  }

  &__indicator:hover {
    cursor: pointer;
  }

  &__active-indicator {
    background-color: #ffffff33;
    border-radius: 50%;

    margin: 0 4px;

    height: 6px;
    width: 6px;

    .active {
      background-color: #fff;
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
}
</style>