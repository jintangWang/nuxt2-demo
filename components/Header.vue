<template>
  <header class="header-wrapper header-transparent">
    <div class="main-nav" :class="{'is-show': showMobileMenu}">
        <RfqModal ref="rfq" @header="closeWrap" />

        <div class="nav-wrapper">
            <nav class="navbar navbar-default navbar-light nav-left" :class="{'show-menu': showMobileMenu}" role="navigation">

              <!-- 响应式菜单 -->
              <button class="navbar-toggler pc-hide" type="button"
                      data-toggle="collapse"
                      @click="toggleMenu">
                <span class="navbar-toggler-icon">
                  <font-awesome-icon :icon="showMobileMenu ? 'times' : 'bars'"/>
                </span>
              </button>

              <div class="navbar-header clearfix v-center" :class="{'show-menu': showMobileMenu}">
                <span class="logo">
                  <nuxt-link to="/">
                    <img class="img-logo" src="/img/logo.png" alt="apt-logo"/>
                  </nuxt-link>
                </span><!-- .logo end -->
                <span class="logo-des">Tailor-made,the best suited to you.</span>
              </div>
            </nav>

            <!-- 一级菜单 -->
            <nav class="collapse navbar-collapse show"
                 :class="{'show-mobile-menu': showMobileMenu}">
              <ul class="nav navbar-nav">
                <li class="nav-item mobile-menu-box" @click="closeModal">
                  <nuxt-link to="/news">News & Events</nuxt-link>
                </li>
                <li class="nav-item mobile-menu-box" @click="closeModal">
                  <nuxt-link to="/About-APT">About APT</nuxt-link>
                </li>
                <li class="nav-item mobile-menu-box" @click="closeModal">
                  <nuxt-link to="/contact">Contact us</nuxt-link>
                </li>
                <li class="nav-item mobile-menu-box">
                  <a class="touch-link" @click="openModal">RFQ</a>
                </li>
              </ul>

              <!--   SEARCH   -->
              <div class="search-form">
                <input class="search-input" type="text" placeholder="SEARCH" v-model="keywords" @keyup.enter="search">
                <button class="search-btn" @click="search">
                  <font-awesome-icon icon="search" />
                </button>
              </div>
            </nav>
          </div>

        <!--  次级菜单   -->
        <div class="row sub-menu mobile-hide"
             :class="{'show-mobile-menu': showMobileMenu}">
          <div class="col-md-12 sub-nav-wrapper">
            <nav class="sub-navbar">
              <ul class="sub-nav-ul" @mouseover="showDropMenu" @mouseleave="closeDropMenu">
                <li class="dropdown home-link" @mouseover.prevent="menuIndex=-1" :class="{'active': menuIndex === -1}">
                  <nuxt-link to="/">
                    Home
                    <font-awesome-icon class="pc-hide" icon="angle-right"/>
                  </nuxt-link>
                </li>
                <li
                  v-for="(menu, index) in menus"
                  :key="'headerMenu' + index"
                  class="dropdown"
                  @mouseover="menuIndex=index"
                  :class="{'active': menuIndex === index}">
                  <nuxt-link :to="'/' + menu.title">
                    {{menu.title}}<span class="caret triangle"></span>
                    <font-awesome-icon class="pc-hide" v-if="!hasChildren(menu)" icon="angle-right"/>
                  </nuxt-link>
                  <button
                    v-if="hasChildren(menu)"
                    class="expand-btn pc-hide"
                    :aria-expanded="menu.isExpand ? 'true' : 'false'"
                    @click="expand(menu)">
                    <font-awesome-icon :icon="menu.isExpand ? 'angle-down' : 'angle-right'"/>
                  </button>
                  <b-collapse class="pc-hide sub-collapse" v-model="menu.isExpand" v-if="hasChildren(menu)">
                    <ul class="menu-sub-list">
                      <li
                        v-for="(subMenu, subIndex) in menu.children"
                        :class="{'expandable-sub-menu': hasChildren(subMenu)}"
                        :key="'menu-sub-' + index + subIndex">
                        <nuxt-link :to="'/'+ menu.title +'/' + handlerUrl(subMenu.category_name) + '?id=' + subMenu.id">
                          {{subMenu.category_name}}
                          <font-awesome-icon
                            v-if="!hasChildren(subMenu)"
                            icon="angle-right"/>
                        </nuxt-link>
                        <button
                          v-if="hasChildren(subMenu)"
                          class="expand-btn pc-hide"
                          :aria-expanded="subMenu.isExpand ? 'true' : 'false'"
                          @click="expand(subMenu)">
                          <font-awesome-icon :icon="subMenu.isExpand ? 'angle-down' : 'angle-right'"/>
                        </button>
                        <b-collapse class="sub-collapse" v-model="subMenu.isExpand" v-if="hasChildren(subMenu)">
                          <ul class="menu-sprig-list">
                            <li
                              v-for="(sprigMenu, sprigIndex) in subMenu.children"
                              :key="'menu-sprig-' + index + subIndex + sprigIndex">
                              <nuxt-link :to="'/'+ menu.title +'/' + handlerUrl(sprigMenu.category_name) + '?id=' + sprigMenu.id + '&level=sub'">
                                {{sprigMenu.category_name}}
                                <font-awesome-icon icon="angle-right"/>
                              </nuxt-link>
                            </li>
                          </ul>
                        </b-collapse>
                      </li>
                    </ul>
                  </b-collapse>
                </li>
              </ul>
            </nav>
            <div class="sub-nav-footer pc-hide">
              APT 2019. ALL RIGHTS RESERVED  陕ICP备12009429号
            </div>
          </div>
        </div>

        <!--   浮动菜单   -->
        <div class="row mobile-hide" v-show="isShowMenu"
             @mouseover="showDropMenu('float')" @mouseleave="closeDropMenu('float')">
          <div class="col-md-12 nav-menu">
            <ul class="nav-menu-wrapper" v-show="menuIndex===0">
              <li v-for="(menu, index) in $store.state.solutionMenus" :key="'solution' + index">
                <nuxt-link :to="'/Solutions/' + handlerUrl(menu.category_name) + '?id=' + menu.id">
                  {{menu.category_name}}
                  <font-awesome-icon icon="angle-right"/>
                </nuxt-link>
              </li>
            </ul>
            <ul class="nav-menu-wrapper" v-show="menuIndex===1">
              <li v-for="(menu, index) in $store.state.productMenus" :key="'product' + index">
                <nuxt-link :to="'/Products/' + handlerUrl(menu.category_name) + '?id=' + menu.id">
                  {{menu.category_name}}
                  <font-awesome-icon icon="angle-right"/>
                </nuxt-link>
              </li>
            </ul>
            <ul class="nav-menu-wrapper" v-show="menuIndex===2">
              <li v-for="(menu, index) in $store.state.serviceMenus" :key="'service' + index">
                <nuxt-link :to="'/Services/' + handlerUrl(menu.category_name) + '?id=' + menu.id">
                  {{menu.category_name}}
                  <font-awesome-icon icon="angle-right"/>
                </nuxt-link>
              </li>
            </ul>
            <ul class="nav-menu-wrapper" v-show="menuIndex===3">
              <li v-for="(menu, index) in $store.state.infoCenterMenus" :key="'infocenter' + index">
                <nuxt-link :to="'/Infocenter/' + handlerUrl(menu.category_name) + '?id=' + menu.id">
                  {{menu.category_name}}
                  <font-awesome-icon icon="angle-right"/>
                </nuxt-link>
              </li>
            </ul>
            <ul class="nav-menu-wrapper" v-show="menuIndex===4">
              <li v-for="(menu, index) in $store.state.faqMenus" :key="'faq' + index">
                <nuxt-link :to="'/FAQ/' + handlerUrl(menu.category_name) + '?id=' + menu.id">
                  {{menu.category_name}}
                  <font-awesome-icon icon="angle-right"/>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    <div class="modal-wrap" v-if="showWrap"></div>
  </header>
