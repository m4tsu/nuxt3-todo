import { getDocs, getDoc, doc } from 'firebase/firestore'
import { collection, collectionGroup } from '~~/src/libs/firebase/db'

export const todoRepository = {
  getAll: async () => {
    const qs = await getDocs(collectionGroup('users/[userId]/todos'))
    console.log(qs.docs)
    return qs.docs.map((doc) => doc.data())
  },
  getUserTodos: async (userId: string) => {
    const qs = await getDocs(collection('users/[userId]/todos', { userId }))
    return qs.docs.map((doc) => doc.data())
  },
  getTodo: async (userId: string, id: string) => {
    const docRef = doc(collection('users/[userId]/todos', { userId }), id)
    const ds = await getDoc(docRef)
    if (ds.exists()) {
      return ds.data()
    } else {
      throw new Error('not found')
    }
  },
}
