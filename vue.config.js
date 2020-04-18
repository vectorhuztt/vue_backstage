module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                assets: '@/assets',
                components: '@/components',
                views: '@/views',
                network: '@/network',
                plugins: '@/plugins',
                utils: '@/utils',
            },
        },
    },
    devServer: {
        host: 'localhost',
        port: 8081,
        https: false,
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:8000/api/',
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '', //重写接口,后面可以使重写的新路径，一般不做更改
                },
            },
        },
    },
};
