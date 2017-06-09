const config = {
  port: 5000,
  localDevelop: false,
  server: {
    // noInfo: true,
    // quiet: true,
    compress: true,
    stats: {
      // Config for minimal console.log mess.
      // assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      // chunkModules: false
    },
    hot: true,
    historyApiFallback: true,
  },
};

export default config;
