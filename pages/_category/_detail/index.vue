<template>
  <div>
    <BlackHeader />
    <div class="link-back-wrapper">
      <div class="container">
        <div class="link-back">
          <span @click="$router.back()">Go Back</span>
        </div>
      </div>
    </div>
    <div class="product-wrapper">
      <div class="container">
        <div class="product-card">
          <div class="product-image">
            <img class="detail-product-prev" :src="product.image" alt="" />

            <img
              class="detail-product-shadow"
              src="@/assets/img/product-shadow.png"
              alt=""
            />
          </div>
          <div class="product-description">
            <div v-if="product.new" class="product-label">NEW PRODUCT</div>
            <div class="product-title">{{ product.name }}</div>
            <div class="product-text">
              {{ product.description }}
            </div>
            <div class="product-price">
              $
              {{
                product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
            <div class="controls">
              <button @click="addToCart" class="btn-orange">add to cart</button>
              <div class="product-counter">
                <div
                  @click="
                    if (qty > 1) {
                      qty -= 1;
                    }
                  "
                  @mouseover="makeIconActive"
                  @mouseout="makeIconDisabled"
                  class="minus"
                ></div>
                <input readonly v-model="qty" type="number" value="1" min="1" />
                <div
                  @click="qty += 1"
                  @mouseover="makeIconActive"
                  @mouseout="makeIconDisabled"
                  class="plus"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-wrapper">
      <div class="container">
        <div class="product-info">
          <div class="features">
            <div class="features-title">FEATURES</div>
            <div class="features-description">
              {{ product.features }}
            </div>
          </div>
          <div class="complect">
            <div class="complect-title">IN THE BOX</div>
            <div>
              <div
                v-for="(unit, id) in product.includes"
                :key="id"
                class="complect-description"
              >
                <div class="qty">{{ unit.quantity }}x</div>
                <div class="item">{{ unit.item }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="product-wrapper">
      <div class="container">
        <div class="product-images">
          <div class="left-part">
            <div class="top-img">
              <img :src="product.gallery.first" alt="" />
            </div>
            <div class="bottom-img">
              <img :src="product.gallery.second" alt="" />
            </div>
          </div>
          <div class="right-part">
            <img :src="product.gallery.third" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="product-wrapper">
      <div class="container">
        <div class="suggestion-title">you may also like</div>
        <div class="suggestion">
          <div
            v-for="(other, id) in product.others"
            :key="id"
            class="products-preview"
          >
            <div class="product-image-small">
              <img :src="other.image" alt="" />
            </div>

            <div class="product-name">{{ other.name }}</div>
            <div class="btn-container">
              <button
                @click="$router.push('/' + other.category + '/' + other.slug)"
                class="btn-orange"
              >
                See Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <CategoryRow />
    <AboutCompany />
  </div>
</template>

<script>
export default {
  validate(data) {
    return (
      data.params.category ==
      data.store.getters.productByName(data.params.detail).category
    );
  },
  data() {
    return {
      product: {},
      qty: 1,
    };
  },
  async fetch() {
    this.product = this.$store.getters.productByName(
      this.$nuxt.context.route.params.detail
    );
  },
  methods: {
    makeIconActive(e) {
      let icon = e.target;
      icon.classList.add("active");
    },
    makeIconDisabled(e) {
      let icon = e.target;
      icon.classList.remove("active");
    },
    addToCart() {
      let qty = this.qty;
      let productName = this.$nuxt.context.route.params.detail;
      this.$store.commit("addToCart", { productName, qty });

      //Cart icon shake animation
      let cart = document.querySelector(".cart-icon");
      cart.classList.add("shake");
      setTimeout(() => {
        cart.classList.remove("shake");
      }, 1000);

      this.qty = 1;
    },
  },
};
</script>

<style scoped lang="scss">
.link-back-wrapper {
  padding: 0 15px;
  .link-back {
    margin-top: 180px;
    margin-bottom: 56px;

    @media (max-width: 600px) {
      margin-top: 120px;
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

.product-wrapper {
  padding: 0 15px;

  .product-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    margin-bottom: 160px;
    @media (max-width: 900px) {
      flex-direction: column;

      margin-bottom: 120px;
    }
    @media (max-width: 500px) {
      margin-bottom: 80px;
    }
    .product-image {
      position: relative;

      height: 560px;
      width: 540px;
      background-color: $cultured;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
      @media (max-width: 900px) {
        width: 100%;
      }
      @media (max-width: 450px) {
        max-height: 450px;
      }
      .detail-product-prev {
        width: 500px;
        position: absolute;
        z-index: 3;
      }
      .detail-product-shadow {
        position: absolute;
        bottom: -20px;
        opacity: 0.5;
        left: 50%;
        width: 400px;
        z-index: 0;
        transform: translateX(-50%);
      }
    }

    .product-description {
      max-width: 445px;
      @media (max-width: 900px) {
        max-width: 100%;
      }
      .product-label {
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        letter-spacing: 10px;
        text-transform: uppercase;
        color: $rawSienna;
        margin-bottom: 16px;
      }
      .product-title {
        font-weight: 700;
        font-size: 40px;
        line-height: 44px;
        max-width: 300px;
        text-transform: uppercase;

        margin-bottom: 32px;
        @media (max-width: 900px) {
          margin-bottom: 24px;
        }
      }

      .product-text {
        font-weight: 500;
        font-size: 15px;
        line-height: 25px;
        opacity: 0.5;

        margin-bottom: 32px;
        @media (max-width: 900px) {
          margin-bottom: 24px;
        }
      }
      .product-price {
        font-weight: 700;
        font-size: 18px;
        line-height: 25px;
        margin-bottom: 46px;
        @media (max-width: 900px) {
          margin-bottom: 32px;
        }
      }
      .controls {
        display: flex;
        gap: 16px;
        justify-content: flex-start;
        align-items: center;
      }
    }
  }
}
.btn-orange {
  @include button-orange;
}
.product-counter {
  @include product-counter;
}

.product-info {
  display: flex;
  gap: 125px;
  margin-bottom: 160px;
  @media (max-width: 900px) {
    flex-direction: column;
  }
  @media (max-width: 800px) {
    margin-bottom: 120px;
  }
  @media (max-width: 500px) {
    gap: 80px;
    margin-bottom: 90px;
  }
  .features {
    max-width: 635px;
    .features-title {
      font-weight: 700;
      font-size: 32px;
      line-height: 36px;
      margin-bottom: 32px;
      text-transform: uppercase;
      @media (max-width: 500px) {
        font-size: 24px;
      }
    }
    .features-description {
      font-weight: 500;
      font-size: 15px;
      line-height: 25px;
      opacity: 0.5;
    }
  }
  .complect {
    @media (max-width: 900px) {
      display: flex;
      gap: 64px;
    }
    @media (max-width: 500px) {
      display: flex;
      flex-direction: column;
      gap: 0px;
    }
    .complect-title {
      font-weight: 700;
      font-size: 32px;
      margin-bottom: 32px;
      text-transform: uppercase;
      @media (max-width: 500px) {
        font-size: 24px;
      }
    }
    .complect-description {
      display: flex;
      gap: 24px;
      min-width: 200px;
      margin-bottom: 14px;

      .qty {
        font-weight: 700;
        font-size: 15px;
        color: $rawSienna;
      }
      .item {
        font-weight: 500;
        font-size: 15px;
        opacity: 0.5;
      }
    }
  }
}
.product-images {
  display: flex;
  gap: 32px;
  height: 580px;
  overflow: hidden;
  margin-bottom: 160px;
  @media (max-width: 700px) {
    height: 400px;
    margin-bottom: 120px;
  }
  @media (max-width: 445px) {
    flex-direction: column;
    height: auto;
    margin-bottom: 0px;
  }
  .left-part {
    width: 40%;
    display: flex;
    flex-direction: column;
    gap: 32px;
    @media (max-width: 445px) {
      width: 100%;
    }
    .top-img,
    .bottom-img {
      overflow: hidden;
      border-radius: 8px;
    }
    .top-img {
      width: 100%;
      height: 50%;
      @media (max-width: 445px) {
        width: 100%;
      }
      img {
        height: 100%;
        border-radius: 8px;
        max-width: none;
        object-fit: fill;
      }
    }
    .bottom-img {
      height: 50%;

      img {
        height: 100%;
        border-radius: 8px;
        max-width: none;
        object-fit: cover;
        @media (max-width: 445px) {
          width: 100%;
        }
      }
    }
  }
  .right-part {
    width: 60%;

    overflow: hidden;
    border-radius: 8px;
    @media (max-width: 445px) {
      height: 400px;
      width: 100%;
    }
    img {
      border-radius: 8px;
      max-width: none;
      object-fit: cover;
      @media (max-width: 445px) {
        width: 100%;
      }
    }
  }
}

.suggestion-title {
  font-weight: 700;
  font-size: 32px;
  line-height: 36px;
  margin-bottom: 32px;
  text-transform: uppercase;
  text-align: center;
  margin: 0 auto 56px;
  @media (max-width: 500px) {
    font-size: 24px;
  }
}

.suggestion {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  margin-bottom: 160px;
  width: 100%;
  @media (max-width: 700px) {
    flex-direction: column;
  }

  .products-preview {
    margin-bottom: 40px;
    width: 100%;

    .product-image-small {
      position: relative;
      background-color: $cultured;
      border-radius: 8px;

      min-height: 320px;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
      margin-bottom: 40px;
      @media (max-width: 450px) {
        min-height: 0px;
      }
      img {
        width: 100%;
        max-width: 260px;
      }
    }
    .product-name {
      text-align: center;
      margin-bottom: 32px;

      font-weight: 700;
      font-size: 24px;
      line-height: 33px;
    }
    .btn-container {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .btn-orange {
        margin: 0 auto !important;
      }
    }
  }
}
</style>
