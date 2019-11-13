// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import col from '@/components/col';
import upFile from '@/components/upFile';
Vue.prototype.$axios = axios;
    //把axios挂载到vue的原型中，在vue中每个组件都可以使用axios发送请求
// Vue.prototype.HOME = '/api';
    //重要在于这里，Vue.prototype.HOME = '/api'是一个定值，默认指向localhost，所有修改指向路径为'/api'，配置文件index.js定义的可跨域路径
Vue.use(ElementUI);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { 'App' :App ,
  
},
  template: '<App/>'
});
