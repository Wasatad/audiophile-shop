import Vuex from "vuex";
import Cookies from "js-cookie";

let createStore = () => {
  return new Vuex.Store({
    state: {
      products: [],
      cart: [],
      shipping: 50,

      showMobileMenu: false,
    },
    mutations: {
      addToCart(state, payload) {
        if (
          !state.cart.find((product) => product.slug === payload.productName)
        ) {
          let product = this.getters.productByName(payload.productName);
          let productInCart = {};
          productInCart.name = product.name;
          productInCart.slug = product.slug;
          productInCart.price = product.price;
          productInCart.image = product.image;
          productInCart.qty = payload.qty;

          state.cart.push(productInCart);
        } else {
          state.cart.find(
            (product) => product.slug === payload.productName
          ).qty += payload.qty;
        }
        this.$cookies.set("cart", JSON.stringify(state.cart));
      },
      clearCart(state) {
        state.cart = [];
        this.$cookies.removeAll();
      },
      incrementQty(state, name) {
        let product = state.cart.find((product) => product.slug === name);
        product.qty += 1;
        this.$cookies.set("cart", JSON.stringify(state.cart));
      },
      decrementQty(state, name) {
        let product = state.cart.find((product) => product.slug === name);
        if (product.qty > 1) {
          product.qty -= 1;
          this.$cookies.set("cart", JSON.stringify(state.cart));
        }
      },
      toggleMobileMenu(state) {
        state.showMobileMenu = !state.showMobileMenu;
      },
    },
    actions: {
      nuxtServerInit(vueContext, context) {
        // this.$cookies.removeAll()

        let cart = this.$cookies.get("cart");

        if (cart) {
          vueContext.state.cart = cart;
        }

        return this.$axios
          .get(process.env.baseUrl + "/products.json")
          .then((res) => {
            for (const key in res.data) {
              vueContext.state.products.push({ ...res.data[key], id: key });
            }
          });
      },
    },
    getters: {
      productsByCategory: (state) => (category) => {
        return state.products.filter(
          (product) => product.category === category
        );
      },
      productByName: (state) => (name) => {
        return state.products.find((product) => product.slug === name);
      },
      total(state) {
        let initialValue = 0;
        let sum = state.cart.reduce(function (accumulator, currentValue) {
          return accumulator + currentValue.price * currentValue.qty;
        }, initialValue);
        return sum;
      },
      productQty: (state) => (name) => {
        return state.cart.find((product) => product.slug === name).qty;
      },
    },
  });
};

export default createStore;
