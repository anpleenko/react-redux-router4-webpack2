import webpack from 'webpack';
import path from 'path';

export const defaultLoaders = [
  {
    test: /\.(jpg|png)$/,
    use: ['file-loader?name=img/[name].[ext]'],
  },
  {
    test: /\.(ttf|svg|woff2?|eot)$/,
    use: ['file-loader?name=font/[name].[ext]'],
  },
];

export const defaultPlugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    filename: 'vendor.bundle.js',
    minChunks: Infinity,
  }),
  new webpack.ProvidePlugin({
    PropTypes: 'prop-types',
  }),
];

const joinPath = pathString => path.join(__dirname, pathString);

const defaults = {
  entry: {
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.js',
    publicPath: '/dist/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.css', '.json'],
    alias: {
      components    : joinPath('/src/components'),
      config        : joinPath('/src/config'),
    },
    modules: [
      'node_modules',
    ],
  },
};

export default defaults;
