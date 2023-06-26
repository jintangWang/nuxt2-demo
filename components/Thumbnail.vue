<template>
  <section class="thumbnail">
    <nuxt-link :to="to" :append="append" class="thumbnail-link">
      <div>
        <figure class="pro-img">
          <img class="scale-img" v-lazy="item.products_image1 || item.image" alt="products_image">
          <div class="find-more">
            <p>READ MORE</p>
            <span><font-awesome-icon icon="angle-right"/></span>
          </div>
        </figure>
        <div class="caption">
          <h4 class="thumbnail-title left-top-line">{{item.products_title || item.title}}</h4>
          <!-- title 是 solution 的字段         -->
<!--          <p class="thumbnail-content">{{item.products_title || item.title}}</p>-->
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
  export default {
    name: "Thumbnail",
    props: {
      item: {
        default() {
          return {};
        }
      },
      to: {
        default: ''
      },
      append: {
        type: Boolean,
        default: false
      }
    }
  }
</script>




<style scoped lang="stylus">
  .thumbnail
    position: relative
    padding: 0px
    border: none
    overflow: hidden
    border-radius: 0
    display: block
    line-height: 1.42857143
    background-color: #fff
    width: 32%
    max-width 280px
    @media (min-width: 768px)
      &:nth-child(n + 4)
        margin-top 30px
    @media (max-width: 767px)
      width: 85%
      margin 30px auto 0 auto
      &:nth-child(1)
        margin-top 0

    .thumbnail-link
      display block
    .pro-img
      overflow: hidden
      position relative
      display: flex
      justify-content: center
      max-height 230px
      @media (min-width: 768px) and (max-width: 1024px)
        max-height: 206px
      @media (max-width: 767px)
        max-height: 216px
      img
        max-width 100%
        flex-shrink: 0
        min-height 150px
        @media (min-width: 768px) and (max-width: 1024px)
          min-height 110px

    .find-more
      position: absolute
      bottom: 0
      right: 0
      overflow hidden
      display flex
      align-items center
      @media (max-width: 1024px)
        display none
      p
        width: 135px
        line-height: 34px
        background-color: #1b2936
        text-decoration: none
        float: left
        text-align center
        font-size: 13px
        font-weight: bold
        color: #ffffff
        padding-bottom 0
        transition all 0.2s ease 0s
      span
        text-align: center
        padding: 11px 15px
        width: 30px
        height 34px
        background-color: #2f3840
        float: right
        margin-left: -10px
        font-size: 13px;
        font-weight: bold
        color: #ffffff
        display: flex
        transition all 0.2s ease 0s
    .caption
      padding: 30px 20px
      /*min-height: 128px*/
      color: #333
      h3
        font-family PingFangSC-Semibold
        font-size: 18px
        font-weight: 600
        line-height: 1.11
        text-align: left
        color: #333333
        margin: 10px 0
        word-break break-all
        &::before
          display: block
          content: ""
          width: 30px
          height: 3px
          background-color: #008fd7
          margin-bottom: 10px
          transition all 0.2s ease 0s;
      p
        font-family: OpenSans
        font-size: 13px
        line-height: 1.54
        text-align: left
        color: #777777
      @media (max-width: 1024px)
        padding 15px 10px
    .thumbnail-title
      font-family inherit
      font-size: 18px
      font-weight: 600
      margin-bottom 0
      @media (min-width: 768px) and (max-width: 1024px)
        font-weight: 500
        font-size: 16px
    .thumbnail-content
      font-family: OpenSans
      font-size: 13px
      margin-top 12px
      color: #777777
      padding-bottom 0

  @media (min-width: 1025px)
    .thumbnail:hover
      .caption
        h3:before, h4:before
          background-color #e62129
    .thumbnail .find-more:hover
      p
        background-color: #e62129
      span
        background-color #f24f55

</style>
