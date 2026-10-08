const expoConfig = require('eslint-config-expo/flat');
const prettierPlugin = require('eslint-plugin-prettier/recommended');

module.exports = [
  ...expoConfig,
  prettierPlugin,
  {
    ignores: ['node_modules/*', '.expo/*', 'dist/*', 'android/*', 'ios/*'],
  },
  {
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
