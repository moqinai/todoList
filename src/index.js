import Vue from 'vue'
import App from './app.vue'
import './assets/stylus/global.styl'

const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)  //数据每次有变化都会执行render方法，重新生成html
}).$mount(root) // 挂载