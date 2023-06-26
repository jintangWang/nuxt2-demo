<template>
    <div class="rfq-content">
        <div v-if="selectContent">
            <p class="rfq-title">YOUR INQUIRY</p>
            <div class="d-flex justify-content-between flex-wrap">
                <div class="select-box" @click="selectItem('product')">
                    <span>{{categoryText}}</span>
                    <font-awesome-icon icon="angle-right" :class="['normal', productArrow]"/>
                    <div :class="['select-item', productItem]">
                        <div class="item-text" v-for="(item, index) in generalCategory" :key="'product' + index"
                             @click="chooseItem('category', item)">{{item}}
                        </div>
                    </div>
                </div>
                <div class="select-box" @click="selectItem('solution')">
                    <span class="long-text">{{subtypeText}}</span>
                    <font-awesome-icon icon="angle-right" :class="['normal', solutionArrow]"/>
                    <div :class="['select-item', solutionItem]">
                        <div class="item-text" v-for="(menu, index) in subtype" :key="'solution' + index"
                             @click="chooseItem('subtype', menu.category_name, menu.id)">{{menu.category_name}}
                        </div>
<!--                        <div class="item-text">Others&nbsp;<input type="text" class="input-solution"-->
<!--                                                                  @click.stop="stopSelect" @input="inputFun"-->
<!--                                                                  v-model.trim="others"/></div>-->
                    </div>
                </div>
            </div>
        </div>
        <p class="rfq-title">About Your Company</p>
        <div class="d-flex justify-content-between flex-wrap">
            <div class="input-box">
                <p><span class="star-text">*</span>Name:</p>
                <input type="text" class="input-rfq" v-model="form.name">
            </div>
            <div class="input-box">
                <p>Website:</p>
                <input type="text" class="input-rfq" v-model="form.website">
            </div>
        </div>
        <div class="input-box">
            <p><span class="star-text">*</span>Address:</p>
            <input type="text" class="input-rfq" v-model="form.address">
        </div>
        <p class="rfq-title">About you</p>
        <div class="d-flex justify-content-between flex-wrap">
            <div class="input-box">
                <p><span class="star-text">*</span> First Name:</p>
                <input type="text" class="input-rfq" v-model="form.first_name">
            </div>
            <div class="input-box">
                <p><span class="star-text">* </span>Last Name:</p>
                <input type="text" class="input-rfq" v-model="form.last_name">
            </div>
        </div>

        <input type="radio" value="male" name="gender" v-model="form.type"/><label class="radio-text">Male</label>
        <input type="radio" value="female" name="gender" v-model="form.type"/><label class="radio-text">Female</label>


        <div class="input-box">
            <p><span class="star-text">*</span>Position:</p>
            <input type="text" class="input-rfq" v-model="form.position">
        </div>
        <div class="d-flex justify-content-between flex-wrap">
            <div class="input-box">
                <p><span class="star-text">*</span>Email:</p>
                <input type="text" class="input-rfq" v-model="form.email">
            </div>
            <div class="input-box">
                <p>Sub email:</p>
                <input type="text" class="input-rfq"  v-model="form.sub_email">
            </div>
        </div>
        <div class="d-flex justify-content-between flex-wrap">
            <div class="input-box">
                <p><span class="star-text">*</span>TEL:</p>
                <input type="text" class="input-rfq" v-model="form.tel">
            </div>
            <div class="input-box">
                <p>Mobile:</p>
                <input type="text" class="input-rfq" v-model="form.mobile">
            </div>
        </div>
        <div class="input-box">
            <p><span class="star-text">*</span>Content:</p>
            <textarea class="area" v-model="form.content"/>
        </div>

        <div class="input-box">
            <p><span class="star-text">*</span>Verification Code:</p>
            <div class="code-box">
                <input type="text" class="input-rfq" v-model="code" style="margin-right: 30px">
                <VerificationCode ref="code" @get-code="getCode"/>
            </div>
        </div>

        <div class="d-flex justify-content-between flex-wrap">
            <div class="accessory-box">
                <button class="download-btn" v-if="isUploading" disabled>uploading...</button>
                <button class="download-btn" v-else>Accessory<input  type="file" class="upload-file" @change="handleFile" accept="application/pdf"/></button>
                <div>{{fileName}}</div>
            </div>
            <button class="download-btn send" disabled v-if="isSending">SENDING...</button>
            <button class="download-btn send" @click="submit" v-else>SEND</button>
        </div>
    </div>
</template>

