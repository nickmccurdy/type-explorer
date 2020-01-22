const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = {
  webpack: config => ({
    ...config,
    plugins: [
      ...config.plugins,
      new MonacoWebpackPlugin({ languages: ["typescript"] })
    ]
  }),
  jest: config => ({
    ...config,
    setupFiles: ["jest-canvas-mock"],
    transformIgnorePatterns: ["node_modules/(?!monaco-editor/)"]
  })
};
