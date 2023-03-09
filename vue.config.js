module.exports = {
  devServer: {
    // 设置代理
    proxy: {
      '/api': {
        target: 'http://1.12.243.205:3000/',
        // target: 'http://127.0.0.1:3000/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
};
