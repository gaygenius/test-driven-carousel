module.exports = {
  parser: 'babel-eslint',
  plugins: ['react'],
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  env: {
    node: true,
  },
  settings: {
    react: {
      version: '16.12.0',
    },
  },
  rules: {
    'no-unused-vars': ['error', { varsIgnorePattern: '^_' }],
  },
};
