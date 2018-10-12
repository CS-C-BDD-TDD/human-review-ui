module.exports = {
  pluginOptions: {
    quasar: {
      theme: 'mat',
      importAll: true,
    },
  },

  devServer: {
    proxy: {
      '/api/v1/user': {
        target: 'http://human-review-backend-labs-test.apps.domino.rht-labs.com',
        pathRewrite: { '^/api/v1/user': '' },
        changeOrigin: false,
        prependPath: false,
      },
    },
  },

  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/,
  ],
};
