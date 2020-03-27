module.exports = {
    /*
     ** Global CSS
     */
    css: [
        { src: 'element-ui/lib/theme-chalk/index.css' } // 1.在 css 中配置 element-ui 的 css 位置
    ],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        { src: '~plugins/element-ui', ssr: false } // 2.在 plugins 中配置刚刚创建好的 plugin
    ],
    /*
     ** Build configuration
     */
    build: {
        vendor: ['element-ui'] // 3.此处配置 build 时带着element-ui
    }
};
