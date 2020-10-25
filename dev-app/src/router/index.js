import Vue from 'vue';
import Router from 'vue-router';
import BookIndex from '@/pages/BookIndex';
import BookEdit from '@/pages/BookEdit';
import BookSearch from '@/pages/BookSearch';
import NotFound from '@/views/NotFound.vue';
import User from '@/views/users/User.vue';
import UserProfile from '@/views/users/user_components/UserProfile';
import UserPost from '@/views/users/user_components/UserPost';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'BookIndex',
      component: BookIndex
    },
    {
      path: '/search',
      name: 'BookSearch',
      component: BookSearch,
    },
    {
      path: '/edit',
      name: 'BookEdit',
      component: BookEdit
    },
    // {
    //   name: 'BookDetail',
    //   path: '/book/:id',
    //   params: {},
    //   component: BookDetail,
    //   //router-componentにpropsを渡す(pramsとして)
    //   //ルートの情報を取得するには関数モードで記述しないといけない。
    //   props: route => ({
    //     id: Number(route.params.id),
    //     title: route.params.title,
    //     content: route.params.content
    //   })
    // },
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
