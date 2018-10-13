module.exports = {
  // baseUrl: process.env.NODE_ENV === 'production'
  //   ? '/hr-ui'
  //   : '/',

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
        // target: 'localhost:8080',
        changeOrigin: true,
      },
    },
  },

  transpileDependencies: [
    /[\\/]node_modules[\\/]quasar-framework[\\/]/,
  ],
};
