<template>
  <div class="todo">
    <section class="real-app">
      <input 
        type="text"
        class="add-input"
        autofocus="autofocus"
        placeholder="你要干啥？"
        @keyup.enter="addTodo"
      >
      <v-item 
        :todo="todo"
        v-for="todo in filteredTodos"
        :key="todo.id"
        @del="deleteTodo"
      />
      <tabs
        @toggle="toggleFilter"
        @clearAll="clearAllCompleted"
        :filter="filter" 
        :todos="todos"/>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import item from './item.vue'
  import tabs from './tabs.vue'

  let id = 0
  export default {
    data () {
      return {
        todos: [],
        filter: 'all'
      }
    },
    computed: {
      filteredTodos () {
        if (this.filter === 'all') {
          return this.todos
        }
        const completed = this.filter === 'completed'
        return this.todos.filter(todo => completed === todo.completed)
      }
    },
    methods: {
      addTodo (e) {
        if (e.target.value == '') {
          console.log('什么都没有添加')
        } else {
          this.todos.unshift({
            id: id++,
            content: e.target.value.trim(),
            completed: false
          }) // 插入数组第一项
          e.target.value = '' // 每次添加完都清空
        }
      },
      deleteTodo (id) {
        this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
      },
      toggleFilter (state) {
        this.filter = state
      },
      clearAllCompleted () {
        this.todos = this.todos.filter(todo => !todo.completed)
      }
    },
    components: {
      'v-item': item,
      tabs
    }
  }
</script>

<style scoped lang="stylus">
  .real-app
    width 500px
    margin :0px  auto
    box-shadow :0px 0px 5px #666
.add-input 
    position:relative;
    margin 0px
    width 100%
    font-size 24px
    font-family  inherit 
    font-weight:inherit
    line-height 1.4rem
    outline none 
    color inherit
    padding 6px
    box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
    box-sizing border-box
    font-smoothing: antialiased
    padding 16px 16px 16px 60px
    border none
</style>
