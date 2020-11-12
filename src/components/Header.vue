<template>
  <header class="header">
    <div class="header__mobile-menu">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="header__main-menu">
      <a href="#">
        <img class="header__logo" src="../assets/logo.png" alt="Logo Image"/>
      </a>
      <ul>
        <li><a href="#">Продукты</a></li>
        <li><a href="#">Цвета</a></li>
        <li><a href="#">Вдохновение</a></li>
        <li><a href="#">Советы</a></li>
        <li><a href="#">Найти магазин</a></li>
      </ul>
    </div>
    <div class="header__submenu">
      <div class="header__contact">
        <span class="header__phone">+7 (495) 221-77-69</span>
        <span class="header__call">Заказать звонок</span>
      </div>
      <ul class="header__user-menu">
        <li>
          <a href="#" title="Поиск">
            <img src="../assets/search.png" alt="Search Button"/>
          </a>
        </li>
        <li>
          <a href="#" title="Профиль">
            <img src="../assets/profile.png" alt="Profile Button"/>
          </a>
        </li>
        <li>
          <a href="#" title="Избранное">
            <img src="../assets/heart.png" alt="Search Button"/>
          </a>
        </li>
        <li>
          <button v-on:click="openBasket">{{ basketItemsCount }}</button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  computed: {
    basketItemsCount: function () {
      return this.$store.state.basket.length;
    }
  },
  methods: {
    openBasket() {
      this.$store.commit('openBasket');
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  background-color: #ffffff;

  position: fixed;
  top: 0;
  left: 0;

  height: 10vh;
  width: 100%;

  z-index: 1;

  @media (orientation: landscape) and (max-width: 1000px) {
    height: 15vh;
  }

  &__mobile-menu {
    display: none;

    @media all and (max-width: 1025px) {
      display: block;

      margin: 0 0 0 3.3vh;

      div {
        background-color: #1f2020;

        margin: 4px;

        height: 2px;
        width: 24px;
      }
    }
  }

  &__submenu {
    display: flex;
    flex-direction: row;
    align-items: center;

    @media all and (max-width: 1025px) {
      ul {
        li {
          a {
            display: none;
          }
        }
      }
    }
  }

  &__logo {
    margin: 0 8.8vw 0 3.3vw;

    @media all and (max-width: 750px) {
      margin: 0;
    }
  }

  &__contact {
    display: flex;
    flex-direction: column;

    @media all and (max-width: 1350px) {
      display: none;
    }
  }

  &__phone {
    font-size: 16px;
  }

  &__call {
    color: #1f202050;
    font-size: 14px;
  }

  &__user-menu {
    display: flex;
    flex-direction: row;
    margin: 0 3.3vw 0 8.8vw;

    @media all and (max-width: 1200px) {
      margin: 0 3.3vh 0 0;
    }

    li {
      margin: 0 12px;

      @media all and (max-width: 1025px) {
        margin: 0;
      }

      button {
        background-color: #7bb899;
        border-radius: 50%;

        height: 24px;
        width: 24px;
      }

      button:hover {
        cursor: pointer;
      }
    }
  }

  &__main-menu {
    display: flex;
    flex-direction: row;
    align-items: center;

    @media all and (max-width: 1025px) {
      ul {
        width: 0;
        li {
          a {
            display: none;
          }
        }
      }
    }

    ul {
      li {
        display: inline-block;

        font-size: 14px;
        text-transform: uppercase;

        margin: 0 0.6vw;

        a {
          color: #1f2020;
          letter-spacing: 0.06em;
          text-decoration: none;

          transition: .3s linear;
        }

        a:hover {
          text-shadow: 0 0 5px #1f202050;
        }
      }
    }
  }
}
</style>