<template>
    <div>
        <BannerContent title="Search Results"/>
        <div class="search-container">
            <div class="container d-flex">
                <div class="search-left">
                    <div class="input-group">
                        <span class="input-label">SEARCH</span>
                        <b-dropdown id="dropdown-1" :text="activeType" toggle-class="drop-box">
                            <b-dropdown-item v-for="item in searchType" :key="item" @click="chooseType(item)">{{item}}</b-dropdown-item>
                        </b-dropdown>
                        <input type="text" class="form-control input-send" placeholder=""
                               aria-label="Recipient's username" aria-describedby="button-addon2" v-model="keywords" @keyup.enter="search">
                        <div class="input-group-append">
                            <button class="btn btn-primary send-btn" type="button" id="button-addon2" @click="search">
                                <font-awesome-icon icon="search"/>
                            </button>
                        </div>
                        <div>
                        </div>
                    </div>

                    <div class="radio-box d-flex justify-content-between">
                        <label class="result-text" v-if="isLoading">Searching in progress.</label>
                        <label class="result-text" v-else>{{searchResult.length+ ' of '+ rows+ ' results'}}</label>
                        <div class="radio-content">
                            <div class="form-check form-check-inline" v-for="(item,index) in searchItem" :key="index">
                                <input class="form-check-input" type="radio" :name="item.name"
                                       :value="item.value"  v-model="searchVal">
                                <label class="form-check-label">{{item.label}}</label>
                            </div>
                        </div>
                    </div>

                    <div class="search-item d-flex" v-for="(item, index) in searchResult" :key="index">
                        <img class="search-img" :alt="item.products_title" v-lazy="item.thumbnail" v-if="item.thumbnail && item.products_title"/>
                        <img class="search-img" :alt="item.title" v-lazy="item.thumbnail" v-if="item.thumbnail && item.title"/>
                        <img class="search-img" :alt="item.new_title" v-lazy="item.thumbnail" v-if="item.thumbnail && item.new_title"/>
                        <div class="search-result" @click="toDetails(item.link)" v-if="item.products_title">
                            <p class="search-title">{{item.products_title}} </p>
                            <p class="search-desc">{{item.introduction}}</p>
                            <nuxt-link :to="item.link">{{domain+item.link}}</nuxt-link>
                        </div>
                        <div class="search-result" @click="toDetails(item.link)" v-if="item.title">
                            <p class="search-title">{{item.title}} </p>
                            <p class="search-desc">{{item.introduction}}</p>
                            <nuxt-link :to="item.link">{{domain+item.link}}</nuxt-link>
                        </div>
                        <div class="search-result" @click="toDetails(item.link)" v-if="item.new_title">
                            <p class="search-title">{{item.new_title}} </p>
                            <p class="search-desc">{{item.introduction}}</p>
                            <nuxt-link :to="item.link">{{domain+item.link}}</nuxt-link>
                        </div>
                    </div>

                    <div class="d-flex pagination-container justify-content-end mobile-pg">
                        <b-pagination
                                v-model="page"
                                :total-rows="rows"
                                :per-page="6"
                                @input="search"
                        />
                    </div>
                </div>
                <NewsRight :show-search-input="false"/>
            </div>
        </div>
    </div>
</template>

