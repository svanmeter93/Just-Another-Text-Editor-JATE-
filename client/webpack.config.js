const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // TODO: Add and configure workbox plugins for a service worker and manifest file.
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Workbox',
      }),
      new InjectManifest({
        swSrc:'./src-sw.js',
        swDest: 'src-sw.js',
      }),

      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'Workbox',
        short_name: 'WB',
        description: 'Just another type editor!',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },
        ],
      }),
    ],

    // TODO: Add CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css@/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/images',
        },
        {
          test:/\.m?js$/,
          exclude: /(node_modules|bower_components)/,
            use:{
              loader:'babel-loader',
              options: {
                presents: ["@babel/present-env"]
              }
            }
        }
      ],
    },
  };
};
