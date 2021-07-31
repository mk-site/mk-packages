const external = ['react'];
module.exports = {
    umd: {
        external: [...external],
        globals: {
            react: 'React',
        },
    },
    cjs: {
        external: [...external],
        ignores: ['*.md'],
        replaceOptions: {},
        tsconfig: {},
    },
    esm: {
        external: [...external],  // 构建工具为gulp,无需使用external排除模块
        ignores: ['*.md'],
        replaceOptions: {},
        tsconfig: {},
    },
};
