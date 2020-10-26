<template>
  <v-app-bar
      app
      color="primary"
      dark
    >
      <v-spacer></v-spacer>
      <v-btn
        color="error"
        @click="deleteLocalStorege"
      >
        削除する
      </v-btn>
    </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    deleteLocalStorege() {
      this.$emit('delete-local-storege')
    }
  }
}
</script>
