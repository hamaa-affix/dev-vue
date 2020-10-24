import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import BookList from '../views/BookList.vue';
import BookDetail from '@/views/BookDetail';
import Item from '@/views/Item.vue';
import NotFound from '@/views/NotFound.vue';
import User from '@/views/User.vue';
import UserProfile from '@/components/user/UserProfile';
import UserPost from '@/components/user/UserPost';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/book',
      name: 'BookList',
      component: BookList,
    },
    {
      name: 'BookDetail',
      path: '/book/:id',
      params: {},
      component: BookDetail,
      //router-componentにpropsを渡す(pramsとして)
      //ルートの情報を取得するには関数モードで記述しないといけない。
      props: route => ({
        id: Number(route.params.id),
        title: route.params.title,
        content: route.params.content
      })
    },
    {
      name: 'Item',
      path: '/Item/:id',
      component: Item,
    },
    {
      //ネストされたroute
      //nameを書くとエラーになる
      path: '/user',
      component: User,
      children: [
        {
          path: 'profile',
          component: UserProfile,
        },
        {
          path: 'post',
          component: UserPost,
        }
      ]
    },
    {
      name:NotFound,
      path: '*',
      component: NotFound
    }
  ]
})