<script>
    import syncApiService from '@/services/sync-api-service.js';
    import VerificationCode from "@/components/VerificationCode";

    export default {
        name: "RfqForm",
        components: {
            VerificationCode,
        },
        props: {
            selectContent: {type: Boolean, default: true}, //是否显示二级联动
            category: {type: Object}
        },
        data() {
            return {
                validCode: '',
                code: '',
                isUploading: false,
                isSending: false,
                showModal: false,
                productItem: '',
                solutionItem: '',
                productArrow: '',
                solutionArrow: '',
                categoryText: 'Product',
                subtypeText: this.$store.state.productMenus[0].category_name,
                others: '',
                generalCategory: ['Product', 'Solution'],
                subtype: this.$store.state.productMenus,
                fileName: '',
                form: {
                    name: '',
                    website: '',
                    address: '',
                    first_name: '',
                    last_name: '',
                    type: 'male',
                    position: '',
                    email: '',
                    sub_email: '',
                    tel: '',
                    mobile: '',
                    content: '',
                    category_type: 'products',
                    category_id: this.$store.state.productMenus[0].id || 7,
                    upload_file: ''
                }
            }
        },
        methods: {
            getCode(code) {
                this.validCode = code;
            },
            verification() {
                if (this.form.name.trim() === '') {
                    this.$notify({
                        group: 'tip',
                        type: 'error',
                        title: 'Name cannot be null',
                    });
                    return false;
                } else if (this.form.address.trim() === '') {
                    this.$notify({
                        group: 'tip',
                        type: 'error',
                        title: 'Address  cannot be null',
                    });
                    return false;
                } else if (this.form.first_name.trim() === '') {
                    this.$notify({
                        group: 'tip',
                        type: 'error',
                        title: 'First Name cannot be null',
                    });
                    return false;
                } else if (this.form.last_name.trim() === '') {
                    this.$notify({
                        group: 'tip',
                        type: 'error',
                        title: 'Last Name cannot be null',
                    });
                    return false;
                } else if (this.form.position.trim() === '') {
                    this.$notify({
                        group: 'tip',
                        type: 'error',
                        title: 'Position cannot be null',
                    });
                    return false;
                } else if (this.form.email.trim() === '') {
                    this.$notify({
                        group: 'tip',
                        type: 'error',
                        title: 'Email cannot be null',
                    });
                    return false;
                } else if (this.form.tel.trim() === '') {
                    this.$notify({
                        group: 'tip',
                        type: 'error',
                        title: 'TEL cannot be null',
                    });
                    return false;
                } else if (this.form.content.trim() === '') {
                    this.$notify({
                        group: 'tip',
                        type: 'error',
                        title: 'Content cannot be null',
                    });
                    return false;
                } else {
                    return true
                }
            },
            resetCode() {
                this.$refs.code.refresh();
                this.code = '';
            },
            resetForm() {
                for (let i in this.form) {
                    if (i === 'type') {
                        this.form[i] = 'male';
                    } else if (i === 'category_type') {
                        this.form[i] = 'products';
                    } else if (i === 'category_id') {
                        this.form[i] = this.$store.state.productMenus[0].id || 7;
                    } else {
                        this.form[i] = '';
                    }
                }
                this.code = '';
                this.fileName = '';
                this.categoryText = 'Product';
                this.subtypeText = this.$store.state.productMenus[0].category_name;
                this.chooseItem('category', 'Product');
            },


            submit() {
                //是否传递了属性category
                if (this.category) {
                    this.form.category_type = this.category.category_type;
                    this.form.category_id = this.category.category_id;
                } else {
                    this.form.category_type = this.categoryText === 'Product' ? 'products' : 'solution';
                }
                if (this.verification() && !this.isUploading) {


                    if (!this.code) {
                        this.$notify({
                            group: 'tip',
                            type: 'error',
                            title: 'Verification Code cannot be null',
                        });
                        return;
                    }
                    if (this.code.toLowerCase() !== this.validCode.toLowerCase()) {
                        this.$notify({
                            group: 'tip',
                            type: 'error',
                            title: 'Verification Code Error',
                        });
                        this.resetCode();
                        return;
                    }

                    this.isSending = true;
                    syncApiService.post('api/Inquiry/addInquiry', this.form).then(res => {
                        if (res) {
                            this.$notify({
                                group: 'tip',
                                type: 'success',
                                title: 'notification',
                                text: 'Submitted successfully!'
                            });
                            this.isSending = false;
                            this.resetForm();
                            this.$emit('refresh');
                        }
                    }).catch(err => {
                        this.isSending = false;
                        this.resetCode();
                        return {};
                    });
                }
            },
            handleFile(e) {
                let file = e.target.files[0];
                if (typeof file === 'undefined') {
                    return;
                }
                let formdata = new FormData();
                formdata.append('file', file);
                this.isUploading = true;
                syncApiService.post('api/Inquiry/upload', formdata).then(res => {
                    if (res) {
                        this.$notify({
                            group: 'tip',
                            type: 'success',
                            title: 'notification',
                            text: 'File uploaded successfully!'
                        });
                        this.form.upload_file = res.file_path;
                        this.fileName = file.name;
                        this.isUploading = false;
                    }
                }).catch(err => {
                    this.isUploading = false;
                });
            },
            stopSelect(){},
            inputFun(){
                this.subtypeText = this.others;
            },
            selectItem(type) {
                if (type === 'product') {
                    if (this.productItem === '') {
                        this.productItem = 'expand';
                        this.productArrow = 'icon-arrow';
                        return;
                    }
                    this.productItem = '';
                    this.productArrow = '';
                } else {
                    if (this.solutionItem === '') {
                        this.solutionItem = 'expand';
                        this.solutionArrow = 'icon-arrow';
                        return;
                    }
                    this.solutionItem = '';
                    this.solutionArrow = '';
                }
            },
            chooseItem(type, val, id) {
                if (type === 'category') {
                    this.categoryText = val;
                    this.subtype = val === 'Product' ? this.$store.state.productMenus : this.$store.state.solutionMenus;
                    this.subtypeText = val === 'Product' ? this.$store.state.productMenus[0].category_name : this.$store.state.solutionMenus[0].category_name;
                } else {
                    this.subtypeText = val;
                    this.form.category_id = id;
                }
            }
        },
    }
