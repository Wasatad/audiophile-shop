<template>
  <div class="nav-wrapper">
    <div class="container nav-bar">
      <div class="inner-container nav-bar-inner">
        <img
          @click="toggleMobileMenu"
          class="burger"
          src="@/assets/img/burger.svg"
          alt=""
        />
        <nuxt-link to="/">
          <img class="logo" src="@/assets/img/logo.svg" alt="" />
        </nuxt-link>
        <div class="menu">
          <ul>
            <nuxt-link to="/">
              <li>HOME</li>
            </nuxt-link>
            <nuxt-link to="/headphones">
              <li>HEADPHONES</li>
            </nuxt-link>
            <nuxt-link to="/speakers">
              <li>SPEAKERS</li>
            </nuxt-link>
            <nuxt-link to="/earphones">
              <li>EARPHONES</li>
            </nuxt-link>
          </ul>
        </div>

        <div class="cart-icon">
          <div
            @click="toggleCartVisibility"
            v-if="cart.length > 0"
            class="qty-sticker"
          >
            <span>{{ cart.length }}</span>
          </div>
          <img
            @click="toggleCartVisibility"
            src="@/assets/img/cart-icon.svg"
            alt=""
          />
          <modal-cart
            v-if="isModalCartOpened"
            :isOpened="isModalCartOpened"
            @closeModalCart="toggleCartVisibility"
          ></modal-cart>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      isModalCartOpened: false,
    };
  },
  methods: {
    ...mapMutations(["toggleMobileMenu"]),
    toggleCartVisibility() {
      this.isModalCartOpened = !this.isModalCartOpened;
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
  },
};
</script>
<style scoped lang="scss">
.nav-wrapper {
  width: 100%;
  height: 97px;

  display: flex;
  align-items: center;
  justify-content: center;

  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: black;

  .container {
    height: 100%;
    padding: 0 15px;
    .inner-container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid black;
      @media (max-width: 750px) {
        border-bottom: none;
      }

      .burger {
        display: none;
        width: 16px;
        height: 15px;
      }

      .menu {
        font-weight: 700;
        font-size: 13px;
        ul {
          display: flex;
          color: #fff;
          list-style: none;
          gap: 34px;
          li {
            color: #fff;
            cursor: pointer;
            transition: 0.3s;
            &:hover {
              color: $rawSienna;
            }
          }
        }
      }

      .cart-icon {
        min-width: 140px;
        display: flex;
        justify-content: flex-end;
        position: relative;

        img {
          cursor: pointer;
        }
        .qty-sticker {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: auto;
          min-width: 34px;
          height: 34px;
          border-radius: 20px;
          padding: 0 8px;
          top: -20px;
          right: 8px;
          background-color: rgba(216, 125, 74, 0.64);
          cursor: pointer;
          span {
            font-weight: 700;
            font-size: 16px;

            color: #ffffff;
          }
        }
      }
      @media (max-width: 750px) {
        height: 70px;

        justify-content: flex-start;
        gap: 42px;
        .burger {
          display: block;
        }
        .menu {
          display: none;
        }
        .cart-icon {
          min-width: 0px;
          margin-left: auto;
        }
      }
    }
  }
  @media (max-width: 750px) {
    height: 70px;
  }
}
.backdrop {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;

  background-color: rgba(0, 0, 0, 0.4);
}

//Cart icon animation
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
