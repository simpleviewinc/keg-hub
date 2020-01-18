module.exports = {
  stories: [ '../src/components/**/*.stories.js' ],
  addons: [
    {
      name: '@storybook/preset-create-react-app',
      options: { tsDocgenLoaderOptions: {} }
    },
    {
      name: '@storybook/addon-docs',
      options: { configureJSX: true },
    },
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-storysource/register',
  ],
}