// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';
import avatr from '@/components/avatr';
import index from '@/components/index';
import upFile from '@/components/upFile';
import post from '@/components/post';
import userFollow from '@/components/userFollow';
import centerPer from '@/components/centerPer';
import search from '@/components/search';
import fans from '@/components/fans';
import userImage from '@/components/userImage';
Vue.prototype.$axios = axios;
     
// Vue.prototype.HOME = '/api';
    //重要在于这里，Vue.prototype.HOME = '/api'是一个定值，默认指向localhost，所有修改指向路径为'/api'，配置文件index.js定义的可跨域路径
Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.component('avatr', avatr);
Vue.component('search', search);
Vue.component('centerPer', centerPer);
Vue.component('userFollow', userFollow);
Vue.component('post', post);
Vue.component('fans', fans);
Vue.component('index', index);
Vue.component('upFile', upFile);
Vue.component('userImage', userImage);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { 'App' :App ,
               
},
  template: '<App/>'
});
