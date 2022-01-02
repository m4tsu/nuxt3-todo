import { MakeOptional } from '@/types/utils/MakeOptional'

export interface Todo {
  id: string
  title: string
  body?: string | null
  done: boolean
  public: boolean
  createdAt: Date
  updatedAt: Date
}

export type NewTodoParams = MakeOptional<Omit<Todo, 'id'>, 'body'>
export type NewTodoFormParams = Pick<NewTodoParams, 'title' | 'body' | 'public'>
