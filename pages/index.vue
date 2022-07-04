<template>
  <div>
    <ScrollingHeader />
    <div class="hero-wrapper">
      <div class="container">
        <div class="inner-container">
          <div class="text-block">
            <div class="title-label">NEW PRODUCT</div>
            <h1 class="title">XX99 Mark II Headphones</h1>
            <div class="description">
              Experience natural, lifelike audio and exceptional build quality
              made for the passionate music enthusiast.
            </div>
            <nuxt-link to="/headphones/xx99-mark-two-headphones">
              <button class="btn-orange">See Product</button>
            </nuxt-link>
          </div>
          <img src="@/assets/img/main-headphones.png" alt="" />
        </div>
      </div>
    </div>
    <CategoryRow />
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-first">
          <div class="product-image">
            <img class="circles" src="@/assets/img/bg-circles.svg" alt="" />
            <img class="product" src="@/assets/img/zx9-speaker.png" alt="" />
          </div>
          <div class="product-description">
            <div class="banner-title">ZX9 SPEAKER</div>
            <div class="banner-text">
              Upgrade to premium speakers that are phenomenally built to deliver
              truly remarkable sound.
            </div>
            <nuxt-link to="/speakers/zx9-speaker">
              <button class="btn-black-filled">See Product</button>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-second">
          <div class="product-description">
            <div class="banner-title">ZX7 SPEAKER</div>
            <nuxt-link to="/speakers/zx7-speaker">
              <button class="btn-black">See Product</button>
            </nuxt-link>
          </div>
          <div class="product-image">
            <img class="product" src="@/assets/img/zx7-speaker.png" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="banner-wrapper">
      <div class="container">
        <div class="banner-third">
          <div class="product-image">
            <img class="product" src="@/assets/img/yx1-speaker.png" alt="" />
          </div>
          <div class="product-description">
            <div class="text-block">
              <div class="banner-title">YX1 EARPHONES</div>
              <nuxt-link to="/earphones/yx1-earphones">
                <button class="btn-black">See Product</button>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AboutCompany />
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss">
.hero-wrapper {
  width: 100%;
  background-color: #141414;
  overflow: hidden;

  margin-bottom: 200px;
  @media (max-width: 700px) {
    margin-bottom: 150px;
  }

  .inner-container {
    position: relative;
    width: 100%;
    height: 730px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #fff;

    @media (max-width: 500px) {
      height: 600px;
    }
    img {
      width: 1440x;
      position: absolute;
      top: 100px;
      right: 0;
      z-index: 0;
    }

    .text-block {
      margin-top: 40px;
      padding: 0 15px;
      position: relative;
      z-index: 1;
      .title-label {
        font-weight: 400;
        font-size: 14px;
        line-height: 19px;
        letter-spacing: 10px;
        opacity: 0.5;
      }
      .title {
        font-weight: 700;
        font-size: 56px;
        line-height: 1em;
        max-width: 400px;
        text-transform: uppercase;
        margin: 26px 0;
        @media (max-width: 500px) {
          font-size: 36px;
        }
      }
      .description {
        font-weight: 500;
        font-size: 15px;
        line-height: 25px;
        max-width: 400px;
        opacity: 0.75;
        margin-bottom: 40px;
      }
      .btn-orange {
        @include button-orange;
      }
    }
    @media (max-width: 750px) {
      justify-content: center;

      img {
        width: 1440px;
        min-width: 500px;
        position: absolute;
        top: 50%;
        right: 50%;
        transform: translate(52%, -45%);
        z-index: 0;
        opacity: 0.5;
      }

      .text-block {
        text-align: center;
        justify-content: center;
      }
    }
  }
}
.banner-wrapper {
  padding: 0 15px;
  margin-bottom: 50px;
  .banner-first {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 560px;
    background-color: $rawSienna;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 140px;
    overflow: hidden;

    border-radius: 8px;

    @media (max-width: 920px) {
      flex-direction: column;
    }

    .circles {
      position: absolute;
      width: 944px;
      left: -160px;
      @media (max-width: 920px) {
        left: 50%;
        transform: translateX(-50%);
        top: -40px;
      }
    }

    .product {
      width: 411px;
      position: relative;
      bottom: -65px;
      @media (max-width: 920px) {
        width: 200px;
        bottom: -80px;
      }
    }

    .product-description {
      color: #fff;
      max-width: 350px;
      @media (max-width: 920px) {
        text-align: center;
      }
      .banner-title {
        font-weight: 700;
        font-size: 56px;
        margin-bottom: 24px;
        @media (max-width: 920px) {
          text-align: center;
        }
        @media (max-width: 450px) {
          font-size: 36px;
        }
      }
      .banner-text {
        font-weight: 500;
        font-size: 15px;
        margin-bottom: 40px;
      }
    }

    .btn-black-filled {
      @include button-black-filled;
      @media (max-width: 920px) {
        margin-bottom: 56px;
      }
    }
  }
  .banner-second {
    width: 100%;
    height: 320px;
    overflow: hidden;
    position: relative;

    border-radius: 8px;

    .product {
      position: absolute;
      z-index: -1;
      top: -400px;
      left: 0;
      min-height: 320px;
      object-fit: cover;
      @media (max-width: 1110px) {
        top: -200px;
      }
      @media (max-width: 770px) {
        top: 0px;
        object-fit: none;
      }
    }

    .product-description {
      padding: 100px;

      @media (max-width: 600px) {
        padding: 100px 50px;
      }
      .banner-title {
        font-weight: 700;
        font-size: 28px;
        margin-bottom: 32px;
        @media (max-width: 770px) {
          max-width: 150px;
        }
      }
    }

    .btn-black {
      @include button-black;
      @media (max-width: 920px) {
        margin-bottom: 56px;
      }
    }
  }
  .banner-third {
    width: 100%;
    height: 320px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 30px;

    margin-bottom: 200px;
    @media (max-width: 700px) {
      margin-bottom: 100px;
    }
    @media (max-width: 600px) {
      flex-direction: column;
      height: auto;
    }

    .product-image {
      width: 50%;
      overflow: hidden;
      height: 100%;
      border-radius: 8px;
      @media (max-width: 600px) {
        width: 100%;
        height: 200px;
      }
      .product {
        object-fit: none;
        position: relative;
        top: -180px;
        @media (max-width: 900px) {
          top: -110px;
        }
        @media (max-width: 750px) {
          top: -20px;
        }
        @media (max-width: 600px) {
          top: -250px;
        }
        @media (max-width: 450px) {
          top: -110px;
        }
      }
    }
    .product-description {
      width: 50%;
      height: 100%;
      background-color: $cultured;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-radius: 8px;
      @media (max-width: 600px) {
        width: 100%;
        height: 200px;
      }
      .text-block {
        @media (max-width: 600px) {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        .banner-title {
          font-weight: 700;
          font-size: 28px;
          margin-bottom: 32px;
          @media (max-width: 770px) {
            max-width: 150px;
          }
          @media (max-width: 600px) {
            max-width: 1000px;
          }
        }
      }
    }

    .btn-black {
      @include button-black;
      @media (max-width: 920px) {
      }
    }
  }
}
</style>
