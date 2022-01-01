import useSWRV from 'swrv'
import {
  CollectionName,
  CollectionRoute,
  DocumentRoute,
} from '@/libs/firebase/db'
import { Params, getPath } from '@/libs/firebase/path'
import { fetcherFn, IConfig } from 'swrv/dist/types'

type Route = CollectionRoute | CollectionName | DocumentRoute

type FetchKey<K extends string, P extends Params<K>> = {
  route: K
} & ({} extends P ? { params?: P } : { params: Partial<P> })

export const getFetchKey = <T extends string, P = Params<T>>(
  route: T,
  params?: Partial<P>
) => {
  if (!params) return route
  const isParamsExist = (Object.keys(params) as (keyof typeof params)[]).every(
    (key) => !!params[key]
  )
  if (isParamsExist) {
    return route
      .split('/')
      .map((str) => {
        const match = str.match(/\[(.*?)\]/)
        if (match) {
          const key = match[0]
          const trimmed = key.substring(1, key.length - 1) as keyof P
          return params[trimmed]
        }
        return str
      })
      .join('/')
  } else {
    return null
  }
}

export const useSWR = <K extends Route, P extends Params<K>, Data>(
  key: FetchKey<K, P>,
  fetcher: fetcherFn<Data>,
  config?: IConfig<Data>
) => {
  const path = getFetchKey(key.route, key.params)
  return useSWRV(path, fetcher, config)
}
