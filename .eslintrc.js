module.exports = {
  extends: 'airbnb',
  globals: {
    document: false,
    window: false,
    XMLHttpRequest: false,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  rules: {
    'arrow-parens': 0,
    'class-methods-use-this': 0,
    'label-has-for': 0,
    'label-has-associated-control': 0,
  },
};
