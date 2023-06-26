<template>
  <div class="">
    <client-only>
      <notifications group="tip" position="top center" style="top:60px"/>
    </client-only>
    <Header></Header>
    <nuxt />
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '@/components/Header';
  import Footer from '@/components/Footer';
  export default {
    components: {
      Header, Footer
    }
  };
</script>

<style lang="stylus">
</style>
