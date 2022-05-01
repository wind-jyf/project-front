// https://umijs.org/config/
import { defineConfig } from 'umi';
import { join } from 'path';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  // https://umijs.org/zh-CN/plugins/plugin-locale
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/user',
      layout: false,
      routes: [
        {
          path: '/user/login',
          layout: false,
          name: 'login',
          component: './user/Login',
        },
        {
          path: '/user',
          redirect: '/user/login',
        },
        {
          name: 'register-result',
          icon: 'smile',
          path: '/user/register-result',
          component: './user/register-result',
        },
        {
          name: 'register',
          icon: 'smile',
          path: '/user/register',
          component: './user/register',
        },
        {
          component: '404',
        },
      ],
    },
    {
      path: '/homepage',
      icon: 'form',
      name: '首页',
      component: './homepage'
    },
    {
      path: '/workbench',
      icon: 'form',
      name: '医生工作台',
      routes: [
        {
          path: '/workbench',
          redirect: '/workbench/list',
        },
        {
          path: '/workbench/list',
          component: './workbench/list',
          icon: 'smile',
        },
        {
          path: '/workbench/add',
          component: './workbench/add',
        },
        {
          path: '/workbench/detail',
          component: './workbench/detail',
        },
      ]
    },
    {
      path: '/information',
      icon: 'form',
      name: '信息维护',
      routes: [
        {
          path: '/information',
          redirect: '/information/department/list',
        },
        {
          name: '科室管理',
          icon: 'smile',
          path: '/information/department/list',
          component: './information/department/list',
        },
        {
          path: '/information/department/add',
          component: './information/department/add',
        },
        {
          path: '/information/department/detail',
          component: './information/department/detail',
        },
        {
          name: '药品管理',
          icon: 'smile',
          path: '/information/medicine/list',
          component: './information/medicine/list',
        },
        {
          path: '/information/medicine/add',
          component: './information/medicine/add',
        },
        {
          path: '/information/medicine/detail',
          component: './information/medicine/detail',
        },
        {
          name: '疾病管理',
          icon: 'smile',
          path: '/information/disease/list',
          component: './information/disease/list',
        },
        {
          path: '/information/disease/add',
          component: './information/disease/add',
        },
        {
          path: '/information/disease/detail',
          component: './information/disease/detail',
        },
      ],
    },
    {
      path: '/analysis',
      icon: 'form',
      name: '数据分析',
      routes: [
        {
          path: '/analysis',
          redirect: '/analysis/department-analysis',
        },
        {
          name: '科室分析',
          icon: 'smile',
          path: '/analysis/department-analysis',
          component: './analysis/department-analysis',
        },
        {
          name: '药品分析',
          icon: 'smile',
          path: '/analysis/medicine-analysis',
          component: './analysis/medicine-analysis',
        },
        {
          name: '病情分析',
          icon: 'smile',
          path: '/analysis/disease-analysis',
          component: './analysis/disease-analysis',
        },
        {
          path: '/analysis/disease-analysis/add',
          component: './analysis/disease-analysis/add',
        },
        {
          path: '/analysis/disease-analysis/result',
          component: './analysis/disease-analysis/result',
        },
      ],
    },
    {
      path: '/download',
      icon: 'form',
      name: '数据下载',
      component: './download/list'
    },
    {
      path: '/',
      redirect: '/dashboard/analysis',
    },
    {
      component: '404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: false,
  ignoreMomentLocale: true,
  // proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  openAPI: [
    {
      requestLibPath: "import { request } from 'umi'",
      // 或者使用在线的版本
      // schemaPath: "https://gw.alipayobjects.com/os/antfincdn/M%24jrzTTYJN/oneapi.json"
      schemaPath: join(__dirname, 'oneapi.json'),
      mock: false,
    },
    {
      requestLibPath: "import { request } from 'umi'",
      schemaPath: 'https://gw.alipayobjects.com/os/antfincdn/CA1dOm%2631B/openapi.json',
      projectName: 'swagger',
    },
  ],
  nodeModulesTransform: {
    type: 'none',
  },
  mfsu: {},
  webpack5: {},
  exportStatic: {},
});
