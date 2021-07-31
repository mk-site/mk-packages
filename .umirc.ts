import { defineConfig } from 'umi'
console.log('环境变量', process.env.NODE_ENV);
// dumi 文档配置
export default defineConfig({
    mode: 'site',
    title: 'mk站点文档',
    publicPath: process.env.NODE_ENV !== 'production' ? '/' : '/mk-packages/',
    outputPath: 'docs',
    // history: {
    //     type: 'hash'
    // },
    resolve: {
        includes: [
            'site-docs',
        ],
    },
    navs: [
        {
            title: 'reactUI',
            path: '/reactui',
          },
        {
            title: 'reactHooks',
            path: '/reacthooks',
        },
        {
            title: 'reactEslint',
            path: '/reacteslint',
        },
        {
            title: 'vueEslint',
            path: '/vueeslint',
        }
    ],
});