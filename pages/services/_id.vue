<template>
  <section class="info-detail-container">
    <BannerContent title="Services" sub-title="Home   /   Services"
                   :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')">
    </BannerContent>
    <section class="container">
      <article class="detail-container">
        <figure>
          <img v-lazy="data.image" alt="category_image">
        </figure>
        <h2 class="title">{{data.title}}</h2>
        <time class="time">{{data.create_time}}</time>
        <article class="content rich-content" v-html="data.content"></article>

        <ProductSwiper class="product-swiper"/>
      </article>
      <NewsRight class="phone-hide"></NewsRight>
    </section>
  </section>
</template>

<script>
  import BannerContent from "@/components/BannerContent";
  import NewsRight from "@/components/NewsRight";
  import ProductSwiper from "@/components/ProductSwiper";
  import syncApiService from '@/services/sync-api-service.js';
  import { setRecommendProducts, getTitle } from '@/utils/common.js'
  import jsonld from '@/utils/jsonld.js';


  export default {
    name: "service-detail",
    head() {
      let head = {
        title: getTitle(this.$route.path) + '-APT Power Technology',
        meta: [
          { hid: 'keywords', name: 'keywords', content: this.data.keywords },
          { hid: 'description', name: 'description', content: this.data.description }
        ],
      };
      if (!this.data || Object.keys(this.data).length === 0) return head;
      const article = {
        url: this.$route.path,
        title: this.data.title,
        image: [
          this.data.image,
        ],
        publishDate: this.data.create_time,
      };
      return Object.assign(head, {
        __dangerouslyDisableSanitizers: ['script'],
        script: [
          jsonld.getArticle(article)
        ],
      });
    },
    async asyncData(context) {
      const param = {id: context.query.id};
      const res = await syncApiService.get('api/service/getDetail', param).then(data => {
        return data;
      }).catch(err => {
        return {};
      });
      return {
        data: res || {}
      };
    },
    async fetch(context) {
      await setRecommendProducts(context);
    },
    data() {
      return {
      };
    },
    components: {
      BannerContent,
      NewsRight,
      ProductSwiper
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/child-page/page-info-detail.styl";


</style>
