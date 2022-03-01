const webpack = require('webpack')

module.exports = {
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        productName: "Novella",
        appId: "app.novella.com",
        win: {
          target: ["nsis", "msi"],
          icon: "build/icons/icon.png",
        //   sign: "./electron/winsign.js",
          publisherName: "Tritech",
        },
      },
      preload: 'src/preload.js',
    },
  },
  configureWebpack: {
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    runtimeChunk: 'single'
  },
  module: {
    rules: [
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "fonts/[name].[ext]",
          },
        },
      }
    ]
  }
  }
};
