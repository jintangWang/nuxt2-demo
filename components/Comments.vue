<template>
  <section class="comment-container">
    <section class="container comment-wrapper">
      <article class="detail-container">
        <h3 class="article-title left-top-line">comments</h3>
        <section class="comment-list">
          <section class="comment-item-wrap" v-for="(item,index) in comment" :key="'comment'+index">
            <section class="comment-item" >
              <figure class="avatar">
                <font-awesome-icon icon="user-tie"/>
              </figure>
              <div class="item-body">
                <h4 class="item-heading">{{item.name}}</h4>
                <span class="item-date">{{item.create_time}}</span>
                <div class="content">
                  <p class="item-text">{{item.content}}</p>
<!--                  <span class="reply">-->
<!--                      <font-awesome-icon class="reply-icon" icon="redo"/>-->
<!--                      REPLY-->
<!--                    </span>-->
                </div>
              </div>
            </section>
            <section class="comment-item reply-item" v-for="(innerItem,innerIndex) in item.replay" :key="'innerComment'+index+innerIndex">
              <figure class="avatar">
                <img src="/img/logo.png" alt="apt-logo"/>
              </figure>
              <div class="item-body">
                <h4 class="item-heading">{{innerItem.name}}</h4>
                <span class="item-date">{{innerItem.create_time}}</span>
                <div class="content">
                  <p class="item-text">{{innerItem.content}}</p>
<!--                  <span class="reply">-->
<!--                    <font-awesome-icon class="reply-icon" icon="redo"/>-->
<!--                    REPLY-->
<!--                  </span>-->
                </div>
              </div>
            </section>


          </section>
        </section>

        <h3 class="leave-comment article-title left-top-line">LEAVE A COMMENT</h3>

        <form action="javascript:;" class="comment-form">
          <div class="row">
            <div class="col-md-6">
              <label for="form-name"><i>*</i>Full Name</label>
              <div class="input-group">
                <input type="text" class="form-control"
                       placeholder="" id="form-name"
                       v-model="form.name"
                />
                <font-awesome-icon class="v-center" icon="pen"/>
              </div>
            </div>
            <div class="col-md-6">
              <label for="form-email"><i>*</i>Your Email Address</label>
              <div class="input-group">
                <input type="text" class="form-control"
                       placeholder="" id="form-email"
                       v-model="form.email"
                />
                <font-awesome-icon class="v-center" icon="globe-asia"/>
              </div>
            </div>
          </div>
          <div class="row textarea-wrapper">
            <div class="col-md-12">
              <label for="form-content"><i>*</i>Your Message</label>
              <textarea spellcheck="false" v-model="form.content"
                        id="form-content"></textarea>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <label for="form-code"><i>*</i>Verification Code</label>
              <input type="text" class="form-control"
                     v-model="code"
                     placeholder="" id="form-code"/>
            </div>
            <div class="col-md-6 code-wrapper">
              <VerificationCode ref="code" @get-code="getCode"/>
            </div>
          </div>
          <button class="request-btn send" @click.prevent="submit">SEND</button>
        </form>
      </article>
    </section>
  </section>
</template>

<script>
  import VerificationCode from "@/components/VerificationCode";
  import syncApiService from '@/services/sync-api-service.js';

  export default {
    name: "Comments",
    data() {
      return {
        validCode: '',
        form: {
          name: '',
          email: '',
          content: ''
        },
        code: ''
      };
    },
    props: {
      type: {
        type: String,
        default: 'products'
      },
      article_id: {
        type: String
      },
      comment: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    methods: {
      getCode(code) {
        this.validCode = code;
      },
      submit() {
        if (!this.code) {
          this.$notify({
            group: 'tip',
            type: 'error',
            title: 'Verification Code Cannot be null',
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
        const param = Object.assign({
          type: this.type,
          article_id: this.article_id
        }, this.form);
        syncApiService.post('api/comments/addComments', param).then(data => {
          this.$notify({
            group: 'tip',
            type: 'success',
            title: 'Comment Success!',
          });
          this.resetForm();
          this.$emit('refresh');
        }).catch(err => {
          this.resetCode();
        });
      },
      resetForm() {
        for (let i in this.form) {
          this.form[i] = '';
        }
        this.code = '';
      },
      resetCode() {
        this.$refs.code.refresh();
        this.code = '';
      }
    },
    components: {
      VerificationCode,
    }
  }
</script>

<style scoped lang="stylus">
  .comment-container
    background-color white
    .container
      display flex
      padding-top: 70px
      padding-bottom 40px
    .comment-wrapper
      padding-top 48px
      padding-bottom 50px
      justify-content flex-end
    .detail-container
      display flex
      flex-direction column
      width: 70%
      @media (max-width: 1024px)
        width: 100%
    .comment-item-wrap
      border-bottom: 1px solid #eeeeee
    .comment-item
      display flex
      align-items center
      padding: 10px 0
      &.reply-item
        padding-left 100px
      .avatar
        width: 70px
        height: 70px
        border: solid 5px #e7eff2
        background-color: #f6fcfe
        box-sizing border-box
        border-radius 100%
        margin-right: 30px
        display flex
        justify-content center
        align-items center
        font-size 36px
        flex-shrink: 0
      .item-body
        width 100%
      .item-heading
        font-family: Montserrat
        font-size: 14px
        line-height: 1.33
        color: #252525
        margin-bottom: 5px
      .item-date
        font-family: OpenSans
        font-size: 13px
        font-style: italic
        line-height: 1.54
        color: #006db7
        text-decoration: none
      .content
        display flex
        justify-content space-between
        align-items center
        flex-wrap wrap
      .item-text
        font-family: MyriadPro
        font-size: 13px
        line-height: 1.69
        color: #666666
        padding: 10px 0
      .reply, .like
        color: #333333
        &:hover
          color: #008fd7
      .reply-icon
        margin-right 14px
      .like-icon
        margin-left 11px
        margin-right 6px
    .leave-comment
      margin-top 50px
    .comment-form
      label
        font-family: OpenSans
        font-size: 13px
        line-height: 3
        color: #444444
        font-weight: normal
        margin-bottom: 0px
        display: inline-block
        max-width: 100%
        i
          color: #ce292d
          margin-right: 5px
          font-style: normal
      .input-group
        position relative
        input
          width 100%
          height: 32px
          border-radius: 2px
          border: solid 1px #dddddd
          padding-right 22px
        svg
          right: 8px
          z-index 3
      .textarea-wrapper
        margin-top: 30px
      textarea
        width: 100%
        height: 100px
        border-radius: 4.6px
        border: solid 1px #dddddd
        padding: 6px 12px
    .send
      width: 150px
      height: 46px
      border-radius: 24px
      background-color: #008fd7
      border: none
      float: right
      margin: 20px 0
      font-family: Raleway-Bold
      color: #ffffff
      font-size: 13px
      font-weight: bold
      line-height: 9px
    .code-wrapper
      display flex
      align-items flex-end
      padding-bottom 4.5px
    .article-title
      margin-top 80px
      margin-bottom 20px

  @media (max-width: 767px)
    .comment-container
      .send
        position static
        width 100%
        text-align center
        border-radius 12px
        font-size: 20px
        font-weight: bold
      .code-wrapper
        margin-top 12px
</style>
