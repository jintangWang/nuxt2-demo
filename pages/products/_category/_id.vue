<template>
  <section class="products-detail-container">
    <BannerContent title="PRODUCTS" sub-title="Home / Primary Injection Test Equipment / TriRaptor Three-phase High Current Injection "
                   :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')">
    </BannerContent>
    <section class="container">
      <ContentLeft></ContentLeft>

      <section class="detail-container">
        <section class="row">
          <section class="col-md-6 col-sm-12">
            <div v-swiper:innerMySwiper="swiperOption" class="swiper-container">
              <div class="swiper-wrapper">
                <div class="swiper-slide">
                  <img class="product-img" v-lazy="info.products_image1" alt="products_image1"
                       @click="showModal(1)">
                </div>
                <div class="swiper-slide" v-if="info.products_image2">
                  <img class="product-img" v-lazy="info.products_image2" alt="products_image2"
                       @click="showModal(2)">
                </div>
                <div class="swiper-slide" v-if="info.products_image3">
                  <img class="product-img" v-lazy="info.products_image3" alt="products_image3"
                       @click="showModal(3)">
                </div>
              </div>
              <div class="swiper-pagination swiper-pagination-bullets"></div>
            </div>

            <div class="circle-wrapper justify-content-between">
              <div class="circle-box">
                <div class="circle-item" v-show="info.type === 3 || info.type === 4">
                  <div class="circle regular"></div>
                  <span>Regular</span>
                </div>
                <div class="circle-item" v-show="info.type === 1 || info.type === 2">
                  <div class="circle customized"></div>
                  <span>Customized</span>
                </div>
                <div class="circle-item" v-show="info.type === 1 || info.type === 3">
                  <div class="circle trailered_movable"></div>
                  <span>Trailered</span>
                </div>
                <div class="circle-item" v-show="info.type === 2 || info.type === 4">
                  <div class="circle anchored_no_movable"></div>
                  <span>Anchored</span>
                </div>
              </div>
            </div>
          </section>
          <article class="col-md-6 col-sm-12 left-top-line article-container">
            <h2 class="article-title">{{info.products_title}}</h2>
            <p class="article-content">{{info.description}}</p>
          </article>
        </section>
        <nav class="nav" @click="toggleTab">
          <a class="nav-item" :class="{'left-top-line': tabIndex === 0}" data-index="0" href="javascript:;">Description</a>
          <a class="nav-item" :class="{'left-top-line': tabIndex === 1}" data-index="1" href="javascript:;">Related Products</a>
          <a class="nav-item" :class="{'left-top-line': tabIndex === 2}" data-index="2" href="javascript:;">Documents</a>
          <button class="request-btn" @click="showRfq">REQUEST A QUOTE</button>
        </nav>

        <section class="tab1" v-if="tabIndex === 0">
          <article class="rich-content" v-html="info.products_content"></article>
          <figure ref="video-wrap" class="video-wrapper" v-if="info.youtobe">
            <iframe :width="videoW" :height="videoW /16 * 9" :src="embed(info.youtobe)" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </figure>
        </section>

        <section class="tab2" v-if="tabIndex === 1">
          <ProductSwiper :list="relation_products"></ProductSwiper>
        </section>

        <section class="tab3" v-if="tabIndex === 2">
          <ul class="down-list">
            <li><font-awesome-icon :icon="['far', 'file-pdf']"/>
              <a :href="info.pdf_1" target="_blank">{{info.products_title}}.pdf</a>
            </li>
          </ul>
        </section>
      </section>

      <b-modal ref="img-modal" hide-footer size="lg" centered>
        <figure>
          <img class="modal-img" alt="products_image"
               v-lazy="info['products_hd_image' + modalIndex] || info['products_image' + modalIndex]" >
        </figure>
      </b-modal>


      <b-modal ref="rfq-modal" scrollable hide-footer size="lg" centered>
        <RfqForm :select-content="false" :category="{'category_type': 'products', category_id: info.category_id_1}"/>
      </b-modal>

    </section>

    <Comments
      :comment="comment"
      type="products"
      :article_id="$route.query.id"
      @refresh="refresh"/>

  </section>
</template>

