const path = require("path");

module.exports = {
  reactStrictMode: true, // Optional: Enables React's Strict Mode
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // Aliases from jsconfig.json
      components: path.resolve(__dirname, "src/components"),
      assets: path.resolve(__dirname, "src/assets"),
      styles: path.resolve(__dirname, "src/styles"),
      utils: path.resolve(__dirname, "src/utils"),
    };
    return config;
  },
};
