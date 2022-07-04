<template>
  <div v-if="showMobileMenu" class="mobile-wrapper">
    <div class="container">
      <div class="mobile-inner">
        <div class="mobile-card">
          <img
            class="preview"
            src="@/assets/img/headphones-preview.png"
            alt=""
          />
          <span class="category-name">HEADPHONES</span>
          <nuxt-link to="/headphones">
            <button @click="toggleMobileMenu" class="btn-borderless">
              Shop
            </button>
          </nuxt-link>
        </div>
        <div class="mobile-card">
          <img class="preview" src="@/assets/img/speakers-preview.png" alt="" />
          <span class="category-name">SPEAKERS</span>
          <nuxt-link to="/speakers">
            <button @click="toggleMobileMenu" class="btn-borderless">
              Shop
            </button>
          </nuxt-link>
        </div>
        <div class="mobile-card">
          <img
            class="preview"
            src="@/assets/img/earphones-preview.png"
            alt=""
          />
          <span class="category-name">EARPHONES</span>
          <nuxt-link to="/earphones">
            <button @click="toggleMobileMenu" class="btn-borderless">
              Shop
            </button>
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState(["showMobileMenu"]),
  },
  methods: {
    ...mapMutations(["toggleMobileMenu"]),
  },
  mounted() {
    document.querySelector("body").classList.add("no-scroll");
    let mobileMenu = document.querySelector(".mobile-wrapper");
    let navBar = document.querySelector(".inner-container");
    let navBarHeight = +window
      .getComputedStyle(navBar)
      .getPropertyValue("height")
      .split("p")[0];

    let scroll = window.pageYOffset;
    mobileMenu.style.top = scroll + navBarHeight + "px";
    document.querySelector("body").classList.add("no-scroll");
  },
  beforeDestroy() {
    document.querySelector("body").classList.remove("no-scroll");
  },
};
</script>

<style scoped lang="scss">
.mobile-wrapper {
  z-index: 100;
  overflow: scroll;
  position: absolute;
  top: 70px;

  width: 100%;
  height: 100vh;

  background-color: #fff;
}
.mobile-inner {
  height: 1000px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 90px;

  .mobile-card {
    max-width: 350px;
    width: 90%;
    height: 204px;
    position: relative;

    background-color: $cultured;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .preview {
      position: absolute;
      width: 210px;
      top: 35px;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: 0.4s;
    }
    span {
      font-weight: 700;
      font-size: 18px;
      margin-top: 105px;
    }
    .btn-borderless {
      @include button-borderless;
    }
  }
}

.large {
  width: 250px !important;
}
</style>
