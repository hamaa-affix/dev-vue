<template>
  <v-app>
    <Header/>
    <v-main>
      <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld';
import Header from "@/layouts/Header.vue";
import Footer from "@/layouts/Footer.vue";

export default {
  name: 'App',

  components: {
    // HelloWorld,
    Header,
    Footer
  },

  data: () => ({
        formInput: {
          name: 'your name',
          praiceholder: '名前を表示してくだい',
        }
  }),
};
</script>
