module.exports = {
  root: true,
  env: {
    browser: false,
    node: false,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: ['@nuxtjs', 'plugin:nuxt/recommended', 'prettier'],
  plugins: [],
  // add your custom rules here
  rules: {
    "no-console": false,
    'vue/multi-word-component-names': 'off',

  },

}