</template>

<script>
  import RfqModal from "@/components/RfqModal";
  import syncApiService from '@/services/sync-api-service.js';
  import { BCollapse } from 'bootstrap-vue';
  import jsonld from '@/utils/jsonld.js';

  export default {
    components: { RfqModal, BCollapse },
    head() {
      return {
        __dangerouslyDisableSanitizers: ['script'],
        script: [
          jsonld.getSearch(),
          jsonld.getBadge(),
        ],
      };
    },
    data() {
      return {
        isShowMenu: false,
        menuIndex: -2,
        temMenuIndex: -1,
        showMobileMenu: false,
        showWrap: false,
        keywords: '',
        menus: [
          {
            title: 'Solutions',
            isExpand: false,
            children: [],
          },
          {
            title: 'Products',
            isExpand: false,
            children: [],
          },
          {
            title: 'Services',
            isExpand: false,
            children: [],
          },
          {
            title: 'Infocenter',
            isExpand: false,
            children: [],
          },
          {
            title: 'FAQ',
            isExpand: false,
            children: [],
          }
        ]
      };
    },
    created() {
      if (process.browser) {
        this.httpSolutionMenus();
        this.httpProductMenus();
        this.httpServiceMenus();
        this.httpInfoCenterMenus();
        this.httpFaqMenus();
      }
    },
    methods: {
      recursion(arr) {
        return arr.map(item => {
          item.isExpand = false;
          if (this.hasChildren(item)) {
            item.children = this.recursion(item.children)
          }
          return item;
        });
      },
      hasChildren(menu) {
        return menu.children && Array.isArray(menu.children) && menu.children.length > 0;
      },
      expand(menu) {
        menu.isExpand = !menu.isExpand;
      },
      httpSolutionMenus() {
        const param = {
          type: 'solutions'
        };
        syncApiService.post('api/category/getList', param).then(data => {
          this.$store.commit('setSolutionMenus', data);
          let menus0 = JSON.parse(JSON.stringify(data));
          this.menus[0].children = this.recursion(menus0);
        }).catch(err => {
          console.log('获取方案类别错误', err);
        });
      },
      httpProductMenus() {
        const param = {
          type: 'products'
        };
        syncApiService.post('api/category/getList', param).then(data => {
          this.$store.commit('setProductMenus', data);
          let menus1 = JSON.parse(JSON.stringify(data));
          this.menus[1].children = this.recursion(menus1);
        }).catch(err => {
          console.log('获取产品类别错误', err);
        });
      },
      httpServiceMenus() {
        syncApiService.get('api/service/getFirstList').then(data => {
          this.$store.commit('setServiceMenus', data);
          let menus2 = JSON.parse(JSON.stringify(data));
          this.menus[2].children = this.recursion(menus2);
        }).catch(err => {
          console.log('获取服务类别错误', err);
        });
      },
      httpInfoCenterMenus() {
        syncApiService.get('api/infocenter/getFirstList').then(data => {
          this.$store.commit('setInfoCenterMenus', data);
          let menus3 = JSON.parse(JSON.stringify(data));
          this.menus[3].children = this.recursion(menus3);
        }).catch(err => {
          console.log('获取info center类别错误', err);
        });
      },
      httpFaqMenus() {
        syncApiService.get('api/faq/getFirstList').then(data => {
          this.$store.commit('setFaqMenus', data);
          let menus4 = JSON.parse(JSON.stringify(data));
          this.menus[4].children = this.recursion(menus4);
        }).catch(err => {
          console.log('获取faq类别错误', err);
        });
      },
      showDropMenu(source) {
        this.isShowMenu = true;
        if (source === 'float') {
          this.menuIndex = this.temMenuIndex;
        }
      },
      // 次级浮动菜单
      closeDropMenu() {
        this.isShowMenu = false;
        this.temMenuIndex = this.menuIndex;
        this.menuIndex = -2;
      },
      // 移动端菜单
      toggleMenu() {
        this.showMobileMenu = !this.showMobileMenu;
        if (this.showMobileMenu) {
          document.body.style.height = '100vh';
          document.body.style.overflowY = 'hidden';
        } else {
          document.body.style.height = 'auto';
          document.body.style.overflowY = 'auto';
        }
      },
      search() {
        this.$router.push({path: '/search-results', query: {keywords: this.keywords}});
      },
      openModal() {
        this.$refs.rfq.open();
        this.showWrap = true;
      },
      closeModal() {
        this.$refs.rfq.closeModal();
        this.closeWrap();
      },
      closeWrap() {
        this.showWrap = false;
      }
    },
    watch: {
      $route (to, from){
        this.showMobileMenu = false;
        document.body.style.height = 'auto';
        document.body.style.overflowY = 'auto';
      }
    }

  };
