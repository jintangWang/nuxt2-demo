const routes = require('./utils/getRoutes.js');
const excludeRoutes = [
  '/About-APT', '/contact', '/faq', '/infocenter', '/legal-notice', '/news',
  '/privacy-policy', '/products', '/RFQ', '/search-results', '/solutions',
  '/services', '/About-APT/customers', '/'
];

const ployfillFeatures = [
  "es2015",
  "Object.entries",
  "Element.prototype.classList",
  "IntersectionObserver"
].join("%2C");

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'APT',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1,user-scalable=no' },
      // 启用360浏览器的极速模式(webkit)
      { name: 'renderer', content: 'webkit' },
      // 表示页面是自适应的，同时适合在移动设备和PC上进行浏览
      { name: 'applicable-device', content: 'pc, mobile' },
      // 避免IE使用兼容模式
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
      // 下面两个告诉搜索引擎不要把网页转码
      { 'http-equiv': 'Cache-Control', content: 'no-transform' },
      { 'http-equiv': 'Cache-Control', content: 'no-siteapp' },
      { hid: 'keywords', name: 'keywords', content: '' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
    script: [
      { src: `//polyfill.io/v3/polyfill.min.js?features=${ployfillFeatures}`, body: true, async: true},
      { src: `https://v1.cnzz.com/z_stat.php?id=1278637617&web_id=1278637617`, async: true}
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  // loading: '~/components/loading.vue',
  loading: {
    color: '#008fd7'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/custom-bootstrap.scss',
    '@fortawesome/fontawesome-svg-core/styles.css',
    'swiper/dist/css/swiper.css',
    '~/assets/font.css',
    '~/assets/css/style.css',
    '~/assets/common.styl',
  ],

  router: {
    prefetchLinks: false,
    middleware: []
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/fontawesome.js',
    { src: '~/plugins/swiper.js', ssr: false },
    {src: '~plugins/notification', ssr: false},
    '~/plugins/util.js',
    { src: '~/plugins/vue-lazyload', ssr: false },
    { src: '~plugins/ga.js', mode: 'client' }
  ],
  /*
  ** Nuxt.js dev-modules
  */
  // buildModules: [
  //   '@nuxtjs/google-analytics'
  // ],
  // googleAnalytics: {
  //   id: 'UA-36535348-1',
  //   debug: {
  //     enabled: true,
  //     sendHitTask: true
  //   }
  // },
  /*
  ** Nuxt.js modules
  */
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/sitemap',
    // 'nuxt-purgecss'
    // Doc: https://github.com/nuxt-community/modules/tree/master/packages/bulma
  ],
  bootstrapVue: {
    bootstrapCSS: false, // Or `css: false`
    bootstrapVueCSS: false, // Or `bvCSS: false`
    componentPlugins: [
      'PaginationPlugin',
      'CollapsePlugin',
      'ModalPlugin'
    ],
    directivePlugins: []
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://www.xaapt.com',
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    generate: false,
    sitemaps: [
      {
        path: '/sitemap-main.xml',
        routes: routes.getMainRoutes,
        exclude: excludeRoutes,
      },
      {
        path: '/sitemap-news.xml',
        routes: routes.getNewsRoutes,
        exclude: excludeRoutes
      },
      {
        path: '/sitemap-about-apt.xml',
        routes: routes.getAboutAptRoutes,
        exclude: excludeRoutes
      },
      {
        path: '/sitemap-solutions.xml',
        routes: routes.getSolutionRoutes,
        exclude: excludeRoutes
      },
      {
        path: '/sitemap-products.xml',
        routes: routes.getProductRoutes,
        exclude: excludeRoutes
      },
      {
        path: '/sitemap-services.xml',
        routes: routes.getServiceRoutes,
        exclude: excludeRoutes
      },
      {
        path: '/sitemap-infocenter.xml',
        routes: routes.getInfocenterRoutes,
        exclude: excludeRoutes
      },
      {
        path: '/sitemap-faq.xml',
        routes: routes.getFaqRoutes,
        exclude: excludeRoutes
      }
    ]
  },
  // purgeCSS: {
  //   // your settings here
  //   mode: 'PostCSS',
  //   styleExtensions: ['.styl', '.scss'],
  //   whitelistPatterns: [/leaflet/, /marker/]
  // },
  /*
  ** Build configuration
  */
  build: {
    // extractCSS: true,
    postcss: {
      plugins: {
      },
      preset: {
        features: {
          customProperties: false
        }
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    },
    cache: true,
    // parallel: true,
    // hardSource: true,
    filenames: {
      app: ({ isDev }) => isDev ? '[name].js' : '[name]-[contenthash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[name]-[contenthash].js',
      img: ({ isDev }) => isDev ? '[path][name].[ext]' : 'img/[name]-[contenthash:7].[ext]',
      css: ({ isDev }) => isDev ? '[name].css' : '[name]-[contenthash].css',
      font: ({ isDev }) => isDev ? '[path][name].[ext]' : 'fonts/[name]-[contenthash:7].[ext]',
      video: ({ isDev }) => isDev ? '[path][name].[ext]' : 'videos/[name]-[contenthash:7].[ext]'
    }
  },
  render: {
    resourceHints: false
  },
  env: {
    baseUrl: 'https://www.xaapt.com'
  },
  serverMiddleware: [
    '~/servermiddleware/301.js'
  ]
}
