<template>
  <div class="verification-code-wrapper">
    <canvas ref="canvas" class="verification-code" width="70px" height="27px"></canvas>
    <font-awesome-icon class="refresh-icon" icon="sync" @click="refresh"/>
  </div>
</template>

<script>
  export default {
    name: "Verification",
    data() {
      return {
        ctx: null,
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let canvas = this.$refs.canvas; //获取画布
        let ctx = canvas.getContext('2d');

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 70, 27);
        ctx.font = "20px arial";

        // 创建渐变
        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        // 用渐变填色
        ctx.strokeStyle = gradient;

        this.ctx = ctx;
        this.createCode();
      },
      refresh() {
        this.ctx.clearRect(0, 0, 70, 27);
        this.createCode();
      },
      createCode() {
        let code = "";
        let codeLength = 4;//验证码的长度，可变
        let selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');//所有候选组成验证码的字符
        for (let i = 0; i < codeLength; i++) {
          let charIndex = Math.floor(Math.random() * 36);
          code += selectChar[charIndex];
        }
        this.ctx.strokeText(code, 5, 20);//画布上添加验证码
        this.$emit('get-code', code);
      }
    }
  }
</script>

<style scoped lang="stylus">
  .verification-code-wrapper
    display flex
    align-items center
    .verification-code
      border:1px solid #d3d3d3
      margin-right 12px
    .refresh-icon
      cursor pointer
      &:hover
        color #008fd7
</style>
