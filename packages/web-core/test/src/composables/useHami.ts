import { createClient } from '../../../lib'
export type { ModelDoc } from '../../../lib'

type MySchema = {
    user: {
        name: string,
        email: string,
        username: string,
        phone: string
        address: {
            street: string
            city: string
            zipCode: string
        }
    }
}

export type ModelType<T extends keyof MySchema> = MySchema[T]

export const useHami = () => {
    const client = createClient<MySchema>({
        endpoint: 'http://localhost:3000',
        models: ['user']
    })
    return client
}