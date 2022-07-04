<template>
  <div>
    <BlackHeader />
    <div class="header">
      <span>{{ $nuxt.context.route.params.category }}</span>
    </div>
    <div v-for="(category, id) in categories" :key="id" class="product-wrapper">
      <div class="container">
        <div class="product-card">
          <div class="product-image">
            <img class="category-product-prev" :src="category.image" alt="" />
            <img
              class="product-shadow"
              src="@/assets/img/product-shadow.png"
              alt=""
            />
          </div>
          <div class="product-description">
            <div v-if="category.new" class="product-label">NEW PRODUCT</div>
            <div class="product-title">{{ category.name }}</div>
            <div class="product-text">
              {{ category.description }}
            </div>
            <nuxt-link :to="$nuxt.context.route.path + '/' + category.slug">
              <button class="btn-orange">See Product</button>
            </nuxt-link>
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
      data.params.category == "headphones" ||
      data.params.category == "speakers" ||
      data.params.category == "earphones"
    );
  },

  data() {
    return {
      categories: [],
    };
  },
  async fetch() {
    this.categories = this.$store.getters.productsByCategory(
      this.$nuxt.context.route.params.category
    );
  },
};
</script>

<style scoped lang="scss">
.nav-wrapper,
.nav-bar-inner {
  background-color: black;
  border-bottom: none !important;
}
.header {
  padding: 0 15px;
  background-color: black;
  min-height: 336px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 160px;
  @media (min-width: 900px) {
    margin-bottom: 120px;
  }

  span {
    margin-top: 70px;
    font-weight: 700;
    font-size: 40px;
    color: #fff;
    text-transform: uppercase;
  }
}
.btn-orange {
  @include button-orange;
}

.product-wrapper {
  padding: 0 15px;
  &:nth-child(even) {
    .product-card {
      @media (min-width: 900px) {
        flex-direction: row-reverse;
      }
    }
  }

  .product-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 24px;
    margin-bottom: 160px;
    @media (max-width: 900px) {
      flex-direction: column;
      text-align: center;
      margin-bottom: 120px;
    }
    .product-image {
      height: 560px;
      width: 540px;
      position: relative;
      background-color: $cultured;
      border-radius: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      @media (max-width: 900px) {
        width: 100%;
      }
      .category-product-prev {
        width: 600px;
        position: relative;
        top: -20px;
      }
      .product-shadow {
        position: absolute;
        bottom: -40px;
        opacity: 0.4;
        left: 50%;
        width: 500px;
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
        text-transform: uppercase;
        max-width: 300px;

        margin-bottom: 32px;
      }

      .product-text {
        font-weight: 500;
        font-size: 15px;
        line-height: 25px;
        opacity: 0.5;

        margin-bottom: 40px;
      }
    }
  }
}
</style>
