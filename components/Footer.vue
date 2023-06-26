<template>
    <footer class="footer-container">
        <div class="container">
            <div class="scroll-up-x" @click="backToTop">
                <font-awesome-icon icon="angle-up"/>
            </div>
            <div class="row no-gutters d-flex justify-content-between">
                <div class="col-md-6  col-12 col-xl-3 order-md-first order-xl-first d-flex flex-column align-items-start">
                    <div class="pad-desc">
                        <div class="d-flex title align-items-center">
                            <img src="/img/logo.png" alt="logo" class="footer-logo">
                            <span>ABOUT APT POWER</span>
                        </div>

                        <div class="footer-desc">
                           {{info.about}}
                        </div>
                        <p class="mail">E-mail:{{info.email}}<br><span style="opacity: 0">E-mail:</span>apt@vip.163.com</p>
                        <h3 class="job-title">JOB APPLICATION</h3>
                        <p>
                            Send your resume to <span style="color: #00b7ee">recruit@xaapt.com</span>
                        </p>
                    </div>
                </div>
                <div class="col-md-6  col-xl-3 col-6 d-flex flex-column align-items-center order-md-last order-xl-first">
                    <div class="link-title align-self-start">PRODUCTS</div>
                    <div class="link-one">
                        <nuxt-link :to="'/Products/' + handlerUrl(menu.category_name) + '?id=' + menu.id"
                                   v-for="(menu, index) in $store.state.productMenus.slice(0,9)"
                                   :key="'product-footer-left' + index">>
                          {{menu.category_name}}
                        </nuxt-link>
                    </div>
                </div>
                <div class="col-md-6  col-xl-3 col-6 d-flex flex-column align-items-start order-md-last order-xl-first">
                    <div class="link-two">
                        <nuxt-link :to="'/Products/' + handlerUrl(menu.category_name) + '?id=' + menu.id"
                                   v-for="(menu, index) in $store.state.productMenus.slice(9)"
                                   :key="'product-footer-right' + index">>
                          {{menu.category_name}}
                        </nuxt-link>
                    </div>
                </div>
                <div class="col-md-6  col-xl-3 col-12 mobile-contact d-flex flex-column align-items-first">
                    <div class="mobile-map">
                        <div class="link-title">CONTACT US</div>
                        <address>
                            | <span :class="isXian ? 'map-text text-active' : 'map-text'" @click="changeMap('xian')">Headquarter</span> | <span :class="!isXian ? 'map-text text-active' : 'map-text'" @click="changeMap('beijing')">Beijing Representative</span> |
                        </address>
                        <div class="map-content" v-lazy:background-image='mapImage'></div>
                        <span class="map-desc" v-html="mapDesc"></span>
                    </div>
                </div>
            </div>
            <div class="row no-gutters d-flex align-items-end contact-box">
                <div class="col-md-6 col-xl-3 col-12 mobile-input-email">

<!--                    <div class="input-group">-->
<!--                        <input type="text" class="form-control input-send" placeholder="Your email address" aria-label="Recipient's username" aria-describedby="button-addon2">-->
<!--                        <div class="input-group-append">-->
<!--                            <button class="btn btn-primary send-btn" type="button" id="button-addon2" @click="gmailLogin">-->
<!--                                <font-awesome-icon icon="envelope"/>-->
<!--                            </button>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
                <div class="col-md-6 col-xl-3 col-12  d-flex flex-column align-items-start">
                    <div class="mobile-phone-box">
                        <div class="phone">Tel: + {{info.tel}}</div>
                        <div class="phone"> Fax:+ {{info.fax}}</div>
                    </div>
                </div>
                <div class="col-md-6 col-xl-3 col-12">
                    <div class="email-con">E-mail:{{info.email}}<span style="opacity: 0">E-mail:</span>apt@vip.163.com</div>
                </div>
                <div class="col-md-6 col-xl-3 col-12 icon-content">
                    <div class="d-flex align-items-center">
                        <span style="color:#ffffff;font-size: 16px;padding-right: 5px">Follow us</span>
                        <font-awesome-icon :icon="['fab', 'facebook-square']" class="icon-box" @click="linkTo('facebook')"/>
                        <font-awesome-icon :icon="['fab', 'twitter-square']" class="icon-box" @click="linkTo('twitter')"/>
                    </div>
                </div>
            </div>
            <div class="row no-gutters footer-bottom">
                <div class="col-md-12 col-xl-9 col-sm-9 col-12 d-flex mobile-bottom">
                    <div class="reserved">{{info.icp}}</div>
                    <div class="policy">
                      | <nuxt-link to="/Sitemap">Sitemap</nuxt-link> | Legal notice | Privacy Policy |
                    </div>
                </div>
                <div class="col-md-12 col-xl-3  col-12 mobile-none">
                    <div>Nice & Cheap.</div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
    import syncApiService from '@/services/sync-api-service.js';
    export default {
        name: "Footer",
        data() {
            return {
                isXian: true,
                mapImage: require('../assets/img/footer/address-map.png'),
                mapDesc: 'A Tower TF International Plaza,18# Fenghui<br/>South Road Hi-Tech Zone,Xi’an710075,<br/>CHINA',
                info: {}
            }
        },
        created() {
          if (process.browser) {
            syncApiService.get('api/home/index/').then(data => {
              this.info = data.about_apt;
              this.mapImage = this.info.website_map_1;
            }).catch(err => {
              return {};
            });
          }
        },
        methods: {
            backToTop() {
                scrollTo(0,0);
            },
            linkTo(type) {
                const URL = type === 'twitter' ? 'https://twitter.com/apt_power' : 'https://www.facebook.com/APTPowerTech/';
                window.open(URL);
            },
            changeMap(type) {
                this.isXian = type === 'xian';
                this.mapImage = this.isXian ? this.info.website_map_1 : this.info.website_map_2;
                this.mapDesc = this.isXian ? 'A Tower TF International Plaza,18# Fenghui<br/>South Road Hi-Tech Zone,Xi’an710075,<br/>CHINA' : 'Beijing,CHINA';
            },
            gmailLogin() {
                window.open('https://accounts.google.com/AccountChooser?service=mail&continue=https://mail.google.com/mail/');
            },
        }
    }
