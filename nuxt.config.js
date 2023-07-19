export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  server: {
	port: 3010,
	host: '0.0.0.0'
	// host: 'localhost'
	// https: {
	//   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
	//   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
	// }
},
  head: {
    title: 'QR bank generator',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
	  { hid: 'description', name: 'description', content: 'Tạo QR code banking miễn phí' },
			{ hid: 'keywords', name: 'keywords', content: 'Qr, qrcode, qr chuyển khoản' },
			{ hid: 'og:title', property: 'og:title', content: 'QR Bank generator' },
			{ hid: 'og:description', property: 'og:description', content: 'Tạo QR chuyển khoản nhanh chóng' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
	'./static/global.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
	'@nuxtjs/axios',
  ],
  axios: {
	baseURL: 'https://api.ltesletsflyhigh.com',
	},
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