<script>
    import BannerContent from "@/components/BannerContent";
    import NewsRight from "@/components/NewsRight";
    import { BDropdown,BDropdownItem, BPagination } from 'bootstrap-vue';
    import syncApiService from '@/services/sync-api-service.js';
    export default {
        name: "index",
        components: {BannerContent, NewsRight, BDropdown, BDropdownItem, BPagination},
        head() {
            return {
                title: 'Search Results-APT Power Technology'
            };
        },
        data() {
            return {
                page: 1,
                keywords: '',
                searchType: ['products', 'solution', 'news'],
                activeType: 'products',
                searchItem: [
                    {label: 'ALL', value: '', name: 'radioItem'},
                    {label: 'Customized', value: 1, name: 'radioItem'},
                    {label: 'Trailered', value: 2, name: 'radioItem'},
                    {label: 'Customized&Trailered', value: 3, name: 'radioItem'}
                ],
                searchVal: '',
                rows: 0,
                searchResult: [],
                domain: '',
                isLoading: true
            }
        },
        watch:{
            $route(){
               this.init();
            }
        },
        created() {
            if (process.client) {
                this.domain = window.location.origin;
            }
            this.init();
        },
        methods: {
            toDetails(link) {
                this.$router.push(link);
            },
            init() {
                if(this.$route.query.keywords) {
                    this.keywords = this.$route.query.keywords;
                }
                this.search();
            },
            chooseType(item) {
                this.activeType = item;
                this.searchVal = '';
                if (item === 'products') {
                    this.searchItem = [
                        {label: 'ALL', value: '', name: 'radioItem'},
                        {label: 'Customized', value: 1, name: 'radioItem'},
                        {label: 'Trailered', value: 2, name: 'radioItem'},
                        {label: 'Customized&Trailered', value: 3, name: 'radioItem'}
                    ];
                } else if (item === 'solution') {
                    this.searchItem =[];
                } else {
                    this.searchItem = [{label: 'All', value: '', name: 'radioItem'},{label: 'news', value: 1, name: 'radioItem'}, {label: 'event', value: 2, name: 'radioItem'}];
                }
            },
            search() {
                let params = {
                    category: this.activeType,
                    type: this.searchVal,
                    search: this.keywords,
                    page: this.page,
                };
                syncApiService.post('api/products/search', params).then(res => {
                    this.searchResult = res.list;
                    this.searchResult.forEach(item => {
                        switch (this.activeType) {
                            case "products":
                                item.link= '/Products/'+this.handlerUrl(item.category_id_1_name)+'/'+this.handlerUrl(item.products_title)+'?id='+ item.id;
                                break;
                            case "solution":
                                item.link= '/Solutions/'+this.handlerUrl(item.title)+'?id='+ item.id;
                                break;
                            case "news":
                                item.link= '/news/'+this.handlerUrl(item.new_title)+'?id='+ item.id;
                                break;
                        }
                    });
                    this.rows = res.count;
                    this.isLoading = false;
                }).catch(err => {
                    this.isLoading = false;
                    return {};
                });
            }
        }
    }
</script>

<style scoped lang="stylus">
    .search-container
        padding 36px 0 104px
        background-color #e7e9ea
    .search-left
        width 70%
    .input-label
        line-height 38px
        padding-right 20px
        font-weight bold
        color #333333
        font-size 15px
    .radio-box
        padding 40px 0 55px
    .result-text, .search-title
        font-size 18px
        color #333333

    .search-title
        padding-bottom 10px

    .search-item
        border-top 1px solid #eeeeee
        padding 20px 0 34px
        &.last
            border-bottom 1px solid #eeeeee


    .search-img
        margin-right 17px
        flex-shrink 0
        width 98px
        height 97px
        background-color #ffffff

    .search-desc
        overflow hidden
        padding-bottom 0
        color #777777
        -webkit-line-clamp 2
        text-overflow ellipsis
        display -webkit-box
        -webkit-box-orient vertical
        word-wrap break-word

    a
        color #1b5cc9 !important
        overflow hidden
        display block
        white-space nowrap
        text-overflow ellipsis
    .form-check-label
        color #666666
    .pagination-container
        margin-top 19px

    .search-result
        overflow hidden
        cursor pointer

    @media (max-width: 767px)
        .search-left
            width 100%
        .input-label
            display none
        .result-text, .radio-content
            width 100%
        .result-text
            padding-top 48px
        .radio-box
            padding 40px 0 10px
            flex-wrap wrap-reverse
        .search-title
            padding-bottom 5px
            font-size 16px
        .search-desc
            -webkit-line-clamp 1
        .mobile-pg
            justify-content center!important
    @media (min-width: 768px) and (max-width: 1024px)
        .search-left
            width 70%
        .input-label
            display none
        .result-text, .radio-content
            width 100%
        .result-text
            padding-top 48px
        .radio-box
            padding 40px 0 10px
            flex-wrap wrap-reverse
        .search-title
            padding-bottom 5px
            font-size 16px
        .search-desc
            -webkit-line-clamp 2
        .mobile-pg
            justify-content center!important

</style>
