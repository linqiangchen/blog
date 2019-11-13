import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import login from '@/components/login';
import regist from '@/components/regist';
import col from '@/components/col';
import card from '@/components/card';
import personer from '@/components/personer';
import qiandao from '@/components/qiandao';
import index from '@/components/index';
import xce from '@/components/xce';
import upFile from '@/components/upFile';
Vue.use(Router);
export default new Router({
  routes: [{
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/regist',
      name: 'regist',
      component: regist
    },
    {
      path: '/personer',
      name: 'personer',
      component: personer
    },
    {
      path: '/col',
      name: 'index',
      component: index
    },
    {
      path: '/card',
      name: 'card',
      component: card
    },
    {
      path: '/qiandao',
      name: 'qiandao',
      component: qiandao
    },
    {
      path: '/xce',
      name: 'xce',
      component: xce
    },
    {
      path: '/upFile',
      name: 'uoFile',
      component: upFile
    }
  ]
});
