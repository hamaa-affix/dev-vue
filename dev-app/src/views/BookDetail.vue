<template>
  <div>
    <h1>本の詳細</h1>
    <p>タイトル</p>{{ title }}
    <br>
    {{ content }}
  </div>
</template>

<script>
export default {
  props: {
    id: Number,
    title: String,
    content: String
  }
}
</script>
