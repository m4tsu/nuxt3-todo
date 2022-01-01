<template>
  <div>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        <input type="checkbox" v-model="todo.done" />
        <span>{{ todo.title }}</span
        >:
        <!-- <span v-if="todo.type === 'number'">{{
          todo.value.toExponential()
        }}</span
        ><span v-else>{{ todo.value.length }}</span>
        <button @click="remove(index)">REMOVE</button> -->
      </li>
    </ul>
    <!-- <input type="text" v-model="newToDoTitle" /> -->
    <v-btn @click="getTodos">ADD</v-btn>
  </div>
  <ul>
    <li v-for="t in data" :key="t.id">
      <p>id: {{ t.id }}</p>
      <p>title: {{ t.title }}</p>
      <p>done: {{ t.done }}</p>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref } from '#imports'
import { Todo } from '@/entities/todo'
import { todoRepository } from '@/composables/repositories/todo'
import { User } from '~~/src/entities/user'
import { useAllTodos } from '@/composables/usecase/todo'
// type ToDo = {
//   done: boolean
//   title: string
// } & (
//   | {
//       type: 'number'
//       value: number
//     }
//   | {
//       type: 'string'
//       value: string
//     }
// )

export default defineComponent({
  setup() {
    const todos = ref<Todo[]>([])
    const users = ref<User[]>([])
    const { data, error } = useAllTodos()
    console.log(data.value, error.value)
    const getTodos = async () => {
      console.log('hogeeee')
      const data = await todoRepository.getAll()
      todos.value = todos.value.concat(data)
    }
    // const getUsers =
    const getTodoBy = (index: number) => {
      todos.value.splice(index, 1)
    }
    watchEffect(() => console.log(todos.value))
    return {
      todos,
      // newToDoTitle,
      // add,
      // remove,
      getTodos,
      data,
      error,
    }
  },
})
</script>
