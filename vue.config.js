module.exports = {
  devServer: {
    disableHostCheck: true,
    https: true
  },
  chainWebpack: config => config.optimization.minimize(false)
}
