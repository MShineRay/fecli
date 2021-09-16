/**
 * @reference:
 * https://eslint.vuejs.org/
 * https://eslint.vuejs.org/rules/
 * https://eslint.org/docs/user-guide/configuring/
 */
module.exports = {
  root: true,   //指定配置文件根目录：表示当前文件为eslint的根配置文件，逐层查找时无需往更上一级的文件目录中进行搜索
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier"
  ],
  // plugins: [
  //   'import'
  // ],
  parserOptions: {
    parser: "babel-eslint"/*,
    sourceType: 'module'*/
  },
  // 自定义规则
  // "off" 或 0 - 关闭规则
  // "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
  // "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // "vue/no-arrow-functions-in-watch": 2,


    // indent: ['error', 2, {SwitchCase: 1}], // 强制使用一致的缩进
    // 'indent': 0,
    // 'space-before-function-paren': 0, // 强制在 function的左括号之前使用一致的空格
    // //Vue组件 name命名规则驼峰|短线 ["error", "PascalCase"| "kebab-case"],
    // 'vue/name-property-casing': 0,
    // 'vue/html-indent': 0,
    // 'vue/max-attributes-per-line': 0,
    // 'vue/html-self-closing': 0,
    // 'vue/singleline-html-element-content-newline': 'off',
    // 'vue/multiline-html-element-content-newline': 'off',
    // 'vue/attribute-hyphenation': 'off',
    //
    // // 可以自动fix的配置项(--no-fix)
    // // 禁止使用分号结尾
    // 'semi': [0, 'never'], // 关闭语句强制分号结尾
    // 'quotes': 0,
    // 'comma-dangle': 0,
    // 'spaced-comment': 0,
    // 'no-trailing-spaces': 0,
    // 'space-before-blocks': 0,
    // 'key-spacing': 0,
    // 'keyword-spacing': 0,
    // 'no-multiple-empty-lines': 0,
    // 'padded-blocks': 0,
    // 'object-curly-spacing': 0,
    // 'no-useless-return': 0,
    // 'space-infix-ops': 0,
    // 'block-spacing': 0,
    // 'comma-spacing': 0,
    // 'arrow-spacing': 0,
    // 'semi-spacing': 0,
    // 'template-curly-spacing': 0,
    // 'func-call-spacing': 0,
    // 'space-in-parens': 0,
    // 'space-unary-ops': 0,
    // 'standard/object-curly-even-spacing': 0,
    // 'yoda': 0,
    // 'no-multi-spaces': 0,
    // 'no-extra-boolean-cast': 0,
    // 'one-var': 0,
    // 'no-unneeded-ternary': 0,
    // 'object-property-newline': 0,
    // 'comma-style': 0,
    // 'curly': 0,
    // 'brace-style': 0,
    // 'operator-linebreak': 0,
    // 'wrap-iife': 0,
    //
    // // 代码风格问题，改动影响小
    // 'no-tabs': 0,
    // 'no-empty': 0,
    // 'no-mixed-spaces-and-tabs': 0,
    // 'no-irregular-whitespace': 0,
    // 'no-useless-escape': 0,
    // 'no-useless-constructor': 0,
    // 'eol-last': 0, // 禁止文件末尾存在空行
    // 'import/first': 0,
    // 'no-template-curly-in-string': 0,
    // 'no-whitespace-before-property': 0,
    // 'no-extra-semi': 0,
    // 'new-parens': 0,
    // 'no-new': 0,
    //
    // // 代码风格问题，改动易引入BUG
    // 'camelcase': 0,
    // 'no-sequences': 0,
    // 'no-cond-assign': 0,
    // 'no-mixed-operators': 0,
    //
    // // 以下按重要性等级排序
    //
    // // cdn_lint 1期开启规则
    // 'eqeqeq': 2,
    // 'no-extend-native': 2,
    // 'no-eval': 2,
    // 'no-undef': 2,
    // 'no-var': 2,
    // 'no-redeclare': 2,
    // 'prefer-promise-reject-errors': 2,
    //
    // // cdn_lint 2期开启规则
    // 'vue/eqeqeq': 2,
    // 'prefer-const': 2,
    // 'no-with': 2,
    // 'no-unreachable': 2,
    // 'no-dupe-keys': 2,
    // 'no-duplicate-case': 2,
    // 'vue/no-dupe-keys': 2,
    // 'vue/no-duplicate-attributes': 2,
    // 'import/no-duplicates': 2,
    // 'vue/no-parsing-error': 2,
    // 'vue/valid-template-root': 2,
    // 'vue/valid-v-if': 2,
    // 'vue/valid-v-else-if': 2,
    // 'vue/valid-v-else': 2,
    // 'vue/valid-v-for': 2,
    // 'vue/valid-v-model': 2,
    // 'no-use-before-define': 2,
    // 'no-case-declarations': 2,
    // 'no-array-constructor': 2, // 有利于性能
    // 'no-new-object': 2, // 有利于性能
    // 'array-callback-return': 2,
    // 'no-useless-concat': 2,
    //
    // 'no-constant-condition': 1, // error
    // 'no-unmodified-loop-condition': 0,
    // 'no-self-assign': 0,
    // 'handle-callback-err': 0,
    // 'no-unused-vars': 0,
    // 'no-unused-expressions': 0,
    // 'no-inner-declarations': 0,
    //
    // 'vue/no-unused-vars': 0,
    // 'vue/no-unused-components': 0,
    // 'vue/require-prop-type-constructor': 0,
    // 'vue/return-in-computed-property': 0,
    // 'vue/no-side-effects-in-computed-properties': 0,
    // 'vue/require-v-for-key': 0,
    // 'vue/no-use-v-if-with-v-for': 0,
    // 'vue/require-valid-default-prop': 0,
    // 'vue/no-async-in-computed-properties': 0,
    // 'vue/html-closing-bracket-newline': 0,
    // 'vue/require-default-prop': 0,
    // 'vue/mustache-interpolation-spacing': 0,
    // 'vue/require-prop-types': 0,
    // 'vue/order-in-components': 0,
    // 'vue/attributes-order': 0,
    // 'vue/this-in-template': 0,
    // 'vue/no-confusing-v-for-v-if': 0,
    // 'vue/no-multi-spaces': 0,
    // 'vue/no-reserved-keys': 0,
    // 'vue/html-quotes': 0,
    // 'vue/html-closing-bracket-spacing': 0,
    // 'vue/prop-name-casing': 0,
    // 'vue/no-v-html': 0,
    //
    // 'standard/no-callback-literal': 0,
    // 'standard/array-bracket-even-spacing': 0,
    // 'standard/computed-property-even-spacing': 0,
    //
    // 'prettier/prettier': 0,
    //
    // 'quote-props': 0,
    // 'array-bracket-spacing': [2, 'never']
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ]
};
