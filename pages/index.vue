<template>
  <div class="">
    <Swiper :info="info"></Swiper>

    <FirstBox></FirstBox>
    <div class="container-fluid">

      <div class="image-bg-1" v-lazy:background-image='require("../assets/img/index/ad01.jpg")'>
        <div class="container d-flex flex-column justify-content-center image-1-content">
          <p class="image-1-title">Tailor-made</p>
          <p class="image-1-title"> the best suited to you.</p>
          <nuxt-link :to="info.recommend_content || '/Products'">
            <button class="more-btn">MORE</button>
          </nuxt-link>
        </div>
      </div>

      <div class="image-bg-2">
        <div class="container d-flex flex-column justify-content-center image-2-content align-items-center">
          <p class="image-2-title">WE expedite your customized ideas into truth</p>
          <div class="image-2-container d-flex">
            <div class="item-box item1 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="item-circle">01</div>
                <span>Requirements<br/>Analysis</span>
              </div>
              <font-awesome-icon icon="angle-right" class="step-arrow"/>
            </div>
            <div class="item-box item2 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="item-circle">02</div>
                <span>Technical<br/>Proposals</span>
              </div>
              <font-awesome-icon icon="angle-right" class="step-arrow item-rotate-1"/>
            </div>
            <div class="item-box item3 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="item-circle">03</div>
                <span>Solution<br/>Confirmation</span>
              </div>
              <font-awesome-icon icon="angle-right" class="step-arrow item-rotate-2"/>
            </div>
            <div class="item-box item4 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="item-circle">04</div>
                <span>Customized<br/>Design</span>
              </div>
              <font-awesome-icon icon="angle-down" class="step-arrow"/>
            </div>
            <div class="item-box item5 d-flex align-items-center justify-content-between">
              <svg version="1.1" id="图层_1" xmlns="http://www.w3.org/2000/svg"
                   xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                   viewBox="0 0 512 640" style="enable-background:new 0 0 512 640; fill: #00b7ee"
                   xml:space="preserve" class="finish-svg">
                <path d="M255.26,304.29h65.52c4.5-11.47,6.89-22.76,6.89-32.72V147.52L197.09,83.38L66.5,147.33v124.24
                  c0,28.13,19.65,65.29,42.91,81.15l87.68,59.8l37.66-25.68v-62.03C234.76,313.48,243.94,304.31,255.26,304.29z M186.83,280.44
                  c-2.44,2.23-6.22,2.07-8.46-0.36l-32.03-34.73c-2.22-2.46-2.04-6.25,0.42-8.47c2.42-2.2,6.16-2.04,8.4,0.34l27.98,30.34l56.25-51.52
                  c2.44-2.24,6.24-2.07,8.48,0.37c2.24,2.44,2.07,6.24-0.37,8.48L186.83,280.44z"/>
                <path d="M83.1,389.19l114,77.75l37.66-25.69v-39.89l-34.28,23.38c-2.04,1.39-4.72,1.39-6.76,0l-91.06-62.1
                  c-26.55-18.1-48.15-58.95-48.15-91.06V143.59c0-2.29,1.3-4.38,3.36-5.39l136.57-66.9c1.67-0.82,3.62-0.82,5.28,0l136.59,67.09
                  c2.05,1.01,3.35,3.1,3.36,5.38v127.79c-0.19,11.17-2.25,22.23-6.09,32.72h34.38c2.71-10,4.12-20.3,4.21-30.66V118.09L197.11,32.1
                  L22,117.86v155.77C22,315.76,48.26,365.44,83.1,389.19z"/>
                <circle cx="298.81" cy="460.5" r="19.4"/>
                <path d="M454.19,357.74c-1.61-1.75-3.89-2.75-6.27-2.76H407.5v33.43h74.85L454.19,357.74z"/>
                <path d="M407.5,454.5h6.34c3.32-17.02,19.82-28.12,36.84-24.8c12.54,2.45,22.35,12.26,24.8,24.8h6.01c4.7,0,8.51-3.81,8.52-8.51
                  v-45.57h-82.5V454.5z"/>
                <circle cx="444.66" cy="460.5" r="19.4"/>
                <path d="M246.75,324.81v121.18c0,4.7,3.81,8.51,8.51,8.51h12.72c3.32-17.02,19.82-28.12,36.84-24.8
                  c12.54,2.45,22.35,12.26,24.8,24.8h65.88V324.8c0-4.7-3.81-8.51-8.51-8.51H255.26C250.56,316.29,246.75,320.11,246.75,324.81z"/>
              </svg>

              <font-awesome-icon icon="angle-left" class="step-arrow"/>
            </div>
            <div class="item-box item6 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="item-circle">07</div>
                <span>Delivery<br/>and Warranty<br/>Service</span>
              </div>
              <font-awesome-icon icon="angle-left" class="step-arrow"/>
            </div>
            <div class="item-box item7 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="item-circle">06</div>
                <span>O&M Manual<br/>and<br/>Documentations</span>
              </div>
              <font-awesome-icon icon="angle-left" class="step-arrow item-rotate-4"/>
            </div>
            <div class="item-box item8 d-flex align-items-center justify-content-between">
              <div class="d-flex align-items-center">
                <div class="item-circle">05</div>
                <span>Manufacturing,<br/>Assembling &<br/>Commissioning, FAT</span>
              </div>
              <font-awesome-icon icon="angle-left" class="step-arrow item-rotate-3"/>
            </div>
          </div>
        </div>
      </div>

      <div class="image-bg-3 d-flex flex-wrap">
        <div class="image-3-left-content">
          <div class="image-bg-3-left scale-img"
               v-lazy:background-image='info.middle_img_1 || require("../assets/img/index/AD03.jpg")'>
          </div>
        </div>
        <div class="image-bg-3-right">
          <p class="image-3-title">Why APT POWER TECHNOLOGY</p>
          <div class="d-flex">
            <font-awesome-icon icon="check-circle" class="check-circle"/>
            <p>APT Power professional <span style="font-weight: bold"> knowledge & experience</span><br/>convinces our
              customers;</p>
          </div>
          <div class="d-flex">
            <font-awesome-icon icon="check-circle" class="check-circle"/>
            <p><span style="font-weight: bold">Maximum</span> to meet customer <span
              style="font-weight: bold">needs</span><br/>by our tailor-made solution；</p>
          </div>
          <div class="d-flex">
            <font-awesome-icon icon="check-circle" class="check-circle"/>
            <p>Competitive prices, <span style="font-weight: bold">much cheaper</span> than our competitors;</p>
          </div>
          <div class="d-flex">
            <font-awesome-icon icon="check-circle" class="check-circle"/>
            <p><span style="font-weight: bold">Good quality and service;</span></p>
          </div>
          <div class="d-flex">
            <font-awesome-icon icon="check-circle" class="check-circle"/>
            <p>Do<span style="font-weight: bold"> more</span> than APT Power <span style="font-weight: bold">responsibilities</span>
              which<br/>we should be taken;</p>
          </div>
        </div>
      </div>

      <div class="image-bg-4" v-lazy:background-image='require("../assets/img/index/AD02.jpg")'>
        <div class="container image-4-content">
          <p class="image-4-title">Nice & cheap</p>
          <p class="image-4-desc">Our customers are the biggest winners in each order.</p>
        </div>
      </div>

      <div class="image-bg-5 d-flex flex-wrap">
        <div class="container image-5-mobile">
          <div class="image-5-title">HOW TO MAKE OUR CUSTOMERS<br/>
            TO BE THE BIGGEST WINNERS
          </div>
          <div class="d-flex">
            <font-awesome-icon icon="check-circle" class="check-circle"/>
            <p class="image-5-desc"><span class="image-5-text">Meeting the requirements</span><br/>APT Power protects
              our customers’ investments</p>
          </div>
          <div class="d-flex">
            <font-awesome-icon icon="check-circle" class="check-circle"/>
            <p class="image-5-desc"><span class="image-5-text">Much cheaper</span><br/>APT Power saves our customers’
              investments </p>
          </div>
          <div class="d-flex">
            <font-awesome-icon icon="check-circle" class="check-circle"/>
            <p class="image-5-desc"><span class="image-5-text">Solutions and service supports</span><br/>APT power helps
              our customers to win their own customers and markets</p>
          </div>

        </div>
        <div class="image-5-right-content">
          <div class="image-bg-5-right scale-img"
               v-lazy:background-image='info.middle_img_2 || require("../assets/img/index/team.jpg")'></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import Swiper from '@/components/index/Swiper'
  import FirstBox from '@/components/index/FirstBox';
  import syncApiService from '@/services/sync-api-service.js';
  import {setRecommendProducts, setCooperation} from '@/utils/common.js'

  export default {
    head() {
      return {
        title: 'APT Power Technology:Customized electrical test equipment and solution|Nice&Cheap',
        meta: [
          {hid: 'keywords', name: 'keywords', content: this.info.keywords},
          {hid: 'description', name: 'description', content: this.info.description}
        ],
        data() {
          return {};
        }
      };
    },
    async asyncData(context) {
      const res = await syncApiService.get('api/home/index/').then(data => {
        return data;
      }).catch(err => {
        return {};
      });
      return res;
    },
    async fetch(context) {
      await Promise.all([setRecommendProducts(context), setCooperation(context)]);
    },
    methods: {
      handleScroll() {
        let el = document.getElementsByClassName('image-1-content')[0];
        let scroll = el.getBoundingClientRect().top;
        if (scroll < 700) {
          if (el.className.indexOf('animated fadeInUp') === -1) {
            el.className += ' animated fadeInUp';
          }
        }
      }
    },
    mounted() {
      window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    components: {
      Swiper,
      FirstBox
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~/assets/css/animate.css';

  .container-fluid
    padding 0

  .check-circle
    margin-top 3px
    margin-right 5px
    color #008fd7
    font-size 16px

  .image-bg-1
    position initial
    background-repeat no-repeat
    background-size cover
    background-position center

  .image-1-content
    padding-top 7.29%
    padding-bottom 7.29%

  .image-2-content
    padding-top 67px
    padding-bottom 90px
    color #ffffff

  .image-bg-2
    background-color #00b7ee

  .image-2-title
    position relative
    text-transform uppercase
    font-size 21px
    font-family 'Raleway-Bold'
    color #ffffff
    align-self flex-start

  .image-3-title
    position relative
    text-transform uppercase
    font-size 24px
    font-family 'Raleway-ExtraBold'
    color #333333
    padding-bottom 41px

  .image-3-mobile
    display none


  .image-3-mobile-title
    font-family 'Raleway-Bold'
    font-size 19.8px
    color #333333
    padding-top 30px
    padding-bottom 18.5px

  .image-5-text
    font-weight bold
    color #333333
    font-family 'Raleway-Bold'

  .image-5-desc
    padding-bottom 30px
    color #333333

  .image-5-title
    position relative
    text-transform uppercase
    font-size 21px
    font-family 'Raleway-ExtraBold'
    color #333333
    padding-bottom 51px

  .image-2-title:before, .image-3-title:before, .image-5-title:before
    content ""
    position absolute
    width 30px
    height 3px
    background-color #ffffff
    left 0
    top -12px

  .image-3-title:before
    background-color #e62129

  .image-5-title:before
    background-color #008fd7

  .image-2-container
    width 100%
    background-color #FFFFFF
    flex-wrap wrap

  .item-box
    width 25%
    height 119px
    padding 0 20px


  .item-box:hover
    background-color #00b7ee
    color #ffffff
    border 2px solid #e8e8e8

  .item-box:hover > .item1, .item2, .item3, .item4, .item5, .item6, .item7, .item8
    border none


  .item-box:hover .finish-svg
    fill #ffffff !important

  .item-box:hover .step-arrow, .item-box:hover span
    color #ffffff

  .item-box:hover .item-circle
    border-color #ffffff
    color #ffffff

  .item-box span
    color #00b7ee
    font-family 'Raleway-ExtraBold'
    text-transform uppercase
    white-space nowrap

  .item1, .item2, .item3, .item4
    border-bottom 2px solid #00b7ee

  .item2, .item3, .item4, .item6, .item7, .item8
    border-left 2px solid #00b7ee


  .finish-svg
    margin-top 15px
    margin-left 35%
    width 82px
    height 78px


  .item-circle
    display flex
    align-items center
    justify-content center
    flex-shrink 0
    width 76px
    height 76px
    border-radius 50%
    border 2px solid #00b7ee
    font-size 33px
    color #00b7ee
    margin-right 10px

  .image-3-left-content
    overflow hidden
    width 55%

  .image-5-right-content
    overflow hidden
    width 45%
    height 100%
    position absolute
    right 0
    top 0


  .image-bg-4
    background-repeat no-repeat
    background-size cover
    background-position center

  .image-4-content
    padding-top 7.29%
    padding-bottom 7.29%

  .image-4-title
    padding-bottom 26px
    font-size 72px
    font-family 'Raleway-ExtraBold'
    text-transform uppercase
    color #ffffff

  .image-4-desc
    font-size 30px
    color #fefefe


  .image-bg-5-left
    width 55%


  .image-bg-3-left
    width 100%
    height 100%
    background no-repeat
    background-size cover
    background-position center


  .image-bg-3-right
    background-color #e7e9ea
    padding 49px 0 40px 60px

  .image-bg-5-right
    position absolute
    right 0
    top 0
    width 100%
    height 100%


  .image-bg-5
    position relative
    padding-top 7.1%
    padding-bottom 7.1%


  .image-bg-3-right
    width 45%

  .image-bg-5-right
    background-repeat no-repeat
    background-size cover
    background-position center

  .image-1-title
    font-size 30px
    color #f0f3f5
    font-family 'Raleway-Bold'
    text-transform uppercase

  .more-btn
    margin-top 15px
    width 135px
    height 49px
    border-radius 24.6px
    background-color #006db7
    color #ffffff
    font-family 'Raleway-Bold'
    font-size 13px

  .step-arrow
    color #00b7ee
    font-size 30px


  @media (max-width: 991px)
    .more-btn
      position absolute
      bottom -24.5px
      left 0
      right 0
      margin 0 auto

    .image-bg-1
      position relative

    .image-1-title
      font-size 25px

    .item-box
      width 50%
      pointer-events none

    .item1
      order 1

    .item2
      order 2

    .item4
      order 3

    .item3
      order 4

    .item5
      order 7

    .item6
      order 8

    .item8
      order 5
      border-bottom 2px solid #00b7ee

    .item7
      order 6
      border-bottom 2px solid #00b7ee

    .item-circle
      width 40px
      height 40px
      font-size 18.3px
      margin-right 5px

    .item-box
      height 65px
      padding 0 10px 0 5px

    .item-box span
      font-size 10px
      line-height 1


    .image-3-left-content, .image-bg-3-right
      width 100%

    .image-bg-3-left
      padding-bottom 80%

    .image-bg-3-right
      padding 49px 15px 40px

    .image-3-mobile
      display block
      width 100%

    .image-4-title
      margin-top 40px
      font-size 40px

    .image-4-desc
      font-size 25.3px

    .image-5-mobile
      width 100%

    .image-5-right-content
      position relative
      width 100%
      padding-bottom 80%
      pointer-events none

    .image-bg-5
      padding-bottom 0

    .finish-svg
      margin-left 40%
      margin-top 11px
      width 50px

    .item4, .item8
      border-left 2px solid #ffffff

    .step-arrow
      font-size 20px

    .item-rotate-1
      transform rotate(90deg)

    .item-rotate-2
      transform rotate(-180deg)

    .item-rotate-3
      transform rotate(180deg)

    .item-rotate-4
      transform rotate(-90deg)


  @media (min-width: 768px) and (max-width: 991px)
    .item-circle
      width 60px
      height 60px
      margin-right 10px

    .item-box
      height 100px
      padding 0 10px

    .item-box span
      font-size 16px

    .item-circle
      font-size 30px

  @media (min-width: 992px) and (max-width: 1199px)
    .item-circle
      width 60px
      height 60px
      margin-right 10px

    .item-box
      padding 0 10px

    .item-box span
      font-size 12px

</style>
