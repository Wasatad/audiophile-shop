<template>
  <div>
    <transition name="mobile-menu">
      <mobile-menu v-if="showMobileMenu"></mobile-menu>
    </transition>

    <nuxt />
    <TheFooter />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["showMobileMenu"]),
  },
  mounted() {},
};
</script>
<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}
a {
  text-decoration: none;
}
html {
  font-family: "Manrope", sans-serif;
  -webkit-font-smoothing: antialiased;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
}
img {
  max-width: 100%;
  display: block;
}

input,
button,
textarea,
select {
  font: inherit;
  outline: none;
  border: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

a {
  text-decoration: none;
  color: inherit;
}

.container {
  width: 100%;
  max-width: 1110px;
  margin: 0 auto;
  /* padding: 0 15px; */
}

.no-scroll {
  /* height: 100%; */
  overflow-y: hidden;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  /* transition: opacity 2s; */
  transition: transform 0.2s ease-in;
}
.mobile-menu-enter, .mobile-menu-leave-to /* .fade-leave-active до версии 2.1.8 */ {
  /* opacity: 0; */
  transform: translateX(-100%);
}
</style>
