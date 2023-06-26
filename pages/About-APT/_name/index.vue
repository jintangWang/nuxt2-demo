<template>
    <div class="">
        <BannerContent title="Company Profile" sub-title="Home / about APT"
                       :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')" />
        <div class="about-container">
            <div class="container d-flex">
                <div class="about-left">
                    <p class="details-title">{{details.title}}</p>
                    <div class="about-img"  v-if="details.image"  v-lazy:background-image='details.image'></div>
                    <p class="subtitle">{{details.description}}</p>
                    <div v-html="details.content" />
                </div>
                <NewsRight />
            </div>
            <FirstBox />
        </div>
    </div>
</template>

<script>
    import BannerContent from "@/components/BannerContent";
    import NewsRight from "@/components/NewsRight";
    import syncApiService from '@/services/sync-api-service.js';
    import FirstBox from '@/components/index/FirstBox';
    import { setCooperation } from '@/utils/common.js'
    import jsonld from '@/utils/jsonld.js';

    export default {
        name: "aboutDetails",
        head() {
            const article = {
                url: this.$route.path,
                title: this.details.title,
                image: [
                    this.details.image,
                ],
                publishDate: this.details.create_time,
                modifiedDate: this.details.update_time
            };
            return {
                title: this.details.title + '-APT Power Technology',
                meta: [
                    {hid: 'keywords', name: 'keywords', content: this.details.keywords},
                    {hid: 'description', name: 'description', content: this.details.description}
                ],
                __dangerouslyDisableSanitizers: ['script'],
                script: [
                    jsonld.getArticle(article)
                ],
            };
        },
        data() {
            return {
                details: {}
            }
        },
        async asyncData(context) {
            let res = await syncApiService.get('api/company/getDetail?id=' + context.query.id).then(data => {
                return data;
            }).catch(err => {
                return {details: {}};
            });
            return {details: res.info}
        },
        async fetch(context) {
            await setCooperation(context);
        },
        components: {
          BannerContent,
          NewsRight,
          FirstBox
        },
        created() {

        }
    }
</script>

<style scoped lang="stylus">
    .about-container
        padding 68px 0 73px
        background-color #e7e9ea

    .about-left
        width 70%

    .about-img
        width: 100%
        height: 356px
        background url('~assets/img/index/team.jpg') no-repeat
        background-size cover
        background-position center

    .img3
        height 84px

    .img2
        height 89px

    .details-title
        position relative
        font-family 'Raleway-ExtraBold'
        font-size 24px
        color #333333
        padding-bottom 47px

    .details-title:before
        content ""
        position absolute
        width 30px
        height 3px
        background-color #008fd7
        left 0
        top -12px

    .subtitle
        padding 20px 0 29px
        color #333333
        font-size 18px
        font-family 'Raleway-Bold'

    .bottom-content
        margin-top 180px
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

    @media (max-width: 767px)
        .about-left
            width 100%

        .about-img
            height 201px

        .details-title
            padding-bottom 21.5px
            font-size 20px

        .subtitle
            padding 19.5px 0
            font-size 16px

        .bottom-content
            margin-top 110px

        .img1, .img2, .img3, .img4
            width 20%
            height auto
        .bottom-title
            font-size 25px
</style>