</script>

<style lang="stylus">
  .modal-wrap
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index 0
    overflow hidden
    outline: 0
    background:rgba(0,0,0,.5);

   .touch-link
      cursor pointer

  .header-wrapper
    position: relative
    width: 100%
    height 0
    background #fff
    box-shadow 0 0 5px rgba(0, 0, 0, 0.2)
    top 0
    z-index 1000
    &.header-transparent
      background-color transparent
      background none
      box-shadow none

    .main-nav
      position relative
      margin: 0 auto
      background #ffffff
      background -moz-linear-gradient(top,  #ffffff 0%, #fcfcfc 100%)
      border-radius 3px
      box-shadow 0px -8px 0px 0px rgba(255,255,255,0.2)
      .row
        margin-bottom 0

    .nav-wrapper
      position relative
      display: flex
      flex-wrap wrap

    .navbar-header
      display: flex
      align-items: center
      padding-left 19px
      .logo
        width: 85px
        margin-right 9px
        float: left
        overflow hidden
      .logo-des
        font-size: 11px
        float: left
      .img-logo
        width: 100%

    .navbar
      height: 81px
      flex-grow: 1

    .navbar-default
      border none
      background none
    .navbar-nav
      & > li
        padding-bottom 0
      & > a
        line-height 48px
        font-size 13px
        font-weight 700
        text-transform uppercase
        color #333
        border-bottom 3px solid transparent
        &:hover
          border-top: 5px solid #008fd7
    .nav a
      padding-left 25px
      padding-right 25px



    .navbar-collapse
      position absolute
      right: 0
      padding-right: 235px
      height 100%
      border none
      float right
    .navbar-nav
      flex-direction row
    .nav-item
      height 100%
      a
        display flex
        align-items center
        height 100%
        font-family Raleway-Bold
        color #333


    .search-form
      white-space nowrap
      right: 0
      display flex
      align-items center
      position: absolute
      top: 50%
      transform: translateY(-50%)
      .search-input
        width: 150px;
        height: 40px;
        border-radius: 2px
        background-color: #008fd7
        font-family Raleway-Bold
        font-size: 13px
        font-weight: bold
        font-stretch: normal
        font-style: normal
        line-height: 1.7
        letter-spacing: normal
        text-align: left
        color: #fff
        text-indent: 8px
        &::placeholder
          color: #fff
          font-family Raleway-Bold
      .search-btn
        width: 35px
        height: 35px
        border-radius 50%
        overflow hidden
        background-color: #008fd7
        margin-left: 10px
        margin-right: 30px
        color: #fff

    .sub-nav-wrapper
      .sub-navbar
        display flex
        justify-content flex-end
        align-items center
        background-color: #333333
        height: 66px
        padding-right 30px
      .faq-btn
        width: 94px
        height: 40px
        border-radius: 20px
        background-color: #008fd7
      .sub-nav-ul
        height 100%
        display: flex
        align-items: center
        li
          float: left

    .dropdown
      a
        padding: 10px 15px
        font-family: Raleway
        font-weight: bold
        font-size: 13px
        color: #f0f0f0
        display inline-block
      .triangle
        border-top-color: #008fd7

    .nav-menu
      .nav-menu-wrapper
        overflow: hidden
        margin: 30px 0
        li
          float: left
          width: 30%
          margin: 0 1.5%
          padding: 15px 0
          border-bottom: 1px solid #e7e9eacc
          font-size: 13px
          color: #777777
          a
            display flex
            justify-content space-between
            align-items center
            &:hover
              color #008fd7
    .navbar-toggler
      border: none
      position: absolute
      right: 0
      z-index: 5
      .navbar-toggler-icon
        background-image none
        svg
          width: 100%
          height 100%
          color: #008fd7


  @media (min-width: 1025px)
    .header-wrapper
      top: 33px
      .main-nav
        max-width: 1140px
      .caret
        display: inline-block
        width: 0
        height: 0
        margin-left: 2px
        vertical-align: middle
        border-top: 4px dashed
        border-top: 4px solid
        border-right: 4px solid transparent
        border-left: 4px solid transparent
      .dropdown.active
        a
          padding 10px 15px
          border-radius: 20px
          background-color: #008fd7
          .triangle
            border-top-color: #f0f0f0
      .navbar-collapse .navbar-nav
        height 100%
        &>li>a:hover
          border-top: 5px solid #008fd7;
      .nav-menu .nav-menu-wrapper li
        &:hover
          color: #008fd7
          a
            text-decoration: underline
  @media (min-width: 768px) and (max-width: 1024px)
    .header-wrapper
      .main-nav
        width: 100%
      .show-mobile-menu
        display block
  @media (max-width: 1024px)
    .header-wrapper
      .main-nav
        width: 100%
        height: 0
        &.is-show
          height: 100vh
          overflow-y scroll
          overflow-x hidden
      .show-mobile-menu
        display block
      .navbar.show-menu
        background white
        border-bottom 1px solid #eee
        box-shadow 0 0 89px 0px #f8f9fa inset
      .navbar-header
        left: 50%
        top: 25px
        transform: translateX(-50%)
        flex-direction: column
        padding-left: 5px
        &.show-menu
          left: 0
          top: 50%
          transform: translateY(-50%)
          flex-direction row
          .logo
            width: 70px
          .logo-des
            color: #bebebe
        .logo
          width: 30%
          margin-right: 5px
        .logo-des
          font-family: OpenSans
          color: #ffffff
          white-space nowrap
      .navbar-collapse
        position static
        padding-right: 0
        padding-top: 5px
        padding-bottom: 5px
        display: none;
        &.show-mobile-menu
          display flex
          flex-direction: column-reverse
        .search-form
          position static
          transform none
          align-self flex-start
          padding 10px 15px
          width 100%
          .search-input
            flex-grow 1
          .search-btn
            margin-right 0

      .mobile-menu-box
        width: 50%
        display: flex
        justify-content: center
        a
          display: block
          width: 100%
          margin: 10px 15px
          line-height: 40px
          padding: 0px
          background-color: #f0f0f0
          font-family Raleway-Bold
          color: #9d9b9c
          text-align: center
      .navbar-nav
        width 100%
      .dropdown
        width: calc(100% - 30px)
        margin 0 15px
        display flex
        flex-wrap wrap
        border-bottom: 1px solid #eee
        &:first-child
          border-top: 1px solid #eee
        a
          padding-left 0
          padding-right 0
          width: 100%;
          flex: 1
          display: block;
          color: #333
        .expand-btn
          background transparent
          padding-left 16px
          box-sizing border-box
          font-weight normal
          color: #777777
      .home-link a
        display flex
        justify-content space-between
        align-items center


      .menu-sub-list
        li
          width: 100%
        a
          display flex
          justify-content space-between
          align-items center
          color: #666
          padding 6px 0 6px 16px
        .expandable-sub-menu
          display flex
          flex-wrap wrap
          & > a
            flex 1
      .sub-collapse
        width: 100%
      .menu-sprig-list
        a
          color: #999
          width: 100%
          padding 3px 0 3px 32px


      .sub-menu
        .sub-navbar
          height: auto
          background white
          padding-right: 0
        .sub-nav-ul
          width: 100%
          justify-content center
          flex-wrap: wrap
        .sub-nav-footer
          margin 30px 15px auto
          padding-top 20px
          border-top 1px solid #ccc
          color: #9d9b9c
          font-size: 12px
          font-family: OpenSans
          text-align center
          line-height: 20px
</style>
