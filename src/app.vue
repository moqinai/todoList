<template>
  <div id="app">
    <div class="cover"></div>
    <v-header></v-header>
    <todo></todo>
    <v-footer></v-footer>
  </div>
</template>

<script>
  import header from './todo/header.vue'
  import footer from './todo/footer.jsx'
  import todo from './todo/todo.vue'

  export default {
    components: {
      'v-header': header,
      'v-footer': footer,
      todo
    }
  }
</script>

<style scoped lang="stylus">
  #app
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
  .cover
    position absolute
    left: 0
    top: 0
    right: 0
    bottom: 0
    background-color: #999
    opacity: .6
    z-index: -1
</style>
