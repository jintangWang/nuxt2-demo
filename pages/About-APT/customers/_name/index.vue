<template>
    <section class="info-detail-container">
        <BannerContent title="Our Customers" sub-title="Home/About APT/Our Customers"
                       :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')">
        </BannerContent>
        <section class="container">
            <article class="detail-container">
                <figure v-if="details.image">
                    <img v-lazy="details.image" alt="info">
                </figure>
                <h3 class="details-title">{{details.title}}</h3>
                <div class="content" v-html="details.content">
                </div>
                <p class="content">
                    {{details.create_time}}
                </p>
            </article>
            <NewsRight class="phone-hide" />
        </section>
    </section>
</template>

<script>
    import BannerContent from "@/components/BannerContent";
    import NewsRight from "@/components/NewsRight";
    import syncApiService from '@/services/sync-api-service.js';
    import jsonld from '@/utils/jsonld.js';

    export default {
        name: "customer-detail",
        data() {
            return {
                details: {}
            };
        },
        head() {
            let article = {};
            let obj = {
                title: 'Our Customers-APT Power Technology',
            };
            if (Object.keys(this.details).length !== 0) {
                article = {
                    url: this.$route.path,
                    title: this.details.title,
                    image: [
                        this.details.image,
                    ],
                    publishDate: this.details.create_time,
                    modifiedDate: this.details.update_time,
                };
                obj = {
                    title: 'Our Customers-APT Power Technology',
                    __dangerouslyDisableSanitizers: ['script'],
                    script: [
                        jsonld.getArticle(article)
                    ],
                };
            }
            return obj;
        },
        components: {
            BannerContent, NewsRight
        },
        async asyncData(context) {
            const res = await syncApiService.get('api/cooperation/getDetail?id=' + context.query.id).then(data => {
                return data;
            }).catch(err => {
                return {details: {}};
            });
            let details = res === null ? {} : res;
            return {
                details: details
            };
        },
        created() {}
    }
</script>

<style scoped lang="stylus">
    .info-detail-container
        .container
            display flex
            margin-top: 70px
        figure img
            width 100%
            height 356px
            object-fit cover

        .details-title
            margin 19px 0 22px

        .detail-container
            display flex
            flex-direction column
            width: 70%
            padding-bottom: 60px
            @media (max-width: 767px)
                width: 100%
            .content
                font-family: OpenSans
                font-size: 13px
                line-height: 1.54
                color: #777777

    @media (max-width: 768px)
        .info-detail-container
            .container
                margin-top 39px
            figure img
                height 201px
</style>
