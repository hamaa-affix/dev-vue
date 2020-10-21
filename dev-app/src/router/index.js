import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import BookList from '../views/BookList.vue';
import BookDetail from '@/views/BookDetail'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/home',
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
      props: route => ({
        id: route.params.id,
        title: route.params.title,
        content: route.params.content
      })
    }
  ]
})
