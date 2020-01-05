const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = config => ({
  ...config,
  plugins: [...config.plugins, new MonacoWebpackPlugin()]
});
