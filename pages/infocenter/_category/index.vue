<template>
  <section class="info-sublist-container">
    <BannerContent title="Infocenter" sub-title="Home / InfoCenter /"
                   :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')">
    </BannerContent>
    <section class="container">
      <article class="list-container">
        <h2 class="list-title">LIST</h2>
        <div v-for="item in list" :key="item.title">
          <nuxt-link :to="handlerUrl(item.title) + '?id=' + item.id" append>
            <article class="list-item">
              <div>
                <h5>{{item.title}}</h5>
<!--                <p class="phone-hide">{{item.description}}</p>-->
              </div>
              <font-awesome-icon icon="angle-right" class="item-arrow"/>
            </article>
          </nuxt-link>
        </div>
      </article>
      <NewsRight class="phone-hide"></NewsRight>
    </section>
  </section>
</template>

<script>
  import BannerContent from "@/components/BannerContent";
  import NewsRight from "@/components/NewsRight";
  import syncApiService from '@/services/sync-api-service.js';
  import { getTitle } from '@/utils/common.js'

  export default {
    name: "info-center-list",
    head() {
      return {
        title: getTitle(this.$route.path) + '-APT Power Technology'
      };
    },
    async asyncData(context) {
      const res = await syncApiService.get('/api/infocenter/getList?category_id_' + context.query.id).then(data => {
        return data;
      }).catch(err => {
        return [];
      });
      return { list : res || []};
    },
    data() {
      return {
      };
    },
    components: {
      BannerContent, NewsRight
    }
  }
</script>

<style scoped lang="stylus">
  @import "~assets/css/child-page/page-info-sublist.styl";

</style>
