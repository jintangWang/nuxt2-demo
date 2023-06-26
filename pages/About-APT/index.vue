<template>
    <div class="">
        <BannerContent title="About APT" sub-title="Home   /   About APT"
                       :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')"></BannerContent>
        <div class="about-container">
            <div class="container">
                <div class="about-desc">
                    <p class="desc1" @click="toDetails(apt[0])">Who we are</p>
                    <p class="desc2">APT Power expedites your customized idea.</p>
                </div>
            </div>
            <div class="image-container d-flex flex-wrap">
                <div class="container image-item">
                    <div class="image-box">
                        <div class="item-title" @click="toDetails(apt[1])">{{apt[1].title}}</div>
                        <div class="item-desc bg1-desc" v-html="apt[1].content">
                        </div>
                    </div>
                </div>
                <div class="image-bg" @click="toDetails(apt[1])"  v-lazy:background-image='apt[1].image'></div>
            </div>
            <div class="image-container container2">
                <div class="container image-item d-flex justify-content-end bg2">
                    <div class="image-box">
                        <div class="item-title" @click="toDetails(apt[2])">{{apt[2].title}}</div>
                        <div class="item-desc" v-html="apt[2].content"></div>
                    </div>
                </div>
                <div class="image-bg-2"  @click="toDetails(apt[2])" v-lazy:background-image='apt[2].image'></div>
            </div>
            <div class="image-container">
                <div class="container image-item">
                    <div class="image-box">
                        <div class="item-title" @click="toDetails(apt[3])">{{apt[3].title}}</div>
                        <div v-html="apt[3].content">
                        </div>
                    </div>
                </div>
                <div class="image-bg bg3" @click="toDetails(apt[3])" v-lazy:background-image='apt[3].image'></div>
            </div>
            <FirstBox />
        </div>
    </div>
</template>

<script>
    import BannerContent from "@/components/BannerContent";
    import FirstBox from '@/components/index/FirstBox';
    import syncApiService from '@/services/sync-api-service.js';
    import { setCooperation } from '@/utils/common.js'

    export default {
        name: "index",
        components: {BannerContent, FirstBox},
        head() {
            return {
                title: 'About APT Power Technology'
            };
        },
        data() {
            return {
                apt: []
            }
        },

        async asyncData(context) {
            const res = await syncApiService.get('api/company/aboutApt').then(data => {
                return data;
            }).catch(err => {
                return {};
            });
            return {
                apt: res.info
            };
        },
        async fetch(context) {
            await setCooperation(context);
        },

        methods: {
            toDetails(item) {
                this.$router.push(`/About-APT/${this.handlerUrl(item.title)}?id=${item.id}`);
            }
        }
    }
</script>

<style scoped lang="stylus">
    .link-more
        font-size 16px
        color #006db7 !important
    .about-container
        background-color #e7e9ea

    .about-desc
        padding 69px 0 43px
        text-align center

     .img3
        height 84px

    .img2
        height 89px

    .desc1
        font-family 'Raleway-Bold'
        font-size 30px
        color #333333
        padding-bottom 12px
        cursor pointer
        &:hover
            color #008fd7

    .desc2
        position relative
        color #777777
        padding-bottom 62px
    .desc2:after
        content ''
        position absolute
        width 30px
        height 3px
        background-color #008fd7
        top 25px
        left 0
        right 0
        margin 0 auto

    .desc3
        padding-bottom 0
        font-size 24px
        color #333333
    .image-container
        position relative
        background-color #ffffff
        &.container2
            background-color #e7e9ea

    .image-item
        padding-top 3.6%
        &.bg2
            min-height 473px

    .image-box
        width 48.2%

    .image-bg
        position absolute
        right 0
        bottom 0
        width 49.2%
        height 100%
        background url('~assets/img/index/team.jpg') no-repeat
        background-size cover
        background-position center
        cursor pointer
        &.bg3
            background url('~assets/img/about/about2.jpg') no-repeat
            background-size cover
            background-position center

    .image-bg-2
        position absolute
        left  0
        bottom 0
        width 49.2%
        height 100%
        background url('~assets/img/about/about1.jpg') no-repeat
        background-size cover
        background-position center
        cursor pointer

    .item-title
        position relative
        padding-bottom 29px
        color #333333
        font-family 'Raleway-ExtraBold'
        font-size 21px
        text-transform uppercase
        cursor pointer
        &:hover
            color #008fd7

    .item-title:before
        content ""
        position absolute
        width 30px
        height 3px
        background-color #008fd7
        left 0
        top -12px
    .item-desc
        color #777777

    .item-arrow
        padding-bottom 12px
        color #666666

    .icon-box
        margin-right 10px
        color #008fd7
    .check-circle
        margin-top 3px
        margin-right 5px
        color #008fd7
        font-size 16px
    .bg3-title
        font-size 18px
        color #333333
        font-family 'Raleway-Bold'
    .bg3-desc
        padding-top  13px
        font-size 13px
        color #777777
    .bottom-content
        padding-top 69px
        padding-bottom 77px
        text-align center
    .bottom-title
        position relative
        font-family 'Raleway-Bold'
        color #333333
        padding-bottom 46px
        font-size 30px

    .bottom-title:after
        content ''
        position absolute
        width 30px
        height 3px
        background-color #008fd7
        top 30px
        left 0
        right 0
        margin 0 auto

    @media (max-width: 768px)
        .desc3
            font-size 16px
        .image-bg, .image-bg-2
            position relative
            width 100%
            height 308px
        .image-box
            width 100%
        .image-item
            padding-top 54.5px
            padding-bottom 54.5px
        .image-item.bg2
            min-height auto
        .item-desc
            padding-bottom 0
        .bg1-desc
            padding-bottom 30px
        .img1,.img2,.img3,.img4
            width 20%
            height auto
        .bottom-title
            font-size 25px

</style>
