<template>
    <section class="info-container">
      <BannerContent title="Infocenter" sub-title="Home   /   InfoCenter"
                     :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')">
      </BannerContent>

      <section class="container">
        <section class="row product-section">
          <article class="col-md-8 col-sm-12 left-top-line">
            <nuxt-link :to="handlerUrl(data[0].category_name) + '?id=' + data[0].id" append>
              <h2 class="article-title">{{data[0].category_name}}</h2>
            </nuxt-link>
            <article class="article-content" v-html="data[0].describe"></article>
          </article>
          <figure class="col-md-4 col-sm-12">
            <img v-lazy="data[0].category_image" alt="category_image">
          </figure>
<!--          <div v-html="list[0].describe"></div>-->
        </section>
      </section>

      <section class="solution-section">
        <section class="container">
          <section class="row ">
            <article class="col-md-6 phone-hide"></article>
            <article class="col-md-6 col-sm-12 solution-content left-top-line">
              <nuxt-link :to="handlerUrl(data[1].category_name) + '?id=' + data[1].id" append>
                <h2 class="article-title">{{data[1].category_name}}</h2>
              </nuxt-link>
<!--              <h4>Welcome, we are APT experienced  company  in over 150 countries accross the world.</h4>-->
              <article class="article-content" v-html="data[1].describe"></article>
            </article>
          </section>
        </section>
      </section>

      <section class="container">
        <section class="row application-section">
          <article class="col-md-5 col-sm-12 left-top-line">
            <nuxt-link :to="handlerUrl(data[2].category_name) + '?id=' + data[2].id" append>
              <h2 class="article-title">{{data[2].category_name}}</h2>
            </nuxt-link>
            <article class="article-content" v-html="data[2].describe"></article>
            <!--            <ul class="application-ul">-->
<!--              <li v-for="item in 3">-->
<!--                <div class="check-mark">-->
<!--                  <font-awesome-icon icon="check"/>-->
<!--                </div>-->
<!--                <div class="product-item">-->
<!--                  <h4>example</h4>-->
<!--                  <p class="article-content">The European Union's Regulation No. 1907/2006 on the Registration, Evaluation, Authorization, and Restriction of Chemicals (REACH) came into force on June 1, 2007. </p>-->
<!--                </div>-->
<!--              </li>-->
<!--            </ul>-->
          </article>
          <figure class="col-md-7 col-sm-12">
            <img v-lazy="data[2].category_image" alt="category_image">
          </figure>
        </section>
      </section>

<!--      <section class="container-fluid services-section">-->
<!--        <article class="services-summary bottom-line">-->
<!--          <h3 class="services-title">Our Services</h3>-->
<!--          <p class="services-desc">support</p>-->
<!--        </article>-->
<!--        <section class="row">-->
<!--          <figure class="col-md-3 col-6" v-for="item in 8">-->
<!--            <img v-lazy="'~/assets/img/index/ad01.jpg'" alt="info">-->
<!--            <figcaption class="img-title center bottom-line">Oprex</figcaption>-->
<!--            <div class="mask">-->
<!--              <span class="img-title bottom-line">Oprex</span>-->
<!--              <button>VIEW DETAILS</button>-->
<!--            </div>-->
<!--          </figure>-->
<!--        </section>-->
<!--      </section>-->

    </section>
</template>

<script>
  import BannerContent from "@/components/BannerContent";
  import syncApiService from '@/services/sync-api-service.js';


  export default {
    name: "info-center-index",
    head() {
      return {
        title: 'Infocenter-APT Power Technology'
      };
    },
    async asyncData(context) {
      const res = await syncApiService.get('api/infocenter/getFirstList').then(data => {
        return data;
      }).catch(err => {
        return {};
      });
      return {
        data: res || []
      };
    },
    data() {
      return {
      };
    },
    components: {
      BannerContent
    }
  }
</script>


<style scoped lang="stylus">
  @import "~assets/css/child-page/page-info-list.styl";
</style>
