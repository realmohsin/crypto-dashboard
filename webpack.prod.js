const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const BrotliPlugin = require('brotli-webpack-plugin')

// module.exports = {
//   mode: 'production',
//   entry: {
//     main: './src/index.js'
//   },
//   output: {
//     path: path.join(__dirname, 'dist'),
//     filename: '[name].[contenthash].bundle.js',
//     publicPath: '/'
//   },
//   optimization: {
//     splitChunks: {
//       chunks: 'all',
//       automaticNameDelimiter: '_',
//       cacheGroups: {
//         vendors: {
//           test: /[\\/]node_modules[\\/]/
//         }
//       }
//     },
//     minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin({})]
//   },
//   resolve: {
//     extensions: ['.js', '.jsx']
//   },
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         use: ['babel-loader', 'eslint-loader']
//       },
//       {
//         test: /\.s?css$/,
//         use: [
//           MiniCssExtractPlugin.loader,
//           'css-loader',
//           'postcss-loader',
//           'resolve-url-loader',
//           {
//             loader: 'sass-loader',
//             options: {
//               sourceMap: true,
//               sourceMapContents: false
//             }
//           }
//         ]
//       },
//       {
//         test: /\.(jpe?g|png|svg|gif)$/,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 5000,
//               fallback: 'file-loader',
//               name: '[name].[contenthash].[ext]'
//             }
//           },
//           'image-webpack-loader'
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: './src/index.html',
//       favicon: 'src/assets/favicon.ico',
//       minify: {
//         collapseWhitespace: true,
//         removeComments: true,
//         removeRedundantAttributes: true,
//         removeScriptTypeAttributes: true,
//         removeStyleLinkTypeAttributes: true,
//         useShortDoctype: true
//       }
//     }),
//     new CleanWebpackPlugin(),
//     new MiniCssExtractPlugin({
//       filename: '[name].[contenthash].css'
//     }),
//     new OptimizeCssAssetsPlugin({
//       cssProcessorPluginOptions: {
//         preset: ['default', { discardComments: { removeAll: true } }]
//       }
//     }),
//     new CompressionPlugin({
//       algorithm: 'gzip'
//     }),
//     new BrotliPlugin()
//   ]
// }

module.exports = {
  mode: 'production',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'scripts/[name].[contenthash:8].js',
    chunkFilename: 'scripts/[name].[contenthash:8].js',
    publicPath: '/'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/
        }
      }
    },
    minimizer: [new TerserPlugin()]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              publicPath: '/images',
              outputPath: '/images'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:8].css'
    }),
    new OptimizeCssAssetsPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      favicon: 'src/assets/favicon.ico'
    }),
    new CompressionPlugin({
      algorithm: 'gzip'
    }),
    new CompressionPlugin({
      filename: '[path].br[query]',
      algorithm: 'brotliCompress',
      test: /\.(js|css|html|svg)$/,
      compressionOptions: { level: 11 },
      threshold: 0,
      minRatio: 0.8,
      deleteOriginalAssets: false
    })
  ]
}
