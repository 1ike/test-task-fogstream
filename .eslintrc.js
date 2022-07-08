module.exports = {
  plugins: ['react', '@typescript-eslint', 'react-hooks'],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "airbnb",
    "airbnb/hooks",
    "airbnb-typescript"
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: [
    "/.eslintrc.js",
    "/babel.config.js"
  ],
  parserOptions: {
    "project": "./tsconfig.json"
  },
  rules: {
    "import/prefer-default-export": "off",
    "no-multiple-empty-lines": [
      "error",
      {
        "max": 2,
        "maxBOF": 0,
        "maxEOF": 0
      }
    ],
    "@typescript-eslint/indent": [
      "error",
      2,
      {
        "ignoredNodes": [
          "TSTypeParameterInstantiation"
        ]
      }
    ],
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "warn",
    "no-console": [
      "warn",
      {
        "allow": [
          "warn",
          "error"
        ]
      }
    ]
  }
};
