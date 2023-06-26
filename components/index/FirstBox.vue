<template>
  <section class="content-section-1">
    <div class="container">
      <div class="title-caption">
        <h3 @click="toList">Many large companies rely on APT Power Technology</h3>
        <p>Our Customers and Success Stories</p>
      </div>
      <div class="row">
        <div class="col-3 col-sm-3" v-for="(item, index) in cooperationList.slice(0, 4)" :key="'cooperation' + index">
          <div class="thumbnail">
            <nuxt-link :to="{name: 'About-APT-customers-name', params:{name: handlerUrl(item.cooperation_name)}, query: {id: item.id}}">
              <img v-lazy="item.cooperation_image" :alt="item.cooperation_name">
            </nuxt-link>
            <div class="caption">
              <h3>{{item.cooperation_name}}</h3>
            </div>
          </div>
        </div>
      </div>

      <b-collapse id="collapse-1" v-model="isExpand">
        <div class="row">
          <div class="col-3 col-sm-3" v-for="(item, index) in cooperationList.slice(4)" :key="'cooperation-collapse' + index">
            <div class="thumbnail">
              <nuxt-link :to="{name: 'About-APT-customers-name', params:{name: handlerUrl(item.cooperation_name)}, query: {id: item.id}}">
                <img v-lazy="item.cooperation_image" :alt="item.cooperation_name">
              </nuxt-link>
              <div class="caption">
                <h3>{{item.cooperation_name}}</h3>
              </div>
            </div>
          </div>
        </div>
      </b-collapse>

      <div class="btngroup" id="btn-group">
        <button
          class="btn iconfont iconarrow-up1"
          :aria-expanded="isExpand ? 'true' : 'false'"
          aria-controls="collapse-1"
          @click="isExpand = !isExpand">
          <font-awesome-icon :icon="isExpand ? 'chevron-up' : 'chevron-down'"/>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
  import { BCollapse } from 'bootstrap-vue';

  export default {
    name: "FirstBox",
    data() {
      return {
        isExpand: false,
        cooperationList: this.$store.state.cooperationList
      };
    },
    components: { BCollapse },
    methods: {
      toList() {
        this.$router.push('/About-APT/customers');
      }
    }
  }
</script>

<style scoped lang="stylus">
  .content-section-1
    background: #e7e9ea
    .container
      padding: 40px 15px 0px
    .title-caption
      margin: 30px 0
      text-align: center
      h3
        font-family: Raleway-Bold
        font-size: 30px
        font-weight: bold
        color: #333333
        margin-bottom 6px
        cursor pointer
        &:hover
          color: #008fd7
      p
        font-family: Raleway-SemiBold
        font-size: 13px
        font-weight: 600
        color: #888888
        &:after
          content: ""
          display: block
          width: 30px
          height: 3px
          background-color: #e62129
          margin: 15px auto 0

    .thumbnail
      margin-bottom: 64px
      line-height: 1.42857143
      a
        width: 100%
        height: 84px
        overflow: hidden
        display: block
        transition: all .5s ease-in-out 0s
        img
          margin: auto
          overflow: hidden
          height: 100%
          max-width 100%
      .caption
        margin-top: 32px
        color: #333
        h3
          text-align: center
          color: #777777
          font-family: Raleway-ExtraBold
          font-size: 24px
          font-weight: 800
          margin-bottom 0
    .btngroup
      display: flex
      overflow: hidden
      button
        display: flex
        justify-content: center
        width: 40px
        height: 40px
        color: #ffffff
        background-color: #006db7
        border-radius: 0
        margin: 0 auto
        svg
          vertical-align middle

    .fade-enter-active, .fade-leave-active
      transition: opacity 0.5s ease-in-out
      overflow: hidden
    .fade-enter, .fade-leave-to
      opacity: 0

  @media (min-width: 1025px)
    .content-section-1
      .thumbnail:hover
        a
          transform: scale(1.15)
        .caption h3
          color: #008fd7
  @media (min-width: 768px) and (max-width: 1024px)
    .content-section-1
      .thumbnail .caption h3
        font-size: 25px
  @media (max-width: 767px)
    .content-section-1
      .container
        padding: 15px 15px 0px
        .title-caption
          margin: 15px 0px
      .title-caption h3
        font-size 20px
        margin-top: 10px
      .thumbnail
        margin-bottom 24px
        a
          height 50px
        .caption
          margin-top 12px
          h3
            font-size: 14px
      .col-3
        padding 0 5px
      .btngroup button
        width: 36px
        height 36px

</style>
