<template>
  <section class="news-banner"  v-lazy:background-image='bannerImg'>
    <article class="container title-content">
      <h1 class="banner-title">{{title}}</h1>
      <nav class="banner-subtitle">
        <nuxt-link to="/" active-class="active-link">Home</nuxt-link>
        <nuxt-link to="/Sitemap" v-if="isSpecial">
          <span class="path-split">/</span>Sitemap
        </nuxt-link>
        <span v-else>
          <span v-for="(path, index) in pathArr" :key="'path' + index">
            <nuxt-link :to="getPath(index)" active-class="active-link">
              <span class="path-split">/</span>{{recoverPathName(path)}}
            </nuxt-link>
          </span>
        </span>
      </nav>
    </article>
  </section>
</template>

<script>
  import jsonld from '@/utils/jsonld.js';

  export default {
    name: "BannerContent",
    head() {
      if (this.isSpecial) return {};
      if (this.pathArr[this.pathArr.length - 1].trim() === '') return {};
      let origin = process.env.baseUrl;
      let crumbList = this.pathArr.map((item, index) => {
        return {
          position: index + 1,
          name: this.recoverPathName(item),
          item: origin + this.getPath(index)
        };
      });
      crumbList.splice(0, 0, {
        position: 0,
        name: 'Home',
        item: origin + '/'
      });
      return {
        __dangerouslyDisableSanitizers: ['script'],
        script: [
          jsonld.getCrumb(crumbList)
        ],
      };
    },
    props: {
      title: String,
      subTitle: String,
      bannerImg: {default: require('~/assets/img/news/news_banner.png')},
      isSpecial: {type: Boolean, default: false} // 需要特殊显示的面包屑名称，默认不特殊处理
    },
    data() {
      return {
        pathArr: this.$route.path.substring(1).split('/')
      };
    },
    methods: {
      recoverPathName(name) {
        return name.split('_').join('/').split('-').join(' ');
      },
      getPath(index) {
        if (index === this.pathArr.length - 1) {
          return this.$route.fullPath;
        }
        let result = '';
        for (let i = 0; i <= index; i ++) {
          result += '/' + this.matchMenu(i);
        }
        return result;
      },
      matchMenu(i) {
        // 特殊处理拥有三级页面的 二级 menu 的 二级页面， 因为需要 catogery id
        if (i === 1) {
          let str = this.pathArr[0].toLowerCase();
          let menuName = '';
          switch (str) {
            case 'products':
              menuName = 'productMenus';
              break;
            case 'solutions':
              menuName = 'solutionMenus';
              break;
            case 'infocenter':
              menuName = 'infoCenterMenus';
              break;
            case 'faq':
              menuName = 'faqMenus';
              break;
          }

          let menus = this.$store.state[menuName];
          if (menus) {
            let curMenu = menus.find(menu => {
              return this.handlerUrl(menu.category_name) === this.pathArr[i];
            });
            if (!curMenu) return '';
            return this.handlerUrl(curMenu.category_name) + '?id=' + curMenu.id;
          }
        }
        return this.pathArr[i]
      }
    }
  }
</script>

<style scoped lang="stylus">
  .news-banner
    position relative
    width 100%
    background-repeat no-repeat
    background-size 100% 100%
    min-height: 280px
    overflow hidden
    @media (min-width: 768px) and (max-width: 1024px)
      min-height: 260px
    @media (max-width: 767px)
      min-height: 200px

    .title-content
      position absolute
      bottom 0
      left 0
      right 0
      margin 0 auto
      @media (max-width: 767px)
        position: static
        margin-top 124px

    .banner-title
      font-size 30px
      color #ffffff
      font-family 'Raleway-SemiBold'
      margin-bottom: 17px

    .banner-subtitle
      font-size 13px
      margin-bottom: 16px
      display flex
      align-items center
      flex-wrap wrap
      a
        font-family OpenSans
        color #ffffff
      span
        color #ffffff
      .path-split
        margin 0 5px

    .news-content
      width 100%
      background-color #e7e9ea

    .active-link
      font-weight: bold

</style>
