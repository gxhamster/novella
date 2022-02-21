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
  }
};
