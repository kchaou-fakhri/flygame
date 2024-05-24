module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          extensions: [".ts", ".tsx", "js", "jsx", ".json"],
          alias: {
            "@model": "./src/model",
            "@utils": "./src/utils/",
            "@constants": "./src/constants/",
          },
        },
      ],
    ],
  };
};
