module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5566',
        changeOrigin: true,
      },
    },
  },
};
