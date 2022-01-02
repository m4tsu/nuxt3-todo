import { getDocs, getDoc, doc, addDoc } from 'firebase/firestore'
import { NewTodoFormParams, NewTodoParams, Todo } from '~~/src/entities/todo'
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
  post: async (userId: string, newTodoFormParams: NewTodoFormParams) => {
    const newTodoParams: NewTodoParams = {
      ...newTodoFormParams,
      public: false,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    try {
      const result = await addDoc(
        collection('users/[userId]/todos', { userId }),
        newTodoParams
      )
      const newTodo: Todo = { ...newTodoParams, id: result.id }
      return newTodo
    } catch (e) {
      console.error(e)
      throw e
    }
  },
}
