import { useSWR } from '@/libs/useSWRV/useSWR'
import { todoRepository } from '../repositories/todo'

export const useAllTodos = () => {
  return useSWR({ route: 'todos' }, todoRepository.getAll)
}

export const useUserTodos = (userId: string) => {
  return useSWR({ route: 'users/[userId]/todos', params: { userId } }, () =>
    todoRepository.getUserTodos(userId)
  )
}

export const useTodo = (userId: string, todoId: string) => {
  return useSWR(
    {
      route: 'users/[userId]/todos/[docId]',
      params: { userId, docId: todoId },
    },
    () => todoRepository.getTodo(userId, todoId)
  )
}
