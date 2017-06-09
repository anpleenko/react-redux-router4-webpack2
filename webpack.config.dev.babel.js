import webpack from 'webpack';
import path from 'path';
import deepmerge from 'deepmerge';
import config from './src/config';
import defaults, { defaultLoaders, defaultPlugins } from './webpack.default.config.babel';

const webpackConfig = deepmerge(defaults, {
  entry: {
    app: [
      `webpack-dev-server/client?http://localhost:${config.port}`,
      'webpack/hot/dev-server',
      './src/index',
    ],
  },
  devtool: 'source-map',
  module: {
    rules: [
      ...defaultLoaders,
      {
        test: /\.jsx?$/,
        use: [
          { loader: 'react-hot-loader' },
          { loader: 'babel-loader' },
        ],
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.join(__dirname, '/src/config')],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...defaultPlugins,
    new webpack.DefinePlugin({
      DEV: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
});

export default webpackConfig;
