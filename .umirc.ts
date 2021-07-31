// @ts-ignore
import { defineConfig } from 'umi';
// dumi 文档配置
export default defineConfig({
    mode: 'site',
    title: 'mk站点文档',
    publicPath: '/mk-packages/',
    base: '/mk-packages/',
    outputPath: 'docs',
    resolve: {
        includes: [
            'site-docs',
        ],
    },
    navs: [
        {
            title: 'guide',
            path: '/guide',
        },
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
    metas: [
        {
          name: 'keywords',
          content: 'vue3-hooks, vue3-components, mk, mk-cli, mk-react, react, mk-hooks, eslint, mk-eslint, vue3, mk-vue3',
        },
        {
          name: 'description',
          content: 'vue3, hooks, react-hooks, vue3-hooks, react, vue3组件库, vue3 vuex, mk脚手架、mk组件库，mk hooks库',
        },
    ],
});