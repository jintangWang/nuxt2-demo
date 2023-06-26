<template>
    <section class="info-container">
        <BannerContent title="Our Customers" sub-title="Home/About APT/Our Customers"
                       :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')">
        </BannerContent>
        <section class="container">
            <article class="list-container">
                <h3 class="list-title">LIST</h3>
                <article class="list-item" v-for="item in list" :key="item.id" @click="toDetails(item.id,item.cooperation_name )">
                    <div>
                        <h5>{{item.cooperation_name}}</h5>
<!--                        <p class="phone-hide">{{item.content}}</p>-->
                    </div>
                    <font-awesome-icon icon="angle-right" class="item-arrow"/>
                </article>
            </article>
            <NewsRight class="phone-hide"></NewsRight>
        </section>
    </section>
</template>

<script>
    import BannerContent from "@/components/BannerContent";
    import NewsRight from "@/components/NewsRight";
    import syncApiService from '@/services/sync-api-service.js';

    export default {
        name: "customers",
        data() {
            return {
                list: []
            };
        },
        head() {
            return {
                title: 'Our Customers-APT Power Technology'
            };
        },
        components: {
            BannerContent, NewsRight
        },
        async asyncData(context) {
            const res = await syncApiService.get('api/cooperation/getLists').then(data => {
                return data;
            }).catch(err => {
                return {};
            });
            return {
                list: res
            };
        },
        methods: {
            toDetails(id, name) {
                this.$router.push({name: 'About-APT-customers-name', params:{name: this.handlerUrl(name)}, query: {id: id}});
            }
        }
    }
</script>

<style scoped lang="stylus">
    .info-container
        .container
            display flex
            margin-top: 70px
        .list-container
            display flex
            flex-direction column
            width: 70%
            padding-bottom: 60px
            @media (max-width: 767px)
                width: 100%
        .list-title
            font-family: Raleway-Bold
            font-size: 15px
            font-weight: bold
            line-height: 1.07
            color: #333333
            border-bottom: 1px solid  #eeeeee
            margin-bottom 0
            padding-bottom 12px
        .list-item
            display flex
            align-items center
            justify-content: space-between
            height: 90px
            cursor pointer
            border-bottom: 1px solid  #eeeeee
            @media (max-width: 767px)
                height 77px

            h5
                font-family: Raleway-Bold
                font-size: 13px
                font-weight: bold
                line-height: 1.23
                color: #777777
                margin-bottom: 5px
            p
                padding-bottom 0
                font-family: OpenSans
                font-size: 13px
                line-height: 1.54
                letter-spacing: -0.32px
                color: #777777
            .item-arrow
                font-size 18px
                margin-left: 15px



</style>
