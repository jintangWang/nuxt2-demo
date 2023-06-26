import Vue from 'vue'
Vue.mixin({
  methods: {
    handlerUrl(str) {
      if (!str) return '';
      return str.trim().split('/').join('_').split(' ').join('-');
    },
  }
});