<script>
  import BannerContent from "@/components/BannerContent";
  import ContentLeft from "@/components/ContentLeft";
  import ProductSwiper from "@/components/ProductSwiper";
  import Comments from "@/components/Comments";
  import syncApiService from '@/services/sync-api-service.js';
  import { BModal } from 'bootstrap-vue';
  import RfqForm from "@/components/RfqForm";
  import jsonld from '@/utils/jsonld.js';

  export default {
    name: "products_id",
    head() {
      if (Object.keys(this.info).length === 0) return {};
      const article = {
        url: this.$route.path,
        title: this.info.products_title,
        image: [
          this.info.products_image1,
          this.info.products_hd_image1
        ],
        publishDate: this.info.add_time,
        modifiedDate: this.info.update_time
      };
      return {
        title: this.info.products_title + '-APT Power Technology',
        meta: [
          { hid: 'keywords', name: 'keywords', content: this.info.keywords },
          { hid: 'description', name: 'description', content: this.info.description }
        ],
        __dangerouslyDisableSanitizers: ['script'],
        script: [
          jsonld.getArticle(article)
        ],
      };
    },
    async asyncData(context) {
      const param = { id: context.query.id };
      const res = await syncApiService.get('api/products/detail', param).then(data => {
        let arr = data.relation_products;
        while (arr.length % 3 !== 0) {
          arr.push({});
        }
        data.relation_products = arr;
        return data;
      }).catch(err => {
        return {
          info: {},
          relation_products: [],
          comment: []
        };
      });
      return res;
    },
    data() {
      return {
        tabIndex: 0,
        swiperOption: {
          slidesPerView: 'auto',
          centeredSlides: true,
          spaceBetween: 30,
          pagination: {
            el: '.swiper-pagination',
          },
        },
        modalIndex: 0,
        videoW: 777
      };
    },
    mounted() {
      this.$nextTick(() => {
        if (this.info.youtobe && this.$refs['video-wrap']) {
          this.videoW = this.$refs['video-wrap'].offsetWidth;
        }
      })
    },
    methods: {
      toggleTab(e) {
        const index = e.target.dataset.index - 0;
        if (index > 2 || Number.isNaN(index)) { // 按钮 或 非tab的地方
          return;
        }
        this.tabIndex = index;
      },
      refresh() {
        const param = { id: this.$route.query.id };
        syncApiService.get('api/products/detail', param).then(data => {
          this.comment = data.comment;
        }).catch(err => {});
      },
      showModal(index) {
        this.modalIndex = index;
        this.$refs['img-modal'].show();
      },
      showRfq() {
        this.$refs['rfq-modal'].show();
      },
      embed(url) {
        const domainIndex = url.indexOf('/', 10); // 跳过https
        const domain = url.substring(0, domainIndex);
        const tail = url.split('?')[1];
        const tailArr = tail.split('&');
        const tailObj = {};
        tailArr.forEach((item) => {
          tailObj[item.split('=')[0]] = item.split('=')[1];
        });
        return domain + '/embed/' + tailObj.v;
      }
    },
    components: {
      BannerContent,
      ContentLeft,
      ProductSwiper,
      Comments,
      BModal,
      RfqForm
    }
  }
</script>

<style scoped lang="stylus">
  .products-detail-container
    background #e7e9ea
    .container
      display flex
      padding-top: 70px
      padding-bottom 40px
    .detail-container
      display flex
      flex-direction column
      width: 70%
      @media (max-width: 767px)
        width: 100%
    .article-title
      /*此处字体有数字，使用Raleway显示有问题*/
      font-family inherit
      margin-bottom 20px
    .nav
      position relative
      margin-top 40px
      margin-bottom 40px
      align-items center
      text-transform uppercase
      .nav-item
        position relative
        padding: 10px 25px 10px 0
        font-family: Raleway-ExtraBold
        font-size: 12px
        font-weight: 800
        color: #333333
        line-height: 1.67
    .swiper-container
      width 100%
    .tab1
      .video
        width: 560px
        height: 320px
        margin 0 auto 40px
        video
          width 100%
    .circle-wrapper
      margin-top 20px
      display flex
      position: relative
      align-items flex-start
    .circle-box
      width 100%
      justify-content space-evenly
      display flex
    .request-btn
      position absolute
      right: 0
      padding 20px 16px
      border-radius: 25px
      background-color: #008fd7
      font-family: Raleway-Bold
      font-size: 13px
      font-weight: bold
      line-height: 9px
      white-space nowrap
      color: #ffffff
    .circle-item
      display flex
      flex-direction column
      align-items center
      span
        margin-top 5px
    .circle
      width: 50px
      height: 50px
      border: solid 1px #ffffff
      border-radius 100%
      flex-shrink 0
      display flex
      justify-content center
      align-items center
      background no-repeat 56% center/50% white
      &.regular
        background-image url("~assets/img/submenu/01_Regular.jpg")
      &.trailered_movable
        background-image url("~assets/img/submenu/04_Trailered_movable.jpg")
      &.customized
        background-image url("~assets/img/submenu/03_Customized.jpg")
      &.anchored_no_movable
        background-image url("~assets/img/submenu/02_Anchored_no_movable.jpg")
  .modal-img
    margin 0 auto
    width: 100%
  .product-img
    width 100%

    // 第二个tab下
    .tab2
      overflow hidden

    .tab3
      .down-list
        li
          font-family: OpenSans
          font-size: 13px
          line-height: 1.23
          color: #777777
        svg
          margin-left: 2px
          margin-right: 10px

  @media (min-width: 768px) and (max-width: 1024px)
    .products-detail-container
      .nav .nav-item
        padding-right 12px
      .tab1
        .video
          width 100%
  @media (max-width: 767px)
    .products-detail-container
      .container
        padding-top 40px
      .nav
        justify-content: space-between
        /*flex-wrap: nowrap*/
        overflow: visible
        .nav-item
          padding-right 0
          font-size 14px
      .article-container
        margin-top 40px
      .tab1
        .video
          width 100%
      .circle-wrapper .circle-box
        padding 0
      .request-btn
        position static
        width 100%
        text-align center
        border-radius 12px
        font-size: 20px
        font-weight: bold
      .code-wrapper
        margin-top 12px
</style>
