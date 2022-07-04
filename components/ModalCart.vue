<template>
  <div>
    <div
      v-if="isOpened"
      @click="closeModalCart"
      class="modal-cart-backdrop"
    ></div>
    <transition name="cart-modal">
      <div v-if="showModal" class="modal-cart-wrapper">
        <div v-if="cart.length > 0" class="summary">
          <div class="summary-header">
            <div class="summary-title">cart ({{ cart.length }})</div>
            <div @click="clearCart" class="summary-remove">Remove all</div>
          </div>

          <div v-for="item in cart" :key="item.slug" class="item">
            <div class="left-side">
              <div class="product-image">
                <img :src="item.image" alt="" />
              </div>
              <div class="product-info">
                <div class="product-name">{{ item.name }}</div>
                <div class="product-price">
                  $
                  {{
                    item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}
                </div>
              </div>
            </div>
            <div class="right-side">
              <div class="product-counter small">
                <div
                  @click="decrementQty(item.slug)"
                  @mouseover="makeIconActive"
                  @mouseout="makeIconDisabled"
                  class="minus"
                ></div>
                <input
                  readonly
                  type="number"
                  :value="productQty(item.slug)"
                  min="1"
                />

                <div
                  @click="incrementQty(item.slug)"
                  @mouseover="makeIconActive"
                  @mouseout="makeIconDisabled"
                  class="plus"
                ></div>
              </div>
            </div>
          </div>
          <div class="total-info">
            <div class="summary-subtitle">TOTAL</div>
            <div class="summary-money">
              $ {{ total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
            </div>
          </div>
          <nuxt-link to="/cart">
            <button class="btn-orange">checkout</button>
          </nuxt-link>
        </div>
        <div class="empty-placeholder" v-else>
          <img src="@/assets/img/empty-cart.svg" alt="" />
          <span>Your cart is empty</span>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: ["isOpened"],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    ...mapMutations(["incrementQty", "decrementQty"]),
    makeIconActive(e) {
      let icon = e.target;
      icon.classList.add("active");
    },
    makeIconDisabled(e) {
      let icon = e.target;
      icon.classList.remove("active");
    },
    clearCart() {
      this.$store.commit("clearCart");
    },
    qty(name) {
      // return this.$store.getters.productQty("xx99-mark-two-headphones");
      // return this.productQty(name);
      return this.$store.state.cart.find((product) => product.slug === name)
        .qty;
    },
    closeModalCart() {
      this.showModal = false;

      setTimeout(() => {
        this.$emit("closeModalCart");
      }, 200);
    },
  },
  computed: {
    ...mapGetters(["productQty"]),
    cart() {
      return this.$store.state.cart;
    },
    total() {
      return this.$store.getters.total;
    },
    // qty(name) {
    //   // return this.$store.getters.productQty("xx99-mark-two-headphones");
    //   // return this.productQty(name);
    //   return this.$store.state.cart.find((product) => product.slug === name)
    //     .qty;
    // },
  },
  mounted() {
    // this.showModal = true;
    setTimeout(() => {
      this.showModal = true;
    }, 200);
  },
};
</script>

<style scoped lang="scss">
.modal-cart-backdrop {
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  top: 0;
  left: 0;
}
.modal-cart-wrapper {
  background-color: #fff;
  position: absolute;
  z-index: 2;
  right: 0px;
  top: 40px;
  border-radius: 8px;
  overflow: hidden;
  width: 380px;
  max-height: 80vh;
  overflow-y: scroll !important;
  @media (max-width: 500px) {
    width: calc(100vw - 30px);
  }
}

.summary {
  width: 100%;
  box-sizing: border-box;
  padding: 32px;
  background-color: #fff;

  @media (max-width: 1000px) {
    width: auto;
  }
  .summary-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .summary-title {
      font-weight: 700;
      font-size: 18px;
      line-height: 25px;
      letter-spacing: 1.28571px;
      text-transform: uppercase;
    }
    .summary-remove {
      font-weight: 500;
      font-size: 15px;
      text-decoration-line: underline;
      opacity: 0.5;
      cursor: pointer;
      transition: 0.2s;
      &:hover {
        color: $rawSienna;
      }
    }
  }

  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
  .left-side {
    display: flex;
    gap: 16px;
    align-items: center;
  }
  .product-image {
    height: 64px;
    width: 64px;
    background-color: $cultured;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      // margin-top: 8px;
      width: 60%;
    }
  }
  .product-name {
    font-weight: 700;
    font-size: 15px;
  }
  .product-price {
    font-weight: 700;
    font-size: 14px;
    line-height: 25px;
    opacity: 0.5;
  }

  .product-counter.small {
    @include product-counter;
    max-width: 100px;
    padding: 0 10px 0 10px;
    input {
      max-width: 24px;
    }
    .minus,
    .plus {
      padding: 6px;
    }
  }
  .total-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .summary-subtitle {
      font-weight: 500;
      font-size: 15px;
      opacity: 0.5;
    }
    .summary-money {
      font-weight: 700;
      font-size: 18px;
    }
    .grand {
      color: $rawSienna;
    }
  }
  .total-info:last-of-type {
    margin-top: 24px;
    margin-bottom: 32px;
  }
}

.empty-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 0 60px 0;
  img {
    width: 200px;
    margin-bottom: 32px;
  }
  span {
    font-size: 16px;
    color: black;
    opacity: 0.3;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }
}

.btn-orange {
  @include button-orange;
  width: 100%;
}

.cart-modal-enter-active,
.cart-modal-leave-active {
  transition: 0.2s ease;
}
.cart-modal-enter,
.cart-modal-leave-to {
  // transform: scale(0.5);
  opacity: 0;
}
</style>
