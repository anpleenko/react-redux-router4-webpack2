import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import deepmerge from 'deepmerge';
import defaults, { defaultLoaders, defaultPlugins } from './webpack.default.config.babel';

const webpackConfig = deepmerge(defaults, {
  entry: {
    app: ['./src/index'],
  },
  module: {
    rules: [
      ...defaultLoaders,
      {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'postcss-loader' },
            {
              loader: 'sass-loader',
              options: {
                includePaths: [path.join(__dirname, '/src/config')],
              },
            },
          ],
          publicPath: '../',
        },
      ) },
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'babel-loader' },
        ],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  plugins: [
    ...defaultPlugins,
    new OptimizeCssAssetsPlugin(),

    // delete in moment unused locale
    // new webpack.ContextReplacementPlugin(/node_modules\/moment\/locale/, /en-gb/),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en-gb/),

    new ExtractTextPlugin({
      filename: 'css/style.css',
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
      },
      output: {
        comments: false,
      },
    }),
    new webpack.DefinePlugin({
      DEV: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
});

export default webpackConfig;
