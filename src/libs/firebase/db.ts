import {
  collection as fsCollection,
  collectionGroup as fsCollectionGroup,
} from 'firebase/firestore'
import { converter, firestore } from '@/libs/firebase/firestore'
import { Todo } from '@/entities/todo'
import { getPath, Params } from '@/libs/firebase/path'
import { User } from '@/entities/user'

type Collections = {
  users: User
  'users/[userId]/todos': Todo
}

export type CollectionRoute = keyof Collections

type Last<T extends string> = T extends `${string}/${infer R}` ? Last<R> : T
export type CollectionName = Last<CollectionRoute>

type AddResourceId<T extends string> = `${T}/[docId]`
export type DocumentRoute = AddResourceId<CollectionRoute>

export const collection = <
  K extends CollectionRoute,
  P extends Params<K>,
  T extends Collections[K]
>(
  collectionRoute: K,
  params: P
) => {
  const collectionPath = getPath(collectionRoute, params)
  return fsCollection(firestore, collectionPath).withConverter(converter<T>())
}

export const collectionGroup = <
  K extends CollectionRoute,
  T extends object = Collections[K]
>(
  collectionRoute: K
) => {
  const collectionName = collectionRoute.split('/').slice(-1)[0]
  return fsCollectionGroup(firestore, collectionName).withConverter(
    converter<T>()
  )
}
