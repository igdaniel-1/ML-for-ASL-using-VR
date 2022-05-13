module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    mocha: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
    semi: ["error", "always"],
    "no-var": ["error"],
    "prefer-const": [
      "error",
      {
        destructuring: "any",
        ignoreReadBeforeAssign: false,
      },
    ],
    curly: ["off"],
    eqeqeq: ["error"],
    "no-multi-spaces": ["error"],
    "no-lone-blocks": ["error"],
    "no-self-compare": ["error"],
    "no-unused-vars": ["warn"],
    "no-unused-expressions": ["warn"],
    "no-useless-call": ["error"],
    "no-use-before-define": ["error"],

    camelcase: ["error", { properties: "never" }],
    "func-call-spacing": ["error"],
    "no-lonely-if": ["error"],
    "array-bracket-spacing": ["error"],

    "no-console": ["off"],
    "no-prototype-builtins": ["off"],
  },
};
