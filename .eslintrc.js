module.exports = {
  env: {
    es6: true,
    node: true,
    jest: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:react-hooks/recommended', 'plugin:@typescript-eslint/recommended', 'plugin:import/typescript', 'plugin:storybook/recommended'],
  parserOptions: {
    project: './tsconfig.json'
  },
  parser: '@typescript-eslint/parser',
  plugins: ['react', 'react-hooks', '@typescript-eslint', "prettier", "import"],
  rules: {
    indent: ['error', 2, {
      SwitchCase: 1
    }],
    quotes: ['error', 'single', {
      avoidEscape: true
    }],
    'import/order': ['error', {
      'newlines-between': 'always',
      'alphabetize': {
        'order': 'asc'
      }
    }],
    'sort-imports': ['error', {
      'ignoreDeclarationSort': true,
      'ignoreCase': true
    }],
    'no-empty-function': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'no-var': 'error',
    'no-console': 'warn',
    'one-var-declaration-per-line': 'error',
    'react/react-in-jsx-scope': 'off',
    'import/prefer-default-export': 'off',
    'no-tabs': 'off',
    'object-curly-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-no-constructed-context-values': 'off',
    'linebreak-style': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};