module.exports = {
  publicPath: './',
  outputDir: `dist/${process.env.VUE_APP_ENV}`,
  productionSourceMap: process.env.VUE_APP_ENV === 'prod' ? false : true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://t.weather.sojson.com',
        changeOrigin: true,
      }
    }
  }
}