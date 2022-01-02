<template>
  <div v-if="userError">userError: {{ userError }}</div>
  <div v-if="todosError">todosError: {{ userError }}</div>

  <div v-if="user">
    <h1>{{ user.displayName }} の Todoリスト</h1>
    <v-container>
      <v-form @submit="addTodo">
        <div>
          <v-text-field
            :label="'Title'"
            name="title"
            required
            v-model="newTodo.title"
          />
          <v-textarea :label="'Body'" name="body" v-model="newTodo.body" />
          <!-- <v-checkbox
            v-model="newTodo.public"
            label="public"
            name="public"
            :color="'red'"
          /> -->
          <!-- Iconが何故か表示されない -->
          <v-btn type="submit">Todoを追加</v-btn>
        </div>
      </v-form>
    </v-container>
    <v-list>
      <v-list-item v-for="todo in todos" :key="todo.id">
        <NuxtLink :to="`/users/${userId}/todos/${todo.id}`">
          <v-card>
            <v-card-header>{{ todo.title }}</v-card-header>
            <v-card-text>body: {{ todo.body }}</v-card-text>
            <v-card-text
              >createdAt: {{ todo.createdAt.toString() }}</v-card-text
            >
            <v-card-text
              >status: {{ todo.done ? 'Done' : 'InProgress' }}</v-card-text
            >
          </v-card>
        </NuxtLink>
      </v-list-item>
    </v-list>
  </div>
  <div v-else>Loading....</div>
</template>

<script lang="ts">
import { defineComponent } from '#imports'
import { todoRepository } from '~~/src/composables/repositories/todo'
import { useUserTodos } from '~~/src/composables/usecase/todo'
import { useAllUsers, useUser } from '~~/src/composables/usecase/user'
import { NewTodoFormParams } from '~~/src/entities/todo'

export default defineComponent({
  setup() {
    const route = useRoute()
    const { userId } = route.params as { userId: string }
    const newTodo = ref<NewTodoFormParams>({ title: '', public: false })

    console.log(route.params)
    const { data: user, error: userError } = useUser(userId)
    const { data: todos, error: todosError, mutate } = useUserTodos(userId)
    const addTodo = async () => {
      console.log(newTodo.value)
      const result = await todoRepository.post(userId, newTodo.value)
      await mutate(() => (todos.value ? [...todos.value, result] : [result]))
    }

    return {
      user,
      userId,
      userError,
      todos,
      todosError,
      newTodo,
      addTodo,
    }
  },
})
</script>
