<template>
  <div class="first-page">
    <div v-swiper:mySwiper="swiperOption">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(banner,index) in banners" :key="index">
          <div>
            <img class="swiper-img swiper-lazy" :data-src="banner.img" :alt="'banner_' + index">
            <div class="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            <div class="hero-content">
              <div data-swiper-parallax-duration="1000" data-swiper-parallax-y="-300">
                <h1>{{banner.content}}</h1>
                <p>{{banner.title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inner-swiper">
      <div v-swiper:innerMySwiper="innerSwiperOption" class="inner-swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(group, index) in groupProducts" :key="'group'+index">
            <div class="inner-swiper-item">
              <Thumbnail
                :style="{'height': item.id ? 'auto' : 0}"
                :item="item"
                v-for="(item,innerIndex) in group"
                :to="'/Products/' + handlerUrl(item.category_id_1_name) + '/' + handlerUrl(item.products_title) + '?id=' + item.id"
                :key="'item' + index + innerIndex" />
            </div>
          </div>
        </div>
        <div class="swiper-button-prev swiper-button-white mobile-hide"></div>
        <div class="swiper-button-next swiper-button-white mobile-hide"></div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
      </div>
    </div>
    <div class="des-wrapper">
      <div class="des-content">
        <div class="des-line"></div>
        <h4>TAILOR-MADE</h4>
        <p>ELECTRICAL TESTING EQUIPMENT</p>
      </div>
    </div>
  </div>
</template>

<script>
  import Thumbnail from "@/components/Thumbnail";

  export default {
    name: "Swiper",
    data() {
      return {
        swiperOption: {
          loop: true,
          parallax: true,
          lazy : true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false
          },
          slidesPerView: 'auto',
          centeredSlides: true,
          effect: 'fade',
          spaceBetween: 30
        },
        innerSwiperOption: {
          // loop: true,
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            // dynamicBullets: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
        },
        isMobile: false
      }
    },
    props: {
      info: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    mounted() {
      if (window.document.documentElement.offsetWidth < 576) {
        this.isMobile = true;
      }
    },
    computed: {
      banners() {
        return [
          {
            img: this.info.rotation_chart_1,
            content: this.info.rotation_content_1,
            title: this.info.rotation_title_1
          },
          {
            img: this.info.rotation_chart_2,
            content: this.info.rotation_content_2,
            title: this.info.rotation_title_2
          },
          {
            img: this.info.rotation_chart_3,
            content: this.info.rotation_content_3,
            title: this.info.rotation_title_3
          },
          {
            img: this.info.rotation_chart_4,
            content: this.info.rotation_content_4,
            title: this.info.rotation_title_4
          }
        ];
      },
      groupProducts() {
        let result = [];
        let groupL = this.isMobile ? 1 : 3;
        let list = this.$store.state.recommendProducts;
        for (let i =0; i < list.length; i += groupL) {
          let item = [];
          item.push(list[i]);
          if (!this.isMobile) {
            list[i + 1] && item.push(list[i + 1]);
            list[i + 2] && item.push(list[i + 2]);
            while (item.length < 3) {
              item.push({});
            }
          }
          result.push(item);
        }
        return result;
      }
    },
    components: { Thumbnail }
  }
</script>


<style lang="stylus">
  .first-page
    position relative
    overflow hidden
    .swiper-img
      height: 844px
      max-width none
      margin-left: 50%;
      transform: translateX(-50%);
    .hero-content
      position: absolute
      top: 25%
      left: 50%
      transform translateX(-50%)
      h1
        width: 100%
        font-family: Raleway-ExtraBold
        font-size: 66px
        font-weight: 800
        line-height: 0.83
        text-align: center
        text-shadow: 0.3px 0.4px 1.5px #aaaaaa
        color: #ffffff
        &:after
          width: 66px
          content: ''
          display: block
          margin: 20px auto 10px
          background: #e62129
          height: 4px
          overflow: hidden
      p
        margin-top: 25px
        text-align center
        overflow: hidden
        font-family: OpenSans
        font-size: 30px
        line-height: 1.2
        color: #fcfcfc


    .inner-swiper
      position absolute
      top: 624px
      left: 50%
      transform translateX(-50%)
      z-index: 2
      .inner-swiper-container
        overflow visible
      .inner-swiper-item
        margin: 0 auto
        display flex
        justify-content space-between
      .swiper-pagination
        bottom -45px
      .swiper-pagination-bullet
        width: 8px
        height: 8px
        display: inline-block
        border-radius: 100%
        background: #dddddd
        margin: 0 4px
        opacity: 1
      .swiper-pagination-bullet-active
        background: #006db7
      .thumbnail
        width 280px
        margin-top 0
      .swiper-button-prev, .swiper-button-next
        width: 40px
        height: 40px
        background-color: #1b2936
        background-size 13px 13px


    .des-wrapper
      position relative
      height: 335px
      background: #1b2936
      overflow hidden
      .des-content
        text-align center
        margin-top: 221px
        .des-line
          width: 30px
          height: 3px
          background-color: #e62129
          margin: 0 auto
        h4
          font-size: 30px
          font-weight: bold
          margin-top: 21px
          margin-bottom 13px
          color: #ffffff
          font-stretch: normal
          font-style: normal
          line-height: 0.67
          font-family Raleway-Bold
        p
          font-size: 13px
          font-weight: 600
          color: #ffffff
          font-stretch: normal
          font-style: normal
          line-height: 1.54
          letter-spacing: normal
          font-family Raleway-SemiBold

  @media (min-width: 1025px)
    .first-page
      .hero-content
        top: 30%
        width: 900px
      .inner-swiper-container
        width: 100vw
      .inner-swiper-item
        width: 1004px
      .swiper-button-prev
        left: 50%
        margin-left: -580px
        &:hover
          background-color #e62129
      .swiper-button-next
        left: 50%
        margin-left: 540px
        &:hover
          background-color #e62129
  @media (min-width: 768px) and (max-width: 1024px)
    .first-page
      .hero-content
        width: 90%
      .inner-swiper-container
        width: 95vw
      .inner-swiper-item
        width: 100%
        .thumbnail
          width 32%
  @media (max-width: 767px)
    .first-page
      .hero-content
        width: 90%
        h1
          font-size 45px
      .inner-swiper-container
        width: 95vw
      .inner-swiper .inner-swiper-item
        width: 85%
        justify-content center
        .thumbnail:not(:first-child)
          display: none
</style>
