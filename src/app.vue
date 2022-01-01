<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>

    <v-main style="padding: 80px">
      <NuxtPage />
    </v-main>
  </v-app>
</template>

<script lang="ts">
export default defineComponent({
  setup() {
    const drawer = ref<boolean>(false)
    return {
      drawer,
    }
  },
})
</script>
