const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development', // 开发模式
  devServer: {
    open: true, // 编译完自动打开浏览器
    port: 8080,
  },
  module: {
    rules: [
      // ...
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', {}]],
              },
            },
          },
          'less-loader',
        ],
        // 排除 node_modules 目录
        exclude: /node_modules/,
      },
    ],
  },
});
