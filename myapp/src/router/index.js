import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import login from '@/components/login';
import regist from '@/components/regist';
import card from '@/components/card';
import personer from '@/components/personer';
import qiandao from '@/components/qiandao';
import index from '@/components/index';
import xce from '@/components/image';
import upFile from '@/components/upFile';
import upAvatr from '@/components/upAvatr';
import userName from '@/components/userName';
import center from '@/components/center';
import post from '@/components/post';
import ranking from '@/components/ranking';
import bu from '@/components/bu';
import centerPer from '@/components/centerPer';
import userFollow from '@/components/userFollow';
import shoucang from '@/components/shoucang';
import user from '@/components/user';
import comment from '@/components/comment';
import userImage from '@/components/userImage';
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
      path: '/ranking',
      name: 'ranking',
      component: ranking
    },
    {
      path: '/bu',
      name: 'bu',
      component: bu
    },
    {
      path: '/comment/:id',
      name: 'Comment',
      component: comment
    },
    {
      path: '/userImage/:user',
      name: 'userImage',
      component: userImage
    },
    {
      path: '/userFollow',
      name: 'userFollow',
      component: userFollow
    },
    {
      path: '/user/:user',
      name: 'user',
      component: user,
      
    },
    {
      path: '/center',
      name: 'center',
      component: center,
      children:[
      
        {
          path: '/',
          name: 'centerPer',
          component: centerPer,
        },
        {
          path: '/centerPer',
          name: 'centerPer',
          component: centerPer,
        },
        {
          path: '/shoucang',
          name: 'shoucang',
          component: shoucang,
        }
      ]
      
      
    },
    {
      path: '/userName',
      name: 'userName',
      component: userName
    },
    {
      path: '/post',
      name: 'post',
      component: card
    },
    {
      path: '/upAvatr',
      name: 'upAvatr',
      component: upAvatr
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
