<template>
    <div>
        <BannerContent title="Contact us" sub-title="Home /  Contact us"
                       :bannerImg="require('~/assets/img/submenu/ser-bg-01.png')"></BannerContent>
        <div class="contact-container">
            <div class="container d-flex">
                <div class="contact-left">
                    <RfqForm/>
                </div>
                <div class="contact-right">
                    <p class="contact-title">WHERE</p>
                    <div class="contact-map"  v-lazy:background-image='mapImage'></div>
                    <p class="company-info">COMPANY INFO</p>
                    <div class="address">| <span @click="switchMap('xian')" :class="isXian ? 'text-active' : 'address-text'">Headquarter</span> | <span @click="switchMap('beijing')" :class="!isXian ? 'text-active' : 'address-text'">Beijing Representative</span> |</div>
                    <p v-html="mapDesc" style="color: #333333"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import BannerContent from "@/components/BannerContent";
    import RfqForm from "@/components/RfqForm";
    import syncApiService from '@/services/sync-api-service.js';

    export default {
        name: "index",
        components: {BannerContent, RfqForm},
        head() {
            return {
                title: 'Contact-APT Power Technology'
            };
        },
        data() {
            return {
                isXian: true,
                mapImage: require('~/assets/img/footer/address-map.png'),
                mapDesc: 'A Tower TF International Plaza,18# Fenghui South Road Hi-Tech Zone,Xi’an710075,<br/>CHINA',
                info: {}
            }
        },
        methods: {
            switchMap(type) {
                this.isXian = type === 'xian';
                this.mapImage = this.isXian ? this.info.contact_map_2 : this.info.contact_map_1;
                this.mapDesc = this.isXian ? 'A Tower TF International Plaza,18# Fenghui South Road Hi-Tech Zone,Xi’an710075,<br/>CHINA' : 'Beijing,CHINA';
            }
        },
        created() {
            syncApiService.get('api/website/getImage').then(data => {
                this.info = data.contact_us_image[0];
                this.mapImage = this.info.contact_map_2;
            }).catch(err => {
                return {};
            });
        },
    }
</script>

<style scoped lang="stylus">
    .contact-left, .contact-right
        width 50%

    .contact-right
        padding-left 32px

    .contact-container
        background-color #e7e9ea
        padding 69px 0 72px

    .contact-title
        position relative
        font-size 24px
        color #333333
        font-family 'Raleway-ExtraBold'

    .contact-title:before
        content ""
        position absolute
        width 30px
        height 3px
        background-color #008fd7
        left 0
        top -12px

    .contact-map
        width 100%
        padding-bottom 78%
        background url("~assets/img/footer/address-map.png") no-repeat
        background-size 100% 100%
    .company-info
        padding 31px 0 32px
        font-size 15px
        color #333333
        font-weight bold
    .address
        margin-bottom 29px
        color #bcc0c4

    .address-text
        color #bcc0c4
        cursor pointer
    .text-active
        cursor pointer
        color #333333

    @media (max-width: 768px)
        .contact-left
            width 100%
        .contact-right
            display none
        .contact-container
            background-color #ffffff

    @media (min-width: 769px) and (max-width: 1199px)
        .contact-left /deep/ .rfq-content, .contact-left /deep/ .select-item
            width 100%
        .contact-left /deep/ .select-box
            width 45%

</style>
