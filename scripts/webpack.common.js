const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    // 多入口配置
    index: path.resolve(__dirname, '../src/index.tsx'),
    abc: path.resolve(__dirname, '../src/abc/index.tsx'),
  },
  output: {
    filename: 'assets/js/[name].js',
    chunkFilename: 'assets/js/[name].chunk.js',
    path: path.resolve(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'), // 设置别名 @ 指向 src 目录
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/, // 针对CSS文件应用loader
        use: [
          'style-loader', // 将CSS以<style>标签的形式注入到HTML
          'css-loader', // 解析CSS文件后，使用import加载，并返回CSS代码
          'postcss-loader', // 处理CSS中的@import 和 url()，使用Tailwind
        ],
      },
      {
        test: /.(jsx?)|(tsx?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  // TODO-n
                  targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead', // 根据项目去配置
                  useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
                  corejs: 3, // 使用 core-js@3 版本
                },
              ],
              ['@babel/preset-typescript'],
              ['@babel/preset-react'],
            ],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: 'assets/imgs/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          },
        },
        generator: {
          filename: 'assets/fonts/[name].[hash:8][ext]',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      // 多入口配置
      chunks: ['index'],
    }),
  ],
};
