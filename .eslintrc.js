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
    'vue/multi-word-component-names': 'off'
  },
  'vue/valid-v-slot': ['error', {
    allowModifiers: true,
  }],
}
