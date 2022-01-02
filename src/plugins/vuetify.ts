import { defineNuxtPlugin } from '#app'
import { createVuetify } from 'vuetify'
import {
  VApp,
  VAppBar,
  VBtn,
  VNavigationDrawer,
  VAppBarNavIcon,
  VMain,
  VIcon,
  VList,
  VListItem,
  VCard,
  VCardHeader,
  VCardText,
  VRow,
  VCol,
  VContainer,
  VInput,
  VTextarea,
  VCheckbox,
  VLabel,
  VForm,
  VTextField,
} from 'vuetify/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    components: {
      VApp,
      VAppBar,
      VBtn,
      VNavigationDrawer,
      VAppBarNavIcon,
      VMain,
      VIcon,
      VList,
      VListItem,
      VCard,
      VCardHeader,
      VCardText,
      VRow,
      VCol,
      VContainer,
      VInput,
      VTextarea,
      VCheckbox,
      VLabel,
      VForm,
      VTextField,
    },
  })
  nuxtApp.vueApp.use(vuetify)
})

// 以下を node_modules/vuetify/lib/utils/global.min.js に貼る必要あり
// https://github.com/nuxt/framework/discussions/1183
// export const IS_NODE = typeof process !== 'undefined';
// export const IN_BROWSER = typeof window !== 'undefined';
// export const IS_DEBUG = false; // IS_NODE && process.?env.DEBUG === 'true';
// export const IS_PROD = false; // IS_NODE && process.?env.NODE_ENV === 'production';
// export const SUPPORTS_INTERSECTION = IN_BROWSER && 'IntersectionObserver' in window;
// export const SUPPORTS_TOUCH = IN_BROWSER && ('ontouchstart' in window || window.navigator.maxTouchPoints > 0);
// export const SUPPORTS_FOCUS_VISIBLE = IN_BROWSER && CSS.supports('selector(:focus-visible)');
