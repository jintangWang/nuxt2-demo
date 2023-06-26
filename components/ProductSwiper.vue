<template>
  <div class="inner-swiper-wrapper">
    <div v-swiper:innerMySwiper="innerSwiperOption" class="inner-swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(group, index) in groupList" :key="'group'+index">
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
    <div class="swiper-pagination swiper-pagination-bullets"></div>
  </div>
  </div>
</template>

<script>
  import Thumbnail from "@/components/Thumbnail";


  export default {
    name: "ProductSwiper",
    data() {
      return {
        isMobile: false,
        innerSwiperOption: {
          // loop: true,
          slidesPerView: 'auto',
          // centeredSlides: true,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
            // dynamicBullets: true
          },
        },
      }
    },
    props: {
      list: {
        type: Array,
        default() {
          return this.$store.state.recommendProducts;
        }
      }
    },
    mounted() {
      if (window.document.documentElement.offsetWidth < 576) {
        this.isMobile = true;
      }
    },
    computed: {
      groupList() {
        let result = [];
        let groupL = this.isMobile ? 1 : 3;
        for (let i =0; i < this.list.length; i += groupL) {
          let item = [];
          item.push(this.list[i]);
          if (!this.isMobile) {
            this.list[i + 1] && item.push(this.list[i + 1]);
            this.list[i + 2] && item.push(this.list[i + 2]);
            while (item.length < 3) {
              item.push({})
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

<style scoped lang="stylus">
  .inner-swiper-wrapper
    overflow hidden
  .inner-swiper-container
    overflow visible
    position relative
    .inner-swiper-item
      margin: 0 auto
      display flex
      justify-content space-between
      @media (max-width: 767px)
        &
          width: 85%
          justify-content center
          .thumbnail
            width 280px
          .thumbnail:not(:first-child)
            display: none
    .swiper-pagination
      bottom -5px
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
</style>
