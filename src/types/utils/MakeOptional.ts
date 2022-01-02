export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [key in K]?: T[key] | null
}
