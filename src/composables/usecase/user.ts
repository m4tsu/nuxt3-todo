import { useSWR } from '@/libs/useSWRV/useSWR'
import { userRepository } from '../repositories/user'

export const useAllUsers = () => {
  return useSWR({ route: 'users' }, userRepository.getAll)
}

//TODO: これだとconditional fetchできない
export const useUser = (docId: string) => {
  return useSWR({ route: 'users/[docId]', params: { docId } }, () =>
    userRepository.get(docId)
  )
}
