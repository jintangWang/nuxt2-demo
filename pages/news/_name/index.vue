<template>
    <div class="news-container">
        <BannerContent title="News & Events" sub-title="Home / News & Events / list"/>

        <div class="news-content">
            <div class="container">
                <div class="d-flex justify-content-between">
                    <div class="news-left">
                        <div class="details-img" v-if="details.new_img" v-lazy:background-image='details.new_img'></div>
                        <div class="d-flex details-content">
                            <div class="card-tag">
                                <div class="day-box">
                                    <span>{{details.days}}</span>
                                    <span>{{details.months}}</span>
                                </div>
                                <div class="month-box">{{details.years}}</div>
                            </div>
                            <div>
                                <p class="details-title">{{details.new_title}}</p>
                                <p class="details">{{details.description}}</p>
                                <div class="details-address" v-html="details.new_content">
                                </div>
                            </div>
                        </div>
                        <!--                    <div class="d-flex icon-content">-->
                        <!--                        <div class="icon-box">-->
                        <!--                            <div class="pop">1k</div>-->
                        <!--                            <font-awesome-icon :icon="['fab', 'facebook-f']" class="icon"/>-->
                        <!--                            Like-->
                        <!--                        </div>-->
                        <!--                        <div class="icon-box twitter">-->
                        <!--                            <div class="pop">85</div>-->
                        <!--                            <font-awesome-icon :icon="['fab', 'twitter']" class="icon"/>-->
                        <!--                            Tweet-->
                        <!--                        </div>-->
                        <!--                    </div>-->
                    </div>
                    <NewsRight/>
                </div>
            </div>
        </div>
        <div class="container bottom-content">
            <ProductSwiper/>
        </div>
    </div>
</template>

<script>
    import BannerContent from "@/components/BannerContent";
    import NewsRight from "@/components/NewsRight";
    import syncApiService from '@/services/sync-api-service.js';
    import {abbreviation, setRecommendProducts, formatDate} from '@/utils/common.js'
    import ProductSwiper from "@/components/ProductSwiper";
    import jsonld from '@/utils/jsonld.js';
    export default {
        name: "new-details",
        components: {BannerContent, NewsRight, ProductSwiper},
        head() {
            if (Object.keys(this.details).length === 0) return {};
            const article = {
                url: this.$route.path,
                title: this.details.new_title,
                image: [
                    this.details.new_img,
                ],
                publishDate: this.details.publish_date,
            };
            return {
                title: this.details.new_title + '-APT Power Technology',
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
        async asyncData(context) {
            let res = await syncApiService.get('api/news/detail', {id: context.query.id}).then(data => {
                return data;
            }).catch(err => {
                return {info: {}};
            });
            let details = res.info;
            if (Object.keys(details).length === 0) return;
            let str = formatDate(details.publish_date);
            details.years = str.split('-')[0];
            details.months = abbreviation(str.split('-')[1]);
            details.days = str.split('-')[2];
            return {details: details}
        },
        async fetch(context) {
            await setRecommendProducts(context);
        },
        data() {
            return {
                details: {}
            }
        },
        beforeMount() {
        },
        mounted() {
        }
    }
</script>

<style scoped lang="stylus">
    .news-container
        color #ffffff

    .news-left
        width 70%

    .news-right
        padding-left 35px
        width 30%

    .card-tag
        width 98px
        height 97px
        background-color #fcfcfc
        flex-shrink 0
        margin-right 20px

    .card-content
        position relative

    .details-link
        position absolute
        bottom 0
        right 0
        font-size 13px
        color #006db7 !important
        font-weight bold

    .news-item
        margin-bottom 64px

    label
        color #666666

    .pagination-container
        margin-bottom 70px


    .right-link
        display block
        padding 7px 0
        border-bottom 1px solid #ffffff
        color #777777 !important

    .calendar-box
        padding 10px 0
        border-bottom 1px solid #ffffff

    .calendar-icon
        margin 5px 5px 0 0
        color #006db7
        font-size 12px

    .details-img
        margin-bottom 20px
        height 356px
        background url("~assets/img/index/AD03.jpg") no-repeat
        background-position center
        background-size cover

    .news-content
        padding-top 69px
        background-color #e7e9ea

    .details-title
        font-weight bold
        color #333333
        font-size 17px

    .details
        color #777777
        font-size 13px

    .details-address
        margin-bottom 36px
        padding 24px 0 36px
        color #333333
        font-size 18px

    .icon-box
        position relative
        display inline-block
        margin 100px 0 42px 0
        width 68px
        height 27px
        line-height 27px
        border-radius: 1.8px
        background-color #3b5998
        font-size 13px
        text-align center
        color #ffffff

        &.twitter
            margin-left 25px
            background-color #00abf0

    .icon
        color #ffffff

    .pop
        position absolute
        left 0
        right 0
        margin 0 auto
        top -50px
        width 49px
        height 39px
        border 1px solid #bbbbbb
        background-color #ffffff
        text-align center
        line-height 37px
        font-size 15px
        font-weight bold
        color #3a383a



        /*第一个三角形*/

     .pop:before
         content: '';
         display: block;
         position: absolute;
         left: 50%
         margin-left -5px
         bottom -6px
         border-left: 5px solid transparent;
         border-right: 5px solid transparent;
         border-top: 5px solid #bbbbbb;

        /*第二个三角形*/

     .pop:after
         content: '';
         display: block;
         position: absolute;
         bottom -5px
         left: 50%
         margin-left -5px
         border-left: 5px solid transparent;
         border-right: 5px solid transparent;
         border-top: 5px solid #ffffff;
    .orders-item
        width 25%

    .img-box
        flex-shrink 0
        margin-right 19px
        width 98px
        height 98px
        background-color #00b7ee
    .bottom-content
        padding-top 80px
        padding-bottom 80px
    .item-link
        color #1b5cc9 !important

    .month-box
        height 24px
        line-height 24px
        background-color #008fd7
        text-align center
        font-family 'Open Sans'
        font-weight bold
        font-size 16px
    .day-box
        display flex
        align-items center
        justify-content flex-end
        flex-direction column
        height 73px
        text-align center
        color #333333
        font-size 34px
        font-family 'Open Sans'
        font-weight bold
    .day-box span
        color #333333

    .day-box span:last-child
        padding-top 10px
        font-size 16px

    .orders-title
        color #333333
        font-size 18px
        font-family 'Raleway-Bold'
        padding-bottom 5px

     .orders-desc
        color #777777
        padding-bottom 5px
        line-height 1.2


    .orders-box
        flex-shrink 0
        width 105px

    .swiper-container
        height 150px

    @media (max-width: 767px)
        .news-content
            padding-top 25.5px
        .news-left
            width 100%
        .details-img
            height 201px

        .card-tag
            margin-top -70px

        .details-content
            flex-direction column

        .details-title
            padding 25px 0 33px
        .details-address
            margin-left 0
            padding 24px 0 36px
        .icon-content
            justify-content center
        .img-box
            width 80px
            height 80px
        .orders-box
            width auto
            flex-shrink initial



</style>
