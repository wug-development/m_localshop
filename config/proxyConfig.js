module.exports = {
    proxy: {
        '/apiw': {
            target: 'https://www.roseonly.com.cn/',
            changeOrigin: true,
            pathRewrite: {
                '^/apiw': ''
            }
        },
        '/apis': {
            target: 'http://www.lovzvzu.com/',
            changeOrigin: true,
            pathRewrite: {
                '^/apis': ''
            }
        }
    }
}
