import { doc, getDoc, getDocs } from 'firebase/firestore'
import { collection } from '@/libs/firebase/db'

export const userRepository = {
  getAll: async () => {
    const qs = await getDocs(collection('users', {}))
    return qs.docs.map((doc) => doc.data())
  },
  get: async (id: string) => {
    const docRef = doc(collection('users', {}), id)
    const ds = await getDoc(docRef)
    if (ds.exists()) {
      return ds.data()
    } else {
      throw new Error('not found')
    }
  },
}
