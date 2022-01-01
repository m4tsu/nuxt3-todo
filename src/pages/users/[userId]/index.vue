<template>
  <div v-if="user">
    <h1>{{ user.displayName }} の Todoリスト</h1>
    <v-list>
      <v-list-item v-for="todo in todos" :key="todo.id">
        <NuxtLink :to="`/todos/${todo.id}`">
          <v-card>
            <v-card-header>{{ todo.title }}</v-card-header>
            <v-card-text>id: {{ todo.id }}</v-card-text>
            <v-card-text>body: {{ todo.body }}</v-card-text>
            <v-card-text
              >status: {{ todo.done ? 'Done' : 'InProgress' }}</v-card-text
            >
          </v-card>
        </NuxtLink>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#imports'
import { useUserTodos } from '~~/src/composables/usecase/todo'
import { useAllUsers, useUser } from '~~/src/composables/usecase/user'

export default defineComponent({
  setup() {
    const route = useRoute()
    const query = route.query as { userId: string }
    console.log(route)
    const { data: user, error: userError } = useUser(query.userId)
    const { data: todos, error: todosError } = useUserTodos(query.userId)
    console.log(userError.value, todosError)
    return {
      user,
      userError,
      todos,
      todosError,
    }
  },
})
</script>
