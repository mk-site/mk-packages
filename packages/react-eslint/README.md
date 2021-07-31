
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
  rules: {}
};

```

### vscode开发工具使用
  安装Eslint插件，可自动校验