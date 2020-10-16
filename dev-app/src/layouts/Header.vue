<template>
  <v-app-bar app>
    <a :href="toGoogle">Googleへ</a>
    {{ totalPrace }}
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      toGoogle: "https:google.com",
      price: 100,
      number: 3
    }
  },
  computed: {
    totalPrace() {
      return this.price + this.number
    },
  }
}
</script>
