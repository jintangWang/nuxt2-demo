<template>
    <div class="news-container">
        <BannerContent title="News & Events" sub-title="Home / News & Events / list"></BannerContent>

        <div class="news-content">
            <div class="container">
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1"
                           :value="0"  v-model="newType" @change="chooseType">
                    <label class="form-check-label" for="inlineRadio1">ALL</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2"
                           :value="1" v-model="newType" @change="chooseType">
                    <label class="form-check-label" for="inlineRadio1">News</label>
                </div>
                <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3"
                           :value="2" v-model="newType" @change="chooseType">
                    <label class="form-check-label" for="inlineRadio1">Events</label>
                </div>
                <div class="d-flex justify-content-between">
                    <div class="news-left">
                        <div class="news-item" v-if="topNew">
                            <div class="news-card"  v-if="topNew.new_img" v-lazy:background-image='topNew.new_img'></div>
                            <div class="d-flex card-content">
                                <div class="card-tag">
                                    <div class="day-box">
                                        <span>{{topNew.days}}</span>
                                        <span>{{topNew.months}}</span>
                                    </div>
                                    <div class="month-box">{{topNew.years}}</div>
                                </div>
                                <div class="card-desc">
                                    <nuxt-link class="ca-title" :to=" '/news/'+ handlerUrl(topNew.new_title) +'?id=' + topNew.id ">{{topNew.new_title}} </nuxt-link>
                                    <p class="ca-desc">{{topNew.description}}</p>
                                </div>
                                <nuxt-link class="details-link" :to=" '/news/'+ handlerUrl(topNew.new_title) +'?id=' + topNew.id ">Read more ></nuxt-link>
                            </div>
                        </div>
                        <div class="news-item" v-for="item in news" :key="item.id">
                            <div class="news-card"  v-if="item.new_img" v-lazy:background-image='item.new_img'></div>
                            <div class="d-flex card-content">
                                <div class="card-tag">
                                    <div class="day-box">
                                        <span>{{item.days}}</span>
                                        <span>{{item.months}}</span>
                                    </div>
                                    <div class="month-box">{{item.years}}</div>
                                </div>
                                <div class="card-desc">
                                    <nuxt-link class="ca-title" :to=" '/news/'+ handlerUrl(item.new_title) +'?id=' +item.id ">{{item.new_title}} </nuxt-link>
                                    <p class="ca-desc">{{item.description}}</p>
                                </div>
                                <nuxt-link class="details-link" :to=" '/news/'+ handlerUrl(item.new_title) +'?id=' +item.id ">Read more ></nuxt-link>
                            </div>
                        </div>
                        <div class="d-flex pagination-container justify-content-end">
                            <b-pagination
                                    v-model="currentPage"
                                    :total-rows="rows"
                                    :per-page="6"
                                    @input="chooseType"
                            />
                        </div>
                    </div>
                    <NewsRight></NewsRight>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BannerContent from "@/components/BannerContent";
    import NewsRight from "@/components/NewsRight";
    import syncApiService from '@/services/sync-api-service.js';
    import {abbreviation, formatDate} from '@/utils/common.js'
    import { BPagination } from 'bootstrap-vue';

    export default {
        name: "index",
        components: {BannerContent, NewsRight, BPagination},
        head() {
            return {
                title: 'NEWS-APT Power Technology'
            };
        },
        data() {
            return {
                newType: 0,
                topNew: '',
                news: [],
                currentPage: 1,
                rows: 0
            }
        },
        //初始化数据
        async asyncData({params, error}) {
            const res = await syncApiService.get('api/news/index?page=1').then(data => {
                return data;
            }).catch(err => {
                return {};
            });
            let topNew = '';
            let news = [];
          if (res.top_new) {
                let str = formatDate(res.top_new.publish_date);
                let years = str.split('-')[0];
                let months = abbreviation(str.split('-')[1]);
                let days = str.split('-')[2];
                topNew = res.top_new;
                topNew.months = months;
                topNew.days = days;
                topNew.years = years;
            }
            if (res.news) {
                news = res.news;
                news.forEach((item) => {
                    let str = formatDate(item.publish_date);
                    let years = str.split('-')[0];
                    let months = abbreviation(str.split('-')[1]);
                    let days = str.split('-')[2];
                    item.months = months;
                    item.days = days;
                    item.years = years;
                });
            }
            return {
                topNew: topNew,
                news: news,
                rows: res.count
            };
        },
        mounted() {},
        methods: {
            chooseType() {
                this.topNew = '';
                this.news = [];
                this.rows = 0;
                let params = {page: this.currentPage};
                if (this.newType !== 0) {
                    params.type = this.newType
                }
                syncApiService.get('api/news/index', params).then(res => {
                    this.rows = res.count;
                    if (res.top_new) {
                        let str = formatDate(res.top_new.publish_date);
                        let years = str.split('-')[0];
                        let months = abbreviation(str.split('-')[1]);
                        let days = str.split('-')[2];
                        this.topNew = res.top_new;
                        this.topNew.months = months;
                        this.topNew.days = days;
                        this.topNew.years = years;
                    }
                    if (res.news) {
                        this.news = res.news;
                        this.news.forEach((item) => {
                            let str = formatDate(item.publish_date);
                            let years = str.split('-')[0];
                            let months = abbreviation(str.split('-')[1]);
                            let days = str.split('-')[2];
                            item.months = months;
                            item.days = days;
                            item.years = years;
                        });
                    }
                }).catch(err => {
                    return {};
                });
            },
        }
    }
</script>

<style scoped lang="stylus">

    .news-content
        background-color #e7e9ea

    .ca-title
        overflow hidden
        display block
        white-space nowrap
        text-overflow ellipsis
        font-size 18px
        font-weight bold
        color #333333
        &:hover
            color #008fd7

    .card-desc
        overflow hidden

    .ca-desc
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        padding-bottom 0
        color #777777
        font-family 'Open Sans'

    .form-check-inline
        margin 47px 16px 13px 0

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

    .news-container
        color #ffffff
    .news-left
        width 70%
    .news-right
        padding-left 35px
        width 30%
    .news-card
        margin-bottom  20px
        width 100%
        height 356px
        background url("~assets/img/index/AD03.jpg") no-repeat
        background-position center
        background-size cover
    .card-tag
        width 98px
        height 97px
        background-color #fcfcfc
        flex-shrink 0
        margin-right  20px
    .card-content
        position relative
    .details-link
        position absolute
        bottom -5px
        right 0
        font-size 13px
        color #006db7 !important
        font-weight bold
        text-transform uppercase
    .news-item
        margin-bottom 64px
    label
        color #666666
    .pagination-container
        margin-bottom 70px
    .icon-box
        display inline-block
        width 67px
        height 67px
        color #28a9e0
        &.facebook
            margin-left 31px
            color #ffffff
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
    .news-map
        background-color #00b7ee
        height 132px

    @media (max-width: 767px)
        .news-left
            width 100%
        .news-card
            height 201px
        .ca-title
            font-size 16px

        .details-link
            right 0
        .news-item
            margin-bottom 27.5px
        .pagination-container
            justify-content center!important

</style>
