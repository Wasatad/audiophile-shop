<template>
<div v-if="isOpened">
<div @click.self="closeCongratsModal" class="modal-wrapper">
<transition name="congrats-modal">
  <div v-show="showModal" class="modal">
    <div class="modal-inner">
    <img class="check-icon" src="@/assets/img/checkmark.svg" alt="" />
    <div class="modal-title">THANK YOU</br>FOR YOUR ORDER</div>
    <div class="modal-description">You will receive an email confirmation shortly.</div>
    <div class="details">
      <div class="products">
        <div v-for="(item, index) in sortedCart" :key="index" class="item">
            <div class="left-side">
              <div class="product-image">
                <img :src="item.image" alt="" />
              </div>
              <div class="product-info">
                <div class="product-name">{{item.name}}</div>
                <div class="product-price">$ {{item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
              </div>
            </div>
            <div class="right-side">
              <div class="qty">x{{item.qty}}</div>
            </div>
        </div>
        <div class="more-items">
          <hr v-if="cart.length > 1">
          <div v-if="cart.length > 1" @click="toggleShowOption" class="other-items"> {{showFullList ? 'View less' : `and ${cart.length - 1} other item(s)`}}
          </div>
        </div>
      </div>
      <div class="total">
        <div class="total-title">GRAND TOTAL</div>
        <div class="total-price">$ {{grandTotal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</div>
      </div>
    </div>
    <nuxt-link to="/">
      <button @click="$store.commit('clearCart')" class="btn-orange">BACK TO HOME</button>
      </nuxt-link>
    </div>
  </div>
  </transition>
</div>
</div>
</template>

<script>
export default {
  props:['isOpened'],
  data() {
    return {
      showModal: false,
      showFullList: false,
    }
  },
  methods: {
toggleShowOption() {
  this.showFullList = !this. showFullList;
},
closeCongratsModal() {
      this.showModal = false;

      setTimeout(() => {
        this.$emit("closeModal");
      }, 200);
    },
  },
  computed: {
     cart() {
      return this.$store.state.cart;
    },
    sortedCart() {
      let sorted = this.cart.sort(function(a, b) {
  return b.price - a.price;
});
  if (this.showFullList) {
    console.log(sorted);
    return sorted
  } else {
    return sorted.slice(0,1);
  }

    },
    total() {
      return this.$store.getters.total;
    },
    grandTotal() {
      return this.total + this.shipping;
    },
   shipping() {
    return this.$store.state.shipping;
    },
  },
mounted() {
  let modal = document.querySelector('.modal');
  let navBar = document.querySelector('.inner-container');
  let navBarHeight = +window.getComputedStyle(navBar).getPropertyValue("height").split('p')[0];

  let scroll = window.pageYOffset;
   modal.style.top = scroll + navBarHeight + 40 + 'px';
document.querySelector("body").classList.add("no-scroll");

 setTimeout(() => {
      this.showModal = true;
    }, 100);
},
beforeDestroy() {
    document.querySelector("body").classList.remove("no-scroll");
  },
};
</script>

<style scoped lang="scss">
.modal-wrapper {

  position: absolute;
  z-index: 10;
  left: 0;
  top:0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.4);

  padding: 0 15px;

  .check-icon {
    margin-bottom: 32px;
  }


.modal {
max-height: 75vh;
overflow-y: scroll !important;
  position: absolute;
  left: 50%;

  transform: translateX(-50%);


  box-sizing: border-box;
  max-width: 540px;
  width: 95%;
  border-radius: 8px;
  padding: 48px;

 background-color: #fff;
  @media (max-width: 500px) {
    padding: 48px 15px;
     }

     .modal-inner {
       overflow-y: scroll !important;
       height: 100%;
     }

 img {
  // margin-bottom: 32px;
 }


  .modal-title {
    font-weight: 700;
    font-size: 32px;
    line-height: 112%;
    letter-spacing: 1.14286px;
    text-transform: uppercase;
    margin-bottom: 24px;
     @media (max-width: 500px) {
    font-size: 24px;
     }
  }
  .modal-description {
    font-weight: 500;
    font-size: 15px;
    line-height: 167%;
    opacity: 0.5;
    margin-bottom: 32px;
  }

  .details {
    display: flex;
     border-radius: 8px;
     overflow: hidden;
     margin-bottom: 40px;
     @media (max-width: 500px) {
      flex-direction: column;
     }
    .products {
      box-sizing: border-box;
      width: 60%;
    background-color: $cultured;
      padding: 24px;
      // display: flex;
       @media (max-width: 500px) {
     width: 100%;
     }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
margin-bottom: 14px;

  }
  .left-side {
    display: flex;
    gap: 16px;
    align-items: center;
  }

  img {
    // position: relative;
    // top: 10px;
      // margin-top: 8px;
      width: 26px;
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
  hr {

      border: 1px solid rgba(0, 0, 0, 0.05);
      margin-bottom: 12px;
    }
  .other-items {
    margin: 0 auto;
    text-align: center;
  font-weight: 700;
font-size: 12px;
line-height: 16px;
letter-spacing: -0.2px;
color: rgba(0, 0, 0, 1);
opacity: 0.5;
cursor: pointer;
  }
  }
  .total {
    width: 40%;
    padding: 24px 0 40px 32px;
    background-color:rgba(0, 0, 0, 1);

    display: flex;
    flex-direction: column;
    justify-content: flex-end;
     @media (max-width: 500px) {
     width: 100%;
     }
    .total-title {

      font-weight: 500;
font-size: 15px;
line-height: 160%;
color: #FFFFFF;
opacity: 0.5;
    }
    .total-price {
      font-weight: 700;
font-size: 18px;

text-transform: uppercase;
color: #FFFFFF;
    }
  }
  }

.btn-orange {

  @include button-orange;
  width: 100%;
}
}
}

.congrats-modal-enter-active,
.congrats-modal-leave-active {
  transition: 0.5s ease;
}
.congrats-modal-enter,
.congrats-modal-leave-to {

  opacity: 0;
}

</style>
