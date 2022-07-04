<template>
   <div class="banner-wrapper">
      <div class="container">
        <div class="banner-inner">
          <div class="description">
            <div class="description-title">
              Bringing you the <span>best</span> audio gear
            </div>
            <div class="description-text">
              Located at the heart of New York City, Audiophile is the premier
              store for high end headphones, earphones, speakers, and audio
              accessories. We have a large showroom and luxury demonstration
              rooms available for you to browse and experience a wide range of
              our products. Stop by our store to meet some of the fantastic
              people who make Audiophile the best place to buy your portable
              audio equipment.
            </div>
          </div>

          <div class="image">
            <img src="@/assets/img/model-man.png" alt="" />
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.banner-wrapper {
  // width: 100%;
  padding: 0 15px;
  margin-bottom: 50px;
.banner-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 200px;

  @media (max-width: 1000px) {
    flex-direction: column-reverse;
    justify-content: center;
    gap: 64px;
  }
  @media (max-width: 700px) {
    margin-bottom: 100px;
  }
  .description {
    max-width: 450px;
    @media (max-width: 1000px) {
      max-width: 600px;
      text-align: center;
    }

    .description-title {
      font-weight: 700;
      font-size: 40px;
      text-transform: uppercase;
      margin-bottom: 32px;
      span {
        color: $rawSienna;
      }
    }
    .description-text {
      font-weight: 500;
      font-size: 15px;
      line-height: 25px;
      opacity: 0.5;
    }
  }
  .image {
    width: 540px;
    height: 590px;
    overflow: hidden;
    position: relative;
    border-radius: 8px;
    @media (max-width: 1000px) {
      width: 100%;
      height: 300px;
    }

    img {
      position: absolute;
      left: -190px;
      max-width: none;
      @media (max-width: 1200px) {
        top: -100px;
        width: 1200px;
        left: 0;
      }
      @media (max-width: 1200px) {
        left: -200px;
      }
    }
  }
}
}
</style>>

</style>
