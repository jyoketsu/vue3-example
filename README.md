```

██╗   ██╗██╗   ██╗███████╗██████╗
██║   ██║██║   ██║██╔════╝╚════██╗
██║   ██║██║   ██║█████╗   █████╔╝
╚██╗ ██╔╝██║   ██║██╔══╝   ╚═══██╗
 ╚████╔╝ ╚██████╔╝███████╗██████╔╝
  ╚═══╝   ╚═════╝ ╚══════╝╚═════╝


```

## 简介

Vue3-example。使用`vite`，基于 `vue3 + TypeScript + vue-router + vuex + elementPlus` 开发。支持多语言和暗黑模式。

## 使用技术

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Es6+](http://es6.ruanyifeng.com/) - es6
- [Vite](https://www.pipipi.net/vite/) - vite
- [Vue3](https://staging-cn.vuejs.org/guide/introduction.html) - Vue
- [Vue-Router](https://router.vuejs.org/zh/) - Vue Router
- [Vuex](https://next.vuex.vuejs.org/zh/index.html) - vuex
- [Element-Plus](https://element-plus.org/zh-CN/) - ui
- [vue-i18n](https://kazupon.github.io/vue-i18n/zh/introduction.html#%E8%B5%9E%E5%8A%A9%E5%95%86) Language

## [online-demo](https://jyoketsu.github.io/vue3-example/)

## 安装

```
yarn
```

## 启动服务

```
yarn dev
```

## 编译并发布

```
yarn deploy
```

## 注意

将本项目用户新建项目时，注意将.env 文件中的`VITE_BASE=/vue3-example/`改为`VITE_BASE=/`，原因见[github-pages](https://cn.vitejs.dev/guide/static-deploy.html#github-pages)，.github/workflows 中的部署至 github-pages 也改为自己的部署。