</script>

<style scoped lang="stylus">
    .code-box
        display flex
        margin-bottom 30px
    .long-text
        overflow hidden
        display block
        white-space nowrap
        text-overflow ellipsis

    .rfq-container
        z-index 3
        position absolute
        background-color #ffffff
        top 81px
        width: 100%
        padding 84px 0 74px

    .rfq-content
        margin 0 auto
        width 558px

    .rfq-title
        position relative
        padding-bottom 29px
        font-size 24px
        color #333333
        font-family 'Raleway-ExtraBold'
        text-transform uppercase

    .rfq-title:not(:first-child)
        margin-top 54px

    .rfq-title:before
        content ""
        position absolute
        width 30px
        height 3px
        background-color #008fd7
        left 0
        top -12px

    .download-btn
        position relative
        outline none
        flex-shrink 0
        width: 144px
        height: 49px
        border-radius: 24.6px
        background-color: #e60012
        font-size 13px
        color #ffffff
        font-family 'Raleway-Bold'
        text-align center
        line-height 49px
        margin-right 45px
        text-transform uppercase

        &.send
            background-color: #006db7

        &:last-child
            margin-right 0

    .upload-file
        position absolute
        left 0
        top 0
        width: 144px
        height: 49px
        cursor pointer
        opacity 0

    .download-desc
        line-height 1.4
        color #777777

    .download-box
        padding-bottom 19px

    .radio-text
        margin-top 19px
        margin-left 6px
        margin-right 27px
        color #666666

    .radio-text:nth-of-type(2n)
        margin-right 0

    .input-rfq
        width: 266px;
        height: 32px;
        border-radius: 1.6px;
        border: 1px solid #dddddd;
        background-color: #ffffff;

    .input-box
        margin-top 18px

    .select-box
        position relative
        display flex
        justify-content space-between
        align-items center
        padding 11px 9px
        width: 266px;
        height: 32px;
        border-radius: 1.6px;
        border: 1px solid #dddddd;
        background-color: #ffffff;
        cursor pointer

    .select-item
        z-index 2
        position absolute
        display none
        width 266px
        background-color #f9f9f9
        padding 0 22px
        left 0
        top 32px

        &.expand
            display block

    .icon-arrow
        transform rotate(90deg)

    .normal
        transition transform .1s ease-in

    .select-box span
        font-family 'Raleway-Bold'
        color #444444

    .area
        margin-bottom 22px
        width 100%
        height 77px
        border-radius: 1.6px;
        border: 1px solid #dddddd;

    .item-text
        font-family 'Raleway-SemiBold'
        padding 13px 0
        color #777777
        border-bottom 1px solid #eeeeee

    .item-text:last-child
        border-bottom 0

    .input-solution
        width: 171px;
        height: 32px;
        border-radius: 1px;
        border: 1px solid #dddddd;
        background-color: #ffffff;

    .icon-close
        position: absolute;
        right: 77px;
        top: 0;
        color #008fd7
        font-size 29px
        cursor pointer


    @media (max-width: 768px)
        .accessory-box
            width 100%

        .icon-close
            right 1rem

        .rfq-container
            padding: 59px 1rem 60px

        .select-box, .input-rfq
            width 100%
            height 36.5px

        .select-box:first-child
            margin-bottom 43px

        .rfq-content
            width auto

        .input-box, .download-btn, .select-item, .upload-file
            width 100%

        .download-btn
            border-radius: 12.3px

            &.send
                margin-top 40px

</style>
