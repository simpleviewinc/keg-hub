module.exports = {
  parser: 'babel-eslint',
  root: true,
  globals: {
    jest: true,
    __DEV__: true,
    expect: true,
    React: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    node: true,
    'jest/globals': true,
    'react-native/react-native': true,
  },
  plugins: [ 'jest', 'react', 'react-native' ],
  extends: [ 'plugin:jest/recommended', 'plugin:react/recommended' ],
  settings: {
    react: {
      version: '16.9',
    },
  },
  rules: {
    /* General */
    'no-console': [ 'warn', { allow: [ 'warn', 'error' ] }],
    'brace-style': [ 'error', 'stroustrup' ],
    indent: [ 'error', 2, { offsetTernaryExpressions: true }],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    'id-length': [
      'error',
      {
        min: 2,
        exceptions: [ 'y', 'x', 'i', 'e', '_', 'k', 'p', 'P', 'I' ],
      },
    ],
    'one-var': [ 'error', 'never' ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'newline-per-chained-call': 2,
    'array-bracket-spacing': [
      'error',
      'always',
      {
        arraysInArrays: false,
        singleValue: false,
        objectsInArrays: false,
      },
    ],
    'space-in-parens': [ 'error', 'never' ],
    'object-curly-spacing': [ 'error', 'always' ],
    'func-call-spacing': [ 'error', 'never' ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'no-unused-vars': [
      'error',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    /* Jest */
    'jest/no-disabled-tests': 'error',
    'jest/no-focused-tests': 'error',
    'jest/no-identical-title': 'error',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'error',
    /* React-Native */
    'react-native/no-raw-text': 1,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    /* React */
    'react/jsx-curly-spacing': [
      2,
      {
        when: 'always',
        attributes: false,
        children: true,
        spacing: {
          objectLiterals: 'never',
        },
      },
    ],
    'react/prop-types': 0,
    'react/display-name': 0,
    'react/no-children-prop': 0,
    'react/jsx-first-prop-new-line': [ 'error', 'multiline' ],
    'react/jsx-max-props-per-line': [
      'error',
      {
        maximum: 1,
        when: 'always',
      },
    ],
    'react/jsx-closing-bracket-location': [ 'error', 'line-aligned' ],
  },
}