</script>

<style scoped lang="stylus">

    .policy-link
        display inline-block

    .policy-link:hover
        color #008fd7

    .mail
        padding-bottom 70px
        font-family inherit
        font-weight bold
        font-size 21px
        color #ffffff
        word-break break-all

    .container
        position relative

    .scroll-up-x
        position absolute
        top -41px
        right 15px
        width 35px
        height 35px
        background-color #fdfdfd
        display flex
        align-items center
        justify-content center
        font-size 20px
        color #527491
        cursor pointer

    .footer-container
        position relative
        width 100%
        background-color #25272e
        padding 41px 0 26px
        color #bcc0c4

    .footer-logo
        width 85px
        max-width 85px

    .input-send
        background-color #49525a
        color #ffffff
        outline none
        border none


    p
        padding-bottom 0
        color #bcc0c4

    a
        display block
        color #bcc0c4

    .link-two
        margin-top 68px

    .icon-box
        display inline-block
        margin-right 5px
        font-size 30px
        color #ffffff
        cursor pointer

    .send-btn
        width 38px
        background-color #006db7
        border none
        padding 0

    .map-content
        margin 30px 0 26px
        width: 261px
        height 139px
        background-repeat no-repeat
        background-size 100% 100%

    .contact-box
        margin-top 40.5px
        padding-bottom 16px

    .title
        font-size 15px
        color #ffffff

    .title > span
        color #ffffff


    .reserved
        letter-spacing -0.3px
        color #bcc0c4
        font-size 12px

    .policy
        margin-left 22px
        a
            display inline


    .link-title
        margin-left 40px
        margin-top 21px
        margin-bottom 25px
        font-size 15px
        color #ffffff

    .footer-desc
        padding-bottom: 42px
        width 260px


    .job-title
        margin-bottom 0
        font-size 15px
        color #ffffff

    .row
        margin-bottom 0

    .footer-bottom
        border-top 1px solid gray
        padding-top 21px
        font-size 12px
        color #bcc0c4

    address, .map-text, .map-desc
        color #bcc0c4

    .map-desc
        display block
        height 60px

    .map-text
        cursor pointer

   .text-active
       color #008fd7

    .phone
        font-size 18px
        color #ffffff

     .link-one a:hover, .link-two a:hover
         color #008fd7
         text-decoration: underline
    .email-con
        display none

    @media (max-width: 767px)
        .link-one a, .link-two a
            margin-bottom 15px

        .mail
            display none

        .container
            position initial

        .scroll-up-x
            display none

        .footer-desc
            width 100%
            word-break break-all

        .link-title
            margin-left 0

        .link-one
            font-size 11px
            align-self flex-start

        .link-two
            width 84%
            font-size 11px
            align-self flex-end

        .mobile-input-email
            position absolute
            width 92%
            margin 0 auto
            left 0
            right 0
            top 600px

        .mobile-contact
            margin-top 120px

        .map-content
            width 100%

        .mobile-phone-box
            align-self flex-start

        .mobile-bottom
            flex-direction column-reverse
            align-items center

        .mobile-none
            display none

        .contact-box
            margin-top 26px

        .email-con
            display block
            margin 50px 0
            width 100%
            text-align center
            color #ffffff
            font-size 20px
            font-weight bold

        .mobile-map
            align-self flex-start

        .phone
            font-size 15.3px
            color #bcc0c4

    @media (min-width: 768px) and (max-width: 1025px)

        .link-title
            margin-left 0

        .link-one
            align-self flex-start

        .link-two
            align-self flex-start
        .pad-desc
            align-self flex-start
        .mobile-map
            align-self flex-start
        .input-group
            width 80%
        .mobile-phone-box
            align-self flex-start
        .icon-content
            margin-top 20px

         .mobile-none
            display none
        .policy,.reserved
            width 50%
            margin-left 0
            padding 0

</style>
