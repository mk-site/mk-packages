module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        '@typescript-eslint',
    ],
    rules: {
        'no-use-before-define': 0,
        'import/no-extraneous-dependencies': 0,
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error'],
        indent: ['error', 4, {
            SwitchCase: 1,
            MemberExpression: 1,
            flatTernaryExpressions: false,
        }],
        quotes: ['error', 'single'],
        'no-console': 0,
        'max-len': ['error', { code: 160 }],
        'import/extensions': ['error', 'never', { svg: 'always' }],
    },
};
  