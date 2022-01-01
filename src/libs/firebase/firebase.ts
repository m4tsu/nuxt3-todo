// import { initializeApp } from 'firebase/app'
import { getApp, getApps, initializeApp } from 'firebase/app'

export const firebaseConfig = {
  apiKey: 'AIzaSyBEiLsXcnWMheCGtepGuam0UkvCpJj6Dnc',
  authDomain: 'nuxt3-practice.firebaseapp.com',
  projectId: 'nuxt3-practice',
  storageBucket: 'nuxt3-practice.appspot.com',
  messagingSenderId: '305743470448',
  appId: '1:305743470448:web:5d92b5ff17d7926ca1b9b5',
}

const apps = getApps()
export const firebaseApp = apps.find(({ name }) => name == 'client')
  ? getApp('client')
  : initializeApp(firebaseConfig, 'client')
