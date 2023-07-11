module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:@next/next/recommended',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'prettier'],
  settings: {
    react: {
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
    },
  },
  rules: {
    // 'prettier/prettier': [
    //   'error',
    //   {
    //     printWidth: 100,
    //     endOfLine: 'auto',
    //   },
    // ],
    // indent: [2, 'tab'],
    // // 'no-tabs': 0,
    'linebreak-style': 'off',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-console': [2],
    'no-unused-vars': [2],
    'max-len': [
      'error',
      {
        code: 100,
        tabWidth: 2,
        comments: 120,
        ignoreUrls: true,
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
        ignoreRegExpLiterals: true,
      },
    ],
    'no-multiple-empty-lines': [
      'error',
      {
        max: 2,
        maxEOF: 1,
      },
    ],
    'arrow-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'keyword-spacing': [
      'error',
      {
        before: true,
        after: true,
      },
    ],
    'react/react-in-jsx-scope': 'off',
    '@next/next/no-img-element': 'off',
    '@next/next/no-document-import-in-page': 'off',
  },
};
