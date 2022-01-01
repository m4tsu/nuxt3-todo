<template>
  <div>
    <v-list>
      <v-list-item v-for="user in users" :key="user.id">
        <NuxtLink :to="`/users/${user.id}`">
          <v-card>
            <v-card-header>{{ user.displayName }}</v-card-header>
            <v-card-text>id: {{ user.id }}</v-card-text>
          </v-card>
        </NuxtLink>
      </v-list-item>
    </v-list>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '#imports'
import { useAllUsers } from '~~/src/composables/usecase/user'

export default defineComponent({
  setup() {
    const { data: users, error } = useAllUsers()
    console.log(users.value, error.value)

    return {
      users,
      error,
    }
  },
})
</script>
