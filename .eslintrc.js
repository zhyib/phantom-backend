module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    indent: 'off',
    'linebreak-style': 0,
    'import/extensions': 0,
    'no-unused-vars': 'off',
    '@typescript-eslint/indent': ['warn', 2],
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
};
