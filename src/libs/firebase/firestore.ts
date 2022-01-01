import {
  FirestoreDataConverter,
  getFirestore,
  QueryDocumentSnapshot,
  Timestamp,
  WithFieldValue,
} from 'firebase/firestore'
import { firebaseApp } from './firebase'

export const firestore = getFirestore(firebaseApp)

export const converter = <T extends object>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: WithFieldValue<T>) => data,
  fromFirestore: (snapshot: QueryDocumentSnapshot<T & { id: string }>) => {
    const data = snapshot.data()
    data['id'] = snapshot.id
    ;(Object.keys(data) as (keyof typeof data)[]).forEach((key) => {
      const v = data[key]
      if (v instanceof Timestamp) {
        // @ts-ignore
        data[key] = v.toDate()
      }
    })

    return data
  },
})
