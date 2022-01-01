type Resource<T> = T extends `${infer U}/${infer S}` ? U | Resource<S> : T
type Dynamic<T> = T extends `[${infer U}]` ? U : never

type Param<T extends string> = Dynamic<Resource<T>>
export type Params<T extends string> = Param<T> extends never
  ? {}
  : {
      [K in Param<T>]: string | number
    }

export const getPath = <T extends string, P = Params<T>>(
  route: T,
  params: P
) => {
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
}
