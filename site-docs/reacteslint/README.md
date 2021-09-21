
## eslint-config-mkscanner

### 开始使用

```bash
yarn add eslint-config-mkscanner
```

### 增加 .eslintrc.js配置文件
```js
// 1、tsx使用方法(react项目)
// 备注：项目需引入： react、typescript、@types/react包
module.exports = {
    extends: [
        'mkscanner/tsx',
    ],
    rules: {}
};


// 2、ts使用方法 (纯js项目)
module.exports = {
    extends: [
        'mkscanner/ts',
    ],
    "parserOptions": {
        "project": "./tsconfig.eslint.json"
    },
    rules: {}
};

// ./tsconfig.eslint.json  文件使用

{
    "extends": "./tsconfig.json", // tsconfig.json文件路径
    "include": ["src/**/*.ts", "src/**/*.js", "test/**/*.ts"],
}

```

### vscode开发工具使用
    vscode安装Eslint插件，可自动校验src目录下相关文件，设置.vscode/settings.json文件可在文件保存时自动格式化文件
``` js
{
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    }
}
```