const path = require('path')
module.exports = {
  publicPath: './',
  outputDir: `dist/${process.env.VUE_APP_ENV}`,
  productionSourceMap: process.env.VUE_APP_ENV !== 'prod',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://t.weather.sojson.com',
        changeOrigin: true,
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/style/variable.less')
      ]
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  }
}
