<template>
  <section class="page-category-container">
    <BannerContent title="PRODUCTS" sub-title="Home / Primary Injection Test Equipment / TriRaptor Three-phase High Current Injection "
                   :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')">
    </BannerContent>
    <section class="container">
      <ContentLeft></ContentLeft>

      <article class="category-container">
        <h2 class="left-top-line article-title">{{category_info.category_name}}</h2>
        <article class="article-content" v-html="category_info.describe"></article>
        <figure v-if="category_info.category_image">
          <img v-lazy="category_info.category_image" alt="category_image">
        </figure>
        <section class="list-wrapper">
          <Thumbnail
            :item="item"
            :style="{'height': item.id ? 'auto' : 0}"
            v-for="(item,index) in list"
            :to="'/Products/' + handlerUrl(item.category_id_1_name) + '/' + handlerUrl(item.products_title) + '?id=' + item.id"
            :key="'item' + index"/>
        </section>

        <section class="pagination-wrapper">
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="6"
          ></b-pagination>
        </section>

      </article>
    </section>
  </section>
</template>

<script>
  import BannerContent from "@/components/BannerContent";
  import ContentLeft from "@/components/ContentLeft";
  import Thumbnail from "@/components/Thumbnail";
  import { BPagination } from 'bootstrap-vue';
  import syncApiService from '@/services/sync-api-service.js';


  export default {
    name: "products-category-list",
    head() {
      return {
        title: (this.category_info.title || 'Products') + '-APT Power Technology',
        meta: [
          { hid: 'keywords', name: 'keywords', content: this.category_info.keywords },
          { hid: 'description', name: 'description', content: this.category_info.description }
        ]
      };
    },
    async asyncData(context) {
      const param = {
        page: 1
      };
      if (context.query.level && context.query.level === 'sub') {
        param.category_id_2 = context.query.id
      } else {
        param.category_id_1 = context.query.id
      }
      const res = await syncApiService.get('api/products/getSecondList', param).then(data => {
        let arr = data.products_list;
        while (arr.length % 3 !== 0) {
          arr.push({});
        }
        return {
          category_info: data.category_info || {},
          list: arr,
          rows: data.count
        };
      }).catch(err => {
        return {
          category_info: {},
          list: [],
          rows: 0
        };
      });
      return res;
    },
    data() {
      return {
        currentPage: 1
      };
    },
    methods: {
      httpList(){
        const param = {
          page: this.currentPage
        };
        if (this.$route.query.level && this.$route.query.level === 'sub') {
          param.category_id_2 = this.$route.query.id
        } else {
          param.category_id_1 = this.$route.query.id
        }

        syncApiService.get('api/products/getSecondList', param).then(data => {
          let arr = data.products_list;
          while (arr.length % 3 !== 0) {
            arr.push({});
          }
          this.list = arr;
        }).catch(err => {});
      },
    },
    watch: {
      currentPage() {
        this.httpList();
      }
    },
    components: {
      BannerContent,
      ContentLeft,
      Thumbnail,
      BPagination
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/child-page/page-sub-list.styl";
</style>
