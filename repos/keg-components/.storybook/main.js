const path = require('path')

module.exports = {
  stories: ['../src/components/**/*.stories.@(js|mdx)'],
  addons: [
    {
      name: '@storybook/preset-create-react-app',
      options: { tsDocgenLoaderOptions: {} }
    },
    {
      name: '@storybook/addon-docs/preset',
      options: { configureJSX: true },
    },
    {
      name: '@storybook/addon-storysource',
      options: {
        rule: {
          // test: [/\.stories\.jsx?$/], This is default
          include: [path.resolve(__dirname, '../src/components')], // You can specify directories
        },
        loaderOptions: {
          prettierConfig: { printWidth: 80, singleQuote: false },
        },
      },
    },
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-storysource/register',
    '@storybook/addon-knobs/register'
  ],
}
