import { createClient } from '../../../lib'

export type ModelType<T extends keyof MySchema> = MySchema[T]

export const useHami = () => {
    const client = createClient<MySchema>({
        endpoint: 'http://localhost:3000',
        models: ['user', 'album', 'chris', 'post']
    })
    return client
}