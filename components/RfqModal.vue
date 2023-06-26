<template>
    <div class="rfq-container" v-if="showModal">
        <font-awesome-icon icon="times" class="icon-close" @click="close"/>
        <RfqForm/>
    </div>
</template>

<script>
    import RfqForm from "@/components/RfqForm";

    export default {
        name: "RfqModal",
        components: {RfqForm},
        data() {
            return {
                showModal: false,
            }
        },
        methods: {
            open() {
                this.showModal = true;
            },
            closeModal() {
                this.showModal = false;
            },
            close() {
                this.showModal = false;
                this.$emit('header');
            },
        }
    }
</script>

<style scoped lang="stylus">
    .rfq-container
        z-index 3
        position absolute
        background-color #ffffff
        top 81px
        width: 100%
        padding 84px 0 74px

    .icon-close
        position: absolute;
        right: 77px;
        top: 0;
        color #008fd7
        font-size 29px
        cursor pointer


    @media (max-width: 768px)
        .icon-close
            right 1rem

        .rfq-container
            padding: 59px 1rem 60px

</style>
