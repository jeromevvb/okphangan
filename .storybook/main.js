const path = require("path");

module.exports = {
  stories: [
    "../components/**/*.stories.mdx",
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-notes/register",
  ],
  webpackFinal: async (config) => {
    config.resolve.alias["@components"] = path.resolve(
      __dirname,
      "../components"
    );
    return config;
  },
};
