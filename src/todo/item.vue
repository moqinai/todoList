<template>
 <div :class="['todo-item',todo.completed ? 'completed' : '']">
   <input 
    type="checkbox"
    class="toggle"
    v-model="todo.completed"
   >
   <label> {{todo.content}}</label>
   <button class="destory" @click="deletetodo"></button>
 </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props : {
      todo: {
        type: Object,
        required: true // 必须要传入的
      }
    },
    methods: {
      deletetodo () {
        this.$emit('del', this.todo.id)
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '../assets/stylus/vendor.styl'

  .todo-item
    position: relative
    background: #FFF
    font-size: 24px
    border-bottom: 1px solid rgba(0, 0, 0, .06)
    &:hover
      .destory:after
        content: 'x'
    label
      white-space: pre-line
      word-break: break-all
      padding: 15px 60px 15px 15px
      margin-left: 45px
      display: block
      line-height: 1.2
      transition: color .4s
    &.completed
      label
        color: #d9d9d9
        text-decoration: line-through
    .toggle
      text-align: center
      width: 400px
      height: 40px
      position: absolute
      top: 0
      bottom: 0
      margin: auto 0
      border: none
      outline: none
      opacity 1
      -webkit-appearance none
      &:after
        content: url('../assets/images/round.png')
        position: absolute
        left: 12px
        cursor: pointer
      &:checked:after
        content: url('../assets/images/done.png')
        position: absolute
        left: 12px
        cursor: pointer
    .destory
      position: absolute
      right: 10px
      bottom: 0
      width: 40px
      margin: auto 0
      font-size: 30px
      color: #cc9a9a
      margin-bottom: 11px
      transition: color .2s ease-out
      background-color: transparent
      -webkit-appearance: none
      border-width: 0
      cursor: pointer
      outline: none
      &:hover
        color: red
</style>
