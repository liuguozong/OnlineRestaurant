module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  globals: {
    'AMapUI': true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  "object-shorthand": 0,//强制对象字面量缩写语法
  // add your custom rules here
  rules: {}
}
