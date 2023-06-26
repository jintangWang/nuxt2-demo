<template>
  <aside class="content-left phone-hide">

    <article class="box" v-if="showSolution">
      <h4>SOLUTIONS</h4>
      <ul class="solution-list">
        <li v-for="(menu, index) in $store.state.solutionMenus" :key="'solution-left-' + index">
          <nuxt-link
            active-class="active-link"
            :to="'/Solutions/' + handlerUrl(menu.category_name) + '?id=' + menu.id">
            {{menu.category_name}}
            <font-awesome-icon icon="angle-right"/>
          </nuxt-link>
        </li>
      </ul>
    </article>

    <article class="box" v-else>
      <h4>PRODUCTS</h4>
      <ul class="product-list">
        <li v-for="(menu, index) in productMenus" :key="'products-left-' + index">
          <div class="product-item">
            <nuxt-link
              active-class="active-link"
              :to="'/Products/' + handlerUrl(menu.category_name) + '?id=' + menu.id">
              {{menu.category_name}}
              <font-awesome-icon v-if="!hasChildren(menu)" icon="angle-right"/>
            </nuxt-link>
            <button
              v-if="hasChildren(menu)"
              class="expand-btn"
              :aria-expanded="menu.isExpand ? 'true' : 'false'"
              @click="expand(menu)">
              <font-awesome-icon :icon="menu.isExpand ? 'angle-down' : 'angle-right'"/>
            </button>
          </div>
          <b-collapse v-model="menu.isExpand">
            <ul class="product-sub-list">
              <li v-for="(subMenu, index) in menu.children" :key="'product-sub-' + index">
                <nuxt-link
                  active-class="active-link"
                  :to="'/Products/' + handlerUrl(subMenu.category_name) + '?id=' + subMenu.id + '&level=sub'">
                  {{subMenu.category_name}}
                </nuxt-link>
              </li>
            </ul>
          </b-collapse>
        </li>
      </ul>
    </article>

<!--    <article class="box">-->
<!--      <h4>BROCHURE DOWNLOAD</h4>-->
<!--      <figure>-->
<!--        <img class="down-img" v-lazy="'~/assets/img/index/ad01.jpg'" alt="BROCHURE DOWNLOAD">-->
<!--      </figure>-->
<!--      <ul class="down-list">-->
<!--        <li><font-awesome-icon :icon="['far', 'file-pdf']"/><a href="javascript:;">brochure_EN.pdf</a></li>-->
<!--        <li><font-awesome-icon :icon="['far', 'file-pdf']"/><a href="javascript:;">brochure_cn.pdf</a></li>-->
<!--      </ul>-->
<!--    </article>-->


    <article class="box">
      <h4>CONTACT US</h4>
      <figure>
        <img class="map-img" v-lazy="require('~/assets/img/news/world_map.png')" alt="map">
      </figure>
      <p class="contact-text">
        Tailor-made, the best suited to you.<br/>Contact us today!
      </p>
      <p class="email-title">E-mail:</p>
      <a href="javascript:;" class="email">saleas@xaapt.com</a>
      <a href="javascript:;" class="email">apt@vip.163.com</a>
    </article>
  </aside>
</template>

<script>
  import { BCollapse } from 'bootstrap-vue';

  export default {
    name: "ContentLeft",
    data () {
      return {
        productMenus: []
      }
    },
    computed: {
      showSolution() {
        return this.$route.path.toLowerCase().indexOf('solutions') !== -1;
      },
    },
    created() {
      let menus = JSON.parse(JSON.stringify(this.$store.state.productMenus));
      this.productMenus = this.recursion(menus);
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
        if (this.hasChildren(menu)) {
          menu.isExpand = !menu.isExpand;
        } else {
          this.$router.push("/products/" + this.handlerUrl(menu.category_name));
        }
      },
    },
    watch: {
      '$store.state.productMenus': {
        handler(val) {
          let menus = JSON.parse(JSON.stringify(val));
          this.productMenus = this.recursion(menus);
        }
      }
    },
    components: { BCollapse }
  }
</script>

<style lang="stylus">
  .content-left
    padding-right 35px
    padding-bottom 35px
    width 30%
    .box
      &:not(:first-child)
        margin-top 40px
      h4
        font-family: Raleway-Bold
        font-size: 15px
        font-weight: bold
        line-height: 1.07
        color: #333333
      .solution-list, .product-list
        li
          width: 100%;
          font-family: OpenSans
          font-size: 13px
          font-weight: normal
          line-height: 1.23
          color: #777777
          padding-bottom 5px
          a
            display flex
            justify-content space-between
            align-items center
      .product-list .product-item
        display flex
        a
          flex: 1
        .expand-btn
          background transparent
          padding-left 16px
          box-sizing border-box
          font-weight normal
          color: #777777
          &:hover
            color: #008fd7
      .product-sub-list
        margin-left: 16px
        margin-top 5px
        li
          font-size 12px

      /*.down-img
        width: 188px
      .down-list
        li
          font-family: OpenSans
          font-size: 13px
          line-height: 1.23
          color: #777777
        svg
          margin-left: 2px
          margin-right: 10px*/

      .map-img
        width 100%
      .contact-text
        font-family: OpenSans
        font-size: 13px
        line-height: 1.54
        color: #666666
        margin-top 20px
      .email-title
        padding-bottom 0
      .email
        color: #008fd7
        display block
    .active-link
      font-weight: bold
      color: #555

</style>
