module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    'vue/multi-word-component-names': ['error', {
      ignores: ['index', 'First'],
    }],
    'linebreak-style': 'off',
    'no-tabs': 0,
    'space-in-parens': ['error', 'always'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'import/no-unresolved': [2, { ignore: ['js'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'ignorePackages',
      },
    ],
    'no-console': 0,
    'no-alert': 0,
    'no-restricted-globals': 0,
  },
};
