import { defineConfig } from 'umi'

// dumi 文档配置
export default defineConfig({
    mode: 'site',
    title: 'mk站点文档',
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