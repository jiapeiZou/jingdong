import { createApp } from 'vue'
import App from './App.vue'
// 引入了一个名叫app的组件
import router from './router'
import store from './store'
// 创建了一个App实例，它使用了路由，使用了Vuex里面的store全局数据，
// 然后把这个实例挂载到页面上 叫app的Dom节点上

import 'normalize.css' // Vue新语法，不是JS的语法
// 'normalize.css统一不同浏览器之间的样式差异
import './style/index.scss' // Vue新语法，不是JS的语法
// 引入css的设置
createApp(App).use(store).use(router).mount('#app')
