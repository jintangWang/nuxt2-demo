<template>
  <section class="solution-detail-container">
    <BannerContent title="SOLUTIONS" sub-title="Home / Solutions / Primary Injection Testing Solutions "
                   :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')">
    </BannerContent>
    <section class="container">
      <ContentLeft></ContentLeft>

      <article class="category-container">
        <h2 class="left-top-line article-title">{{detail.title}}</h2>
        <article class="article-content rich-content" v-html="detail.content"></article>
        <h3 class="down-part left-top-line article-title">DOWNLOAD</h3>
        <ul class="down-list clearfix">
          <li v-if="detail.pdf_1">
            <font-awesome-icon :icon="['far', 'file-pdf']"/>
            <a :href="detail.pdf_1" target="_blank">{{detail.title}}1.pdf</a>
          </li>
          <li v-if="detail.pdf_2">
            <font-awesome-icon :icon="['far', 'file-pdf']"/>
            <a :href="detail.pdf_2" target="_blank">{{detail.title}}2.pdf</a>
          </li>
          <li v-if="detail.pdf_3">
            <font-awesome-icon :icon="['far', 'file-pdf']"/>
            <a :href="detail.pdf_3" target="_blank">{{detail.title}}3.pdf</a>
          </li>
        </ul>

        <figure ref="video-wrap" class="video-wrapper" v-if="detail.ytb_video">
          <iframe :width="videoW" :height="videoW /16 * 9" :src="embed(detail.ytb_video)" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </figure>
        <button class="request-btn" @click="showRfq">REQUEST A QUOTE </button>

        <h3 class="left-top-line article-title" v-if="recommend_products.length > 0">RELATED PRODUCTS</h3>
        <ProductSwiper :list="recommend_products"></ProductSwiper>
      </article>

      <b-modal ref="rfq-modal" scrollable hide-footer size="lg" centered>
        <RfqForm :select-content="false" :category="{'category_type': 'solution', category_id: detail.category_id_1}"/>
      </b-modal>

    </section>

    <Comments
      :comment="comment"
      type="solution"
      :article_id="$route.query.id"
      @refresh="refresh"/>

  </section>
</template>

<script>
  import BannerContent from "@/components/BannerContent";
  import ContentLeft from "@/components/ContentLeft";
  import Thumbnail from "@/components/Thumbnail";
  import ProductSwiper from "@/components/ProductSwiper";
  import Comments from "@/components/Comments";
  import syncApiService from '@/services/sync-api-service.js';
  import { BModal } from 'bootstrap-vue';
  import RfqForm from "@/components/RfqForm";
  import jsonld from '@/utils/jsonld.js';

  export default {
    name: "solutions-detail",
    head() {
      const article = {
        url: this.$route.path,
        title: this.detail.title,
        image: [
          this.detail.image,
        ],
        publishDate: this.detail.create_time
      };
      let head = {
        title: this.detail.title + '-APT Power Technology',
        meta: [
          { hid: 'keywords', name: 'keywords', content: this.detail.keywords },
          { hid: 'description', name: 'description', content: this.detail.description }
        ],
        __dangerouslyDisableSanitizers: ['script'],
        script: [
          jsonld.getArticle(article)
        ],
      };

      // 添加 how to json ld
      let contentHtml = this.detail.content;
      let arr = contentHtml.match(/<blockquote>(.|\n)*?<\/blockquote>/g);
      if (!arr || arr.length === 0) return head;
      let steps = arr.map((item,index) => {
        if (index === 0) {
          let startI = item.indexOf('<strong');
          let realStart = item.indexOf('>', startI) + 1;
          let realEnd = item.indexOf('</strong>', realStart);
          return item.substring(realStart, realEnd);
        } else {
          let startI = item.indexOf('<span');
          let realStart = item.indexOf('>', startI) + 1;
          let realEnd = item.indexOf('</span>', realStart);
          return item.substring(realStart, realEnd);
        }
      });

      head.script.push(jsonld.getHowTo(steps));
      return head;
    },
    async asyncData(context) {
      const param = { id: context.query.id };
      const res = await syncApiService.get('api/solution/getDetail', param).then(data => {
        return data;
      }).catch(err => {
        return { detail: {} };
      });
      return res;
    },
    data() {
      return {
        videoW: 777
      };
    },
    mounted() {
      this.$nextTick(() => {
        if (this.detail.ytb_video && this.$refs['video-wrap']) {
          this.videoW = this.$refs['video-wrap'].offsetWidth;
        }
      })
    },
    methods: {
      refresh() {
        const param = { id: this.$route.query.id };
        syncApiService.get('api/solution/getDetail', param).then(data => {
          this.comment = data.comment;
        }).catch(err => {});
      },
      showRfq() {
        this.$refs['rfq-modal'].show();
      },
      embed(url) {
        if (!url) return;
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
      Thumbnail,
      ProductSwiper,
      Comments,
      BModal,
      RfqForm
    }
  }
</script>

<style scoped lang="stylus">
  .solution-detail-container
    background #e7e9ea
    .container
      display flex
      padding-top: 70px
    .category-container
      display flex
      flex-direction column
      width: 70%
      padding-bottom 120px
      @media (max-width: 767px)
        width: 100%
    .down-part
      margin-top 40px
    .down-list
      margin-bottom 48px
      li
        float left
        font-family: OpenSans
        font-size: 13px
        line-height: 1.23
        color: #777777
        margin-right 12px
        &:hover
          color #008fd7
          a
            color #008fd7
      svg
        margin-left: 2px
        margin-right: 6px
    .video-wrapper
      width 100%
      video
        width 100%
    .request-btn
      position: relative
      width: 216px
      height: 50px
      margin: -25px auto  50px
      border-radius: 25px
      background-color: #008fd7
      font-family: Raleway-Bold
      font-size: 13px
      font-weight: bold
      color: #ffffff
    .article-title
      /*此处字体有数字，使用Raleway显示有问题*/
      font-family inherit

</style>
