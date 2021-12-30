<template>
  <div>
    <ul>
      <li v-for="(todo, index) in todos">
        <input type="checkbox" v-model="todo.done" />
        <span>{{ todo.title }}</span
        >:
        <span v-if="todo.type === 'number'">{{
          todo.value.toExponential()
        }}</span
        ><span v-else>{{ todo.value.length }}</span>
        <button @click="remove(index)">REMOVE</button>
      </li>
    </ul>
    <input type="text" v-model="newToDoTitle" />
    <button @click="add">ADD</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '#imports'
console.log('hogeeeeeeee')
type ToDo = {
  done: boolean
  title: string
} & (
  | {
      type: 'number'
      value: number
    }
  | {
      type: 'string'
      value: string
    }
)

export default defineComponent({
  head: {
    title: 'My Page',
  },
  setup() {
    const todos = ref<ToDo[]>([
      {
        done: false,
        title: 'これはやることです',
        type: 'number',
        value: 2,
      },
      {
        done: true,
        title: '二つ目のやること',
        type: 'string',
        value: 'hoge',
      },
      {
        done: false,
        title: '三つ目のやること',
        type: 'number',
        value: 899899,
      },
    ])
    const newToDoTitle = ref<string>('')
    const add = () => {
      todos.value.push({
        done: false,
        title: newToDoTitle.value,
        type: 'string',
        value: 'hogeeeeeeeeeee',
      })
      newToDoTitle.value = ''
    }
    const remove = (index: number) => {
      todos.value.splice(index, 1)
    }

    return {
      todos,
      newToDoTitle,
      add,
      remove,
    }
  },
})
</script>
