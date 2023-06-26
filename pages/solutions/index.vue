<template>
  <section class="page-list-container">
    <BannerContent title="SOLUTIONS" sub-title="Home   /   Solutions "
                   :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')">
    </BannerContent>
    <section class="container solution-container">
<!--      <div class="radio-wrapper">-->
<!--        <input v-model="type" checked type="radio" name="radioType" id="radio_all" value="">-->
<!--        <label for="radio_all">All</label>-->
<!--        <input v-model="type" type="radio" name="radioType" id="radio_custom" :value="1">-->
<!--        <label for="radio_custom">定制</label>-->
<!--        <input v-model="type" type="radio" name="radioType" id="radio_movable" :value="2">-->
<!--        <label for="radio_movable">可移动</label>-->
<!--      </div>-->
      <div class="list-wrapper">
        <nuxt-link v-for="(item, index) in list" :key="'link'+index"
                   class="item-box"
                   :to="handlerUrl(item.category_id_1_name) + '/' + handlerUrl(item.title) + '?id=' + item.id"
                   append>
          <article class="item-article">
<!--            <span class="type" v-if="item.type">{{getType(item.type)}}</span>-->
            <h3 class="box-title">{{item.title}}</h3>
<!--            <p class="box-content">{{item.description}}</p>-->
            <figure>
              <img v-lazy="item.image" class="scale-img box-image" alt="solution_image">
            </figure>
            <span class="read-more">
            Read more
            <font-awesome-icon icon="external-link-alt"/>
          </span>
          </article>
        </nuxt-link>
      </div>

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
    name: "solution-list",
    async asyncData(context) {
      const param = {
        page: 1
      };
      return await syncApiService.get('api/solution/getList', param).then(data => {
        return {
          list: data.solution_list,
          rows: data.count
        };
      }).catch(err => {
        return {};
      });
    },
    head() {
      return {
        title: 'Solutions-APT Power Technology'
      };
    },
    data() {
      return {
        // type: '',
        currentPage: 1
      };
    },
    methods: {
      httpList(){
        const param = {
          page: this.currentPage
        };
        // this.type && (param.type = this.type);
        syncApiService.get('api/solution/getList', param).then(data => {
          this.list = data.solution_list;
        }).catch(err => {});
      },
      // getType(index) {
      //   switch (index) {
      //     case 1:
      //       return '定制';
      //     case 2:
      //       return '可移动';
      //     default:
      //       return '';
      //   }
      // },
    },
    watch: {
      currentPage() {
        this.httpList();
      },
      // type() {
      //   if (this.currentPage !== 1) {
      //     this.currentPage = 1;
      //   } else {
      //     this.httpList();
      //   }
      // }
    },
    components: {
      BannerContent,
      BPagination
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/child-page/page-list.styl";

  .page-list-container
    .solution-container
      padding-top 50px
</style>
