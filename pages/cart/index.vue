<template>
  <div>
    <BlackHeader />
    <div class="cart-wrapper">
      <modal-congrats
        v-if="isModalOpened"
        :isOpened="isModalOpened"
        @closeModal="toggleCongratsModal"
      ></modal-congrats>
      <div class="link-back-wrapper">
        <div class="container">
          <div class="link-back">
            <span @click="$router.back()">Go Back</span>
          </div>
        </div>
      </div>
      <div class="checkout">
        <div class="container checkout-wrapper">
          <div class="checkout-inner" id="checkout-test">
            <div class="checkout-title">CHECKOUT</div>
            <div class="checkout-block">
              <div class="checkout-subtitle">Billing Details</div>
              <div class="control-container">
                <label>
                  Name
                  <input
                    v-model="name"
                    type="text"
                    class="checkout-input"
                    placeholder="Insert your name"
                  />
                </label>
                <label>
                  <div class="email-alert">
                    <span class="email-label">Email Address</span
                    ><span class="email-error" v-if="!isEmailValid"
                      >Wrong format</span
                    >
                  </div>
                  <input
                    v-model="email"
                    @blur="validateEmail"
                    ref="emailInput"
                    type="email"
                    class="checkout-input"
                    placeholder="Insert your name"
                    autocomplete="email"
                  />
                </label>
              </div>
              <div class="control-container">
                <label>
                  Phone Number
                  <input
                    v-model="phone"
                    type="tel"
                    class="checkout-input"
                    placeholder="+1 202-555-0136"
                  />
                </label>
              </div>
            </div>
            <div class="checkout-block">
              <div class="checkout-subtitle">shipping info</div>
              <div class="control-container adress">
                <label>
                  Street
                  <input
                    v-model="adress"
                    type="text"
                    class="checkout-input"
                    placeholder="1137 Williams Avenue"
                  />
                </label>
              </div>
              <div class="control-container">
                <label>
                  ZIP Code
                  <input
                    v-model="zip"
                    type="number"
                    class="checkout-input"
                    placeholder="10001"
                  />
                </label>
                <label>
                  City
                  <input
                    v-model="city"
                    type="text"
                    class="checkout-input"
                    placeholder="New York"
                  />
                </label>
              </div>
              <div class="control-container">
                <label>
                  Country
                  <input
                    v-model="country"
                    type="text"
                    class="checkout-input"
                    placeholder="United States"
                  />
                </label>
              </div>
              <div class="control-container">
                <label>Payment Method</label>

                <div class="checkbox-container">
                  <label
                    ><div class="checkout-radio">
                      <input
                        @input="checkboxSwitcher"
                        class="radio-input"
                        type="radio"
                        name="payment"
                        id="card"
                      />e-Money
                    </div></label
                  >
                  <label
                    ><div class="checkout-radio">
                      <input
                        @input="checkboxSwitcher"
                        class="radio-input"
                        type="radio"
                        name="payment"
                        id="cash"
                        checked
                      />Cash
                    </div></label
                  >
                </div>
              </div>
              <div v-if="!byCash" class="control-container">
                <label>
                  e-Money Number
                  <input
                    v-model="cardNumber"
                    type="number"
                    class="checkout-input"
                    placeholder="238521993"
                  />
                </label>
                <label>
                  e-Money PIN
                  <input
                    v-model="pin"
                    @input="validatePin"
                    type="number"
                    class="checkout-input"
                    placeholder="6891"
                  />
                </label>
              </div>
              <div v-if="byCash" class="payment-info">
                <img src="@/assets/img/delivery-icon.svg" alt="" />
                <span
                  >The ‘Cash on Delivery’ option enables you to pay in cash when
                  our delivery courier arrives at your residence. Just make sure
                  your address is correct so that your order will not be
                  cancelled.</span
                >
              </div>
            </div>
          </div>
          <div class="summary">
            <div class="summary-title">summary</div>
            <div v-for="(item, id) in cart" :key="id" class="item">
              <div class="left-side">
                <div class="product-image">
                  <img :src="item.image" alt="" />
                </div>
                <div class="product-info">
                  <div class="product-name">{{ item.name }}</div>
                  <div class="product-price">
                    $
                    {{
                      item.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }}
                  </div>
                </div>
              </div>
              <div class="right-side">
                <div class="qty">x{{ item.qty }}</div>
              </div>
            </div>
            <div class="total-info">
              <div class="summary-subtitle">TOTAL</div>
              <div class="summary-money">
                $ {{ total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </div>
            </div>
            <div class="total-info">
              <div class="summary-subtitle">SHIPPING</div>
              <div class="summary-money">$ {{ shipping }}</div>
            </div>
            <div class="total-info">
              <div class="summary-subtitle">VAT (INCLUDED)</div>
              <div class="summary-money">
                $ {{ vat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") }}
              </div>
            </div>
            <div class="total-info">
              <div class="summary-subtitle">GRAND TOTAL</div>
              <div class="summary-money grand">
                $
                {{
                  grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }}
              </div>
            </div>
            <button
              :class="[allFilled ? payBtnActive : payBtnDisabled]"
              @click="toggleCongratsModal"
              class="btn-orange"
            >
              CONTINUE & PAY
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isEmailValid: true,
      byCash: true,
      isModalOpened: false,

      payBtnActive: "btn-orange",
      payBtnDisabled: "btn-orange-disabled",

      //Client info
      name: "",
      email: "",
      phone: "",
      adress: "",
      zip: "",
      city: "",
      country: "",
      cardNumber: "",
      pin: "",
    };
  },
  methods: {
    toggleCongratsModal() {
      if (this.allFilled) {
        this.isModalOpened = !this.isModalOpened;
      }
    },
    validateEmail(e) {
      let enteredValue = e.target.value;
      let emailLabel = document.querySelector(".email-label");
      let emailInput = this.$refs.emailInput;

      if (enteredValue.length < 1) {
        this.isEmailValid = true;
      } else {
        this.isEmailValid = String(enteredValue)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      }
      if (this.isEmailValid) {
        emailLabel.style.color = "inherit";
        emailInput.style.border = "1px solid rgb(207, 207, 207)";
      } else {
        emailLabel.style.color = "#cd2c2c";
        emailInput.style.border = "1px solid #cd2c2c";
      }
    },
    validatePin(e) {
      if (e.target.value.length > 4) {
        e.target.value = e.target.value.slice(0, 4);
      }
    },
    checkboxSwitcher(e) {
      if (document.querySelector(".radio-active")) {
        let activeInput = document.querySelector(".radio-active");
        activeInput.classList.remove("radio-active");
      }
      let newActiveInput = e.target.parentNode;
      newActiveInput.classList.add("radio-active");
      if (e.target.id == "card") {
        this.byCash = false;
      } else {
        this.byCash = true;
      }
    },
    makeIconActive(e) {
      let icon = e.target;
      icon.classList.add("active");
    },
    makeIconDisabled(e) {
      let icon = e.target;
      icon.classList.remove("active");
    },
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
      return this.$store.getters.total;
    },
    vat() {
      return (this.total / 20).toFixed(2);
    },
    grandTotal() {
      return this.total + this.shipping;
    },
    shipping() {
      if (this.$store.state.cart.length > 0) {
        return this.$store.state.shipping;
      } else {
        return 0;
      }
    },
    allFilled() {
      if (this.cart.length >= 1) {
        if (!this.byCash) {
          if (
            this.name == "" ||
            this.email == "" ||
            this.phone == "" ||
            this.adress == "" ||
            this.zip == "" ||
            this.city == "" ||
            this.country == "" ||
            this.cardNumber == "" ||
            this.pin == ""
          ) {
            return false;
          } else return true;
        } else {
          if (
            this.name == "" ||
            this.email == "" ||
            this.phone == "" ||
            this.adress == "" ||
            this.zip == "" ||
            this.city == "" ||
            this.country == ""
          ) {
            return false;
          } else return true;
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.cart-wrapper {
  background-color: $cultured;
  position: relative;
}
.checkout {
  padding: 0 15px;
}
.link-back-wrapper {
  padding: 0 15px;
  .link-back {
    padding-top: 180px;
    margin-bottom: 56px;

    @media (max-width: 600px) {
      padding-top: 120px;
    }
    span {
      font-weight: 500;
      font-size: 15px;
      line-height: 25px;
      opacity: 0.5;
      cursor: pointer;
    }
  }
}

.checkout-wrapper {
  display: flex;
  gap: 30px;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
}

.checkout-inner {
  width: 70%;
  background-color: #fff;
  padding: 48px 54px 48px 48px;
  border-radius: 8px;
  margin-bottom: 140px;
  @media (max-width: 1000px) {
    width: auto;
    margin-bottom: 0;
  }
  @media (max-width: 500px) {
    padding: 50px 32px 0px 32px;
  }
  .checkout-block {
    margin-bottom: 50px;
    @media (max-width: 500px) {
      margin-bottom: 32px;
    }
  }
  .checkout-title {
    font-weight: 700;
    font-size: 32px;
    line-height: 36px;
    margin-bottom: 40px;
    @media (max-width: 500px) {
      font-size: 28px;
    }
  }
  .checkout-subtitle {
    font-weight: 700;
    font-size: 13px;
    line-height: 25px;

    letter-spacing: 0.928571px;
    text-transform: uppercase;
    color: $rawSienna;
    margin-bottom: 18px;
  }
  .control-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 24px;
    @media (max-width: 500px) {
      flex-direction: column;
      margin-bottom: 0px;
    }
  }

  .payment-info {
    display: flex;
    gap: 32px;
    justify-content: space-between;
    @media (max-width: 500px) {
      flex-direction: column;
      justify-content: flex-start;
      gap: 14px;
      margin-top: 14px;
      img {
        width: 40px;
      }
    }
    span {
      font-weight: 500;
      font-size: 15px;
      line-height: 167%;

      opacity: 0.5;
    }
  }
  label {
    font-weight: 700;
    font-size: 12px;
    line-height: 16px;
    width: 49%;
    @media (max-width: 500px) {
      width: 100%;
      margin-bottom: 24px;
    }
    input {
      display: block;
      margin-top: 10px;
      width: 100%;
    }
  }
  .adress {
    label {
      width: 100%;
    }
  }
  .email-alert {
    display: flex;
    justify-content: space-between;
    .email-error {
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      text-align: right;
      letter-spacing: -0.214286px;

      color: #cd2c2c;
    }
  }
  .checkbox-container {
    width: 49%;
    @media (max-width: 500px) {
      width: 100%;
    }
    .checkout-radio {
      margin-bottom: 16px;
    }
    input {
      margin-top: 0px;
    }
  }
}
.summary {
  width: 30%;
  border-radius: 8px;
  padding: 32px;
  background-color: #fff;
  margin-bottom: 140px;
  @media (max-width: 1000px) {
    width: auto;
  }
  .summary-title {
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    letter-spacing: 1.28571px;
    text-transform: uppercase;
    margin-bottom: 30px;
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
      width: 80%;
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
  .qty {
    font-weight: 700;
    font-size: 15px;
    opacity: 0.5;
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

.btn-orange {
  @include button-orange;
  width: 100%;
}

.btn-orange-disabled {
  @include button-orange;
  background-color: $lightSalmon;
  cursor: auto;
}

.checkout-input {
  @include checkout-input;
}

.checkout-radio {
  @include checkout-radio;
}
.radio-active {
  border: 1px solid $rawSienna;
}
</style>
