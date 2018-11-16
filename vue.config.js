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
        target: 'http://human-review-backend-labs-testdemo.apps.domino.rht-labs.com/',
        //target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/api/v1/humanreview/pending': {
        target: 'http://human-review-backend-labs-testdemo.apps.domino.rht-labs.com/',
        //target: 'http://localhost:8080',
        changeOrigin: true,
      },

    },
  },

  transpileDependencies: [
    /[\\\/]node_modules[\\\/]quasar-framework[\\\/]/,
  ],
};
