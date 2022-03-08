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
          test: /\.(woff|woff2|eot|ttf|otf|png|svg)$/i,
          type: 'asset/resource'
        }
      ]
    }
  }
};
