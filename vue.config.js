const path = require('path')
module.exports = {
  publicPath: './',
  outputDir: `dist/${process.env.VUE_APP_ENV}`,
  productionSourceMap: process.env.VUE_APP_ENV !== 'prod',
  devServer: {
    proxy: {
      '*': {
        target: 'https://b2b.fusen.net.cn',
        changeOrigin: true
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
