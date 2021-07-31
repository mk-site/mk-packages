// 更新package.json版本号
const fs = require('fs');


const pkgFile=fs.readFileSync('./package.json');
const pkg=JSON.parse(pkgFile);
const packages = [
    // 'packages/react-hooks',
    'packages/react-ui',
];

packages.forEach((item) => {
    try {
        const pg = require(`./${item}/package.json`);
        pkg.dependencies[pg.name] = pg.version;
    } catch (error) {
        console.error(item, '文件未找到');
    }
});

fs.writeFileSync('./package.json',JSON.stringify(pkg,2, 4));
