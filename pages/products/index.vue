<template>
  <section class="page-list-container product-list-container">
    <BannerContent title="Products" sub-title="Home   /   Products "
                   :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')">
    </BannerContent>
    <section class="container">
      <section class="radio-wrapper">
        <input v-model="type" checked type="radio" name="radioType" id="radio_all" value="">
        <label for="radio_all">All</label>
        <input v-model="type" type="radio" name="radioType" id="radio_custom" :value="1">
        <label for="radio_custom">Customized</label>
        <input v-model="type" type="radio" name="radioType" id="radio_movable" :value="2">
        <label for="radio_movable">Trailered</label>
      </section>
      <section class="list-wrapper">
        <nuxt-link v-for="(item, index) in list" :key="'link'+index"
                   class="item-box"
                   :to="handlerUrl(item.category_id_1_name) + '/' + handlerUrl(item.products_title) + '?id=' + item.id"
                   append>
          <article class="item-article">
            <h3 class="box-title">{{item.products_title}}</h3>
<!--            <p class="box-content">{{item.description}}</p>-->
            <figure class="box-img-figure">
              <img v-lazy="item.products_image1" class="scale-img" :alt="item.products_title + ' img'">
            </figure>
            <div class="read-more">
              <div class="type">
                <div class="circle-item" v-show="item.type === 3 || item.type === 4">
                  <div class="circle regular"></div>
                </div>
                <div class="circle-item" v-show="item.type === 1 || item.type === 2">
                  <div class="circle customized"></div>
                </div>
                <div class="circle-item" v-show="item.type === 1 || item.type === 3">
                  <div class="circle trailered_movable"></div>
                </div>
                <div class="circle-item" v-show="item.type === 2 || item.type === 4">
                  <div class="circle anchored_no_movable"></div>
                </div>
              </div>
              <span>
                Read more
                <font-awesome-icon icon="external-link-alt"/>
              </span>
          </div>
          </article>
        </nuxt-link>
      </section>

      <section class="pagination-wrapper">
        <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="6"
        ></b-pagination>
      </section>
    </section>
  </section>
</template>

<script>
  import BannerContent from "@/components/BannerContent";
  import { BPagination } from 'bootstrap-vue';
  import syncApiService from '@/services/sync-api-service.js';

  export default {
    name: "products-list",
    head() {
      return {
        title: 'Products-APT Power Technology'
      };
    },
    async asyncData({params, error}) {
      const param = {page: 1};
      const res = await syncApiService.get('api/products/index', param).then(data => {
        return {
          list: data.products,
          rows: data.count
        };
      }).catch(err => {
        return {};
      });
      return res;
    },
    data() {
      return {
        type: '',
        currentPage: 1
      };
    },
    methods: {
      httpList(){
        const param = {page: this.currentPage};
        this.type && (param.type = this.type);
        syncApiService.get('api/products/index', param).then(data => {
          this.list = data.products;
        }).catch(err => {});
      },
      getType(index) {
        switch (index) {
          case 1:
            return 'Customized';
          case 2:
            return 'Trailered';
          default:
            return 'ALL';
        }
      }
    },
    watch: {
      currentPage() {
        this.httpList();
      },
      type() {
        if (this.currentPage !== 1) {
          this.currentPage = 1;
        } else {
          this.httpList();
        }
      }
    },
    components: {
      BannerContent,
      BPagination
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/child-page/page-list.styl";
  .product-list-container
    .box-img-figure
      position relative
    .list-wrapper .item-box .read-more
      width: 100%
      display: flex
      justify-content: space-between
      align-items: center
      margin-top 10px
      margin-right: 0
      padding-right 14px
    .type
      display flex
    .circle-item
      display flex
      flex-direction column
      align-items center
      span
        margin-top 5px
    .circle
      width: 50px
      height: 50px
      border: solid 1px #eee
      border-radius 100%
      flex-shrink 0
      display flex
      justify-content center
      align-items center
      margin-left: 8px
      background no-repeat 56% center/50% white
      @media (min-width: 768px) and (max-width: 1024px)
        width 40px
        height 40px
      &.regular
        background-image url("~assets/img/submenu/01_Regular.jpg")
      &.trailered_movable
        background-image url("~assets/img/submenu/04_Trailered_movable.jpg")
      &.customized
        background-image url("~assets/img/submenu/03_Customized.jpg")
      &.anchored_no_movable
        background-image url("~assets/img/submenu/02_Anchored_no_movable.jpg")
</style>
