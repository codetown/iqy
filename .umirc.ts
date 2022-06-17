import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  metas: [
    {
      name: 'keywords',
      content: '爱奇艺视频',
    },
    {
      name: 'description',
      content: '爱奇艺视频',
    },
  ],
  links: [
    {
      rel: 'shortcut icon',
      href: '//v.qq.com/favicon.ico',
    },
  ],
  proxy: {
    '/api/': {
      target: 'http://localhost:8080/',
      changeOrigin: true,
    },
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/layout',
      routes: [
        {
          path: '/',
          title: '首页 - 爱奇艺',
          component: '@/pages/index',
        },
        {
          path: '/play',
          title: '播放页 - 爱奇艺',
          component: '@/pages/play',
        },
        {
          path: '/search',
          title: '搜索页 - 爱奇艺',
          component: '@/pages/search',
        },
      ],
    },
  ],
  fastRefresh: {},
});
