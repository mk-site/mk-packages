module.exports = {
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        }
    },
    env: {
        node: true,
        es6: true,
        browser: true
    },
    globals: {
        Markdown: true
    },
    extends: [
        'plugin:vue/vue3-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        indent: ['error', 4, {
            SwitchCase: 1,
            MemberExpression: 1,
            flatTernaryExpressions: false,
        }],
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'baseIndent': 1,
            'closeBracket': 0,
            'alignAttributesVertically': true,
            'ignores': []
        }],
        quotes: ['error', 'single'],
        '@typescript-eslint/no-explicit-any': 0,
        'no-console': 0,
        'no-use-before-define': 0,
        'import/no-unresolved': 0,
        'no-redeclare': 0,
        'import/no-extraneous-dependencies': 0,
        'max-len': ['error', { code: 160 }],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': 0,
        'semi': ['error', 'always'],
        'vue/no-multiple-template-root': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off'
    },
};
  