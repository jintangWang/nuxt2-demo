<template>
    <aside class="news-right">
        <label class="news-label" v-if="showSearchInput">SEARCH</label>
        <div class="input-group" v-if="showSearchInput">
            <input type="text" class="form-control input-send" placeholder="" aria-label="Recipient's username" aria-describedby="button-addon2" v-model="keywords" @keyup.enter="search">
            <div class="input-group-append">
                <button class="btn btn-primary send-btn" type="button" id="button-addon2" @click="search">
                    <font-awesome-icon icon="search" style="font-size: 13px"/>
                </button>
            </div>
        </div>
        <div class="icon-content">
            <div class="icon-box">
                <font-awesome-icon :icon="['fab', 'twitter']" class="icon" @click="linkTo('twitter')"/>
<!--                <p class="icon-num">25,789</p>-->
<!--                <p class="icon-text">Followers</p>-->
            </div>
            <div class="icon-box facebook">
                <font-awesome-icon :icon="['fab', 'facebook-f']" class="icon" @click="linkTo('facebook')"/>
<!--                <p class="icon-num">25,789</p>-->
<!--                <p class="icon-text">Likes</p>-->
            </div>
        </div>
        <p class="news-label">INFOCENTER</p>
        <nuxt-link
          class="right-link"
          v-for="(menu, index) in $store.state.infoCenterMenus"
          :key="'infocenter-right' + index"
          :to="'/Infocenter/' + handlerUrl(menu.category_name) + '?id=' + menu.id">
          > {{menu.category_name}}
        </nuxt-link>
        <p class="news-label">latest news</p>
        <div class="calendar-box d-flex" v-for="item in latestNews" :key="item.id">
            <font-awesome-icon icon="calendar-alt" class="calendar-icon"/>
            <nuxt-link :to=" '/news/'+handlerUrl(item.new_title) + '?id=' + item.id" class="cale-text">{{item.new_title}}
            </nuxt-link>
        </div>
        <p class="news-label">CONTACT US</p>
        <div class="news-map" v-lazy:background-image="require('../assets/img/news/world_map.png')"></div>
        <p class="map-text">Tailor-made, the best suited to you.<br/>Contact us today!</p>
        <p class="email-title">E-mail:</p>
        <a href="javascript:;" class="email">saleas@xaapt.com</a>
        <a href="javascript:;" class="email">apt@vip.163.com</a>
    </aside>
</template>

<script>
    import syncApiService from '@/services/sync-api-service.js';

    export default {
        name: "NewsRight",
        props: {
            showSearchInput: {type: Boolean, default: true},
        },
        data() {
            return {
                latestNews: [],
                keywords: ''
            }
        },
        methods: {
            linkTo(type) {
                const URL = type === 'twitter' ? 'https://twitter.com/apt_power' : 'https://www.facebook.com/APTPowerTech/';
                window.open(URL);
            },
            search() {
                this.$router.push({path:'/search-results', query:{keywords: this.keywords}});
            },
        },
        created() {
          if (process.browser) {
            syncApiService.get('api/news/index?page=1').then(res => {
              if (res.hot_news) {
                this.latestNews = res.hot_news;
              }
            }).catch(err => {
              return {};
            });
          }
        }
    }
</script>

<style scoped lang="stylus">
  .map-text
    padding 27px 0 18px
    color #666666

  .cale-text
    color #777777
    padding-left 5px

  .icon-content
    padding 49px 0

  .input-send
    height 34px

  .icon-num, .icon-text
    padding-bottom 5px
    line-height normal
    font-size 12px

  .icon-text
    color #777777

  .icon-num
    padding-top 14px
    color #252525
    font-weight bold

  .send-btn
    width 34px
    height 34px
    background-color #008fd7
    padding 0

  .news-label
    padding-bottom 0
    margin-bottom 28px
    font-size 15px
    color #333333
    font-weight bold

  .news-label:nth-of-type(2), .news-label:nth-of-type(3)
    text-transform uppercase
    margin-top 50px

  .news-right
    padding-left 35px
    padding-bottom 35px
    width 30%

  .icon-box
    display inline-block
    width 68px
    height 68px
    text-align center
    line-height 68px
    border-radius 4px
    background-color #28a9e0
    color #ffffff
    font-size 32px
    cursor pointer

    &.facebook
      background-color #f6f6f6
      margin-left 31px
      color #31393f

  .right-link
    display block
    padding 14px 0
    border-bottom 1px solid #ffffff
    color #777777 !important
    font-family 'Open Sans'
    cursor pointer

  .calendar-box
    padding 10px 0
    border-bottom 1px solid #ffffff

  .calendar-icon
    margin 5px 5px 0 0
    color #006db7
    font-size 12px

  .news-map
    background url("~assets/img/news/world_map.png") no-repeat
    background-size 100%
    height 132px

  .email-title
    padding-bottom 0

  .email
    color: #008fd7
    display block


  @media (max-width: 767px)
      .news-right
          display none

  /*@media (min-width: 768px) and (max-width: 1024px)*/
  /*    .news-right*/
  /*        display none*/

</style>
