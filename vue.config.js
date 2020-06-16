module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/schedule/' : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "@/styles/_app.scss";',
      },
    },
  },
};
