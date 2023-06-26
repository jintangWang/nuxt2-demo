<template>
  <section class="error-wrap">
    <BannerContent title="Sitemap" sub-title="Home   /   Sitemap "
                   :is-special="true"
                   :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')">
    </BannerContent>
    <section class="container">
      <section class="wrap404" v-if="error.statusCode === 404 && !isSitemap">
        <strong>Warning:</strong> This page could not be found
      </section>
      <section class="wrap404" v-if="error.statusCode === 500">
        <strong>Error:</strong> Server Error
      </section>
      <section class="row">
        <section class="col-md-6 col-sm-12 menu-item"
                 v-for="(menu, index) in menus"
                 :key="'menu' + index">
          <h3 class="menu-title">{{menu.title}}</h3>
          <ul class="menu-sub-wrap">
            <li
              v-for="(subMenu, subIndex) in menu.children"
              :key="'menu-sub-' + index + subIndex">
              <nuxt-link :to="'/'+ menu.title +'/' + handlerUrl(subMenu.category_name) + '?id=' + subMenu.id">
                {{subMenu.category_name}}
              </nuxt-link>
            </li>
          </ul>
        </section>
      </section>
    </section>
  </section>
</template>

<script>
  import Header from '@/components/Header';
  import Footer from '@/components/Footer';
  import BannerContent from '@/components/BannerContent';

  export default {
    props: ['error'],
    data() {
      let state = this.$store.state;
      return {
        menus: [
          {
            title: 'Solutions',
            children: state.solutionMenus,
          },
          {
            title: 'Products',
            children: state.productMenus,
          },
          {
            title: 'Services',
            children: state.serviceMenus,
          },
          {
            title: 'Infocenter',
            children: state.infoCenterMenus,
          },
          {
            title: 'FAQ',
            children: state.faqMenus,
          }
        ]
      };
    },
    computed: {
      isSitemap() {
        return this.$route.path === '/Sitemap';
      }
    },
    components: {
      Header, Footer, BannerContent
    }
  };
</script>

<style lang="stylus">
  .error-wrap
    .container
      margin-top: 36px
      margin-bottom 36px
    .wrap404
      border 4px solid #e65f13
      padding 20px
      margin-top: 20px
      font-size 16px
    .menu-item
      margin-top: 36px
    .menu-title
      position: relative
      border-left: 8px solid #008fd7
      padding-left 16px
      font-family Raleway-Bold
      color: #666
      margin-bottom 24px
      &:after
        position absolute
        left: 0
        bottom: -12px
        content: ''
        display block
        height 2px
        width: calc(100% - 30px)
        background #eee
    .menu-sub-wrap
      padding-left 32px
      list-style: disc
</style>
