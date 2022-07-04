<template>
  <div class="row-wrapper">
    <div class="container">
      <div class="categories-inner">
        <nuxt-link to="/headphones" class="card-link">
          <div @mouseenter="enlargeImg" @mouseleave="reduceImg" class="card">
            <img
              class="preview"
              src="https://i.ibb.co/6vRHpNB/xx99-mark-one-headphones.png"
              alt=""
            />
            <img
              class="product-shadow"
              src="@/assets/img/product-shadow.png"
              alt=""
            />
            <span class="category-name">HEADPHONES</span>

            <button class="btn-borderless">Shop</button>
          </div>
        </nuxt-link>
        <nuxt-link to="/speakers" class="card-link">
          <div @mouseenter="enlargeImg" @mouseleave="reduceImg" class="card">
            <img
              class="preview"
              src="https://i.ibb.co/2kH7K15/zx9-speaker.png"
              alt=""
            />
            <img
              class="product-shadow"
              src="@/assets/img/product-shadow.png"
              alt=""
            />
            <span class="category-name">SPEAKERS</span>
            <button class="btn-borderless">Shop</button>
          </div>
        </nuxt-link>
        <nuxt-link to="/earphones" class="card-link">
          <div @mouseenter="enlargeImg" @mouseleave="reduceImg" class="card">
            <img
              class="preview"
              src="https://i.ibb.co/LhsdXCP/yx1-earphones.png"
              alt=""
            />
            <img
              class="product-shadow"
              src="@/assets/img/product-shadow.png"
              alt=""
            />
            <span class="category-name">EARPHONES</span>

            <button class="btn-borderless">Shop</button>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      enlargeImg(e) {
        let image = e.target.querySelector(".preview");
        image.classList.add("large");
        e.target.parentNode
          .querySelector(".btn-borderless")
          .classList.add("active");
      },
      reduceImg(e) {
        let image = e.target.querySelector(".preview");
        image.classList.remove("large");
        e.target.parentNode
          .querySelector(".btn-borderless")
          .classList.remove("active");
      },
    };
  },
};
</script>

<style scoped lang="scss">
.row-wrapper {
  padding: 0 15px;
  margin-bottom: 170px;
  @media (max-width: 700px) {
    margin-bottom: 120px;
  }
  @media (max-width: 500px) {
    margin-bottom: 90px;
  }
}
.categories-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  @media (max-width: 750px) {
    flex-direction: column;
    gap: 90px;
  }

  .card-link {
    max-width: 350px;
    width: 100%;
    height: 204px;
  }
  .card {
    position: relative;
    height: 100%;
    background-color: $cultured;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    .preview {
      position: absolute;
      width: 190px;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: 0.2s;
    }
    .product-shadow {
      position: absolute;
      top: 80px;
      opacity: 0.8;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    span {
      font-weight: 700;
      font-size: 18px;
      margin-top: 105px;
    }
    .btn-borderless {
      @include button-borderless;
    }
    .active {
      color: rgba(216, 125, 74, 1);
    }
  }
}

.large {
  width: 220px !important;
}
</style>
