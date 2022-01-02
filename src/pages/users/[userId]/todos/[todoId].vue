<template>
  <div v-if="error">userError: {{ error }}</div>

  <div v-if="todo">
    <v-card width="100%">
      <v-card-header>{{ todo.title }}</v-card-header>
      <v-card-text>body: {{ todo.body }}</v-card-text>
      <v-card-text>createdAt: {{ todo.createdAt.toString() }}</v-card-text>
      <v-card-text>status: {{ todo.done ? 'Done' : 'InProgress' }}</v-card-text>
    </v-card>
  </div>
  <div v-else>Loading....</div>
</template>

<script lang="ts">
import { defineComponent } from '#imports'
import { useTodo } from '@/composables/usecase/todo'
// このディレクトリの置き方だと意図どおりにルーティングされない
export default defineComponent({
  setup() {
    const route = useRoute()
    const { userId, todoId } = route.params as {
      userId: string
      todoId: string
    }
    const { data: todo, error } = useTodo(userId, todoId)

    return {
      userId,
      todoId,
      todo,
      error,
    }
  },
})
</script>
