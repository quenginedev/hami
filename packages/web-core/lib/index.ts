import axios, { AxiosInstance } from 'axios'
import { createOne } from './routes/create-one'
import { findMany } from './routes/find-many'
import { findOne } from './routes/find-one'
import { findById } from './routes/find-by-id'

export type { FindManyType } from './routes/find-many'

type CreateClientOptions<T> = { 
    endpoint: string,
    models: Array<keyof T>
}

export type ModelDoc<T> = T & { createdAt: string, updatedAt: string, _id: string }

export const createClient = <T>(option: CreateClientOptions<T>) => {
    const { endpoint, models } = option
    const http = axios.create({ baseURL: endpoint })

    return models.reduce((acc, model) => {
        const ctx = { http, model } as { http: AxiosInstance, model: keyof T }
        acc[model] = createOperations<T, keyof T>(ctx)
        return acc
    }, {} as {[key in keyof T]: ReturnType<typeof createOperations<T, keyof T>>})
}

const createOperations = <T, M extends keyof T>(ctx: Context<M>) => {
    return {
        createOne: createOne<T, M>(ctx),
        findMany: findMany<T, M>(ctx),
        findOne: findOne<T, M>(ctx),
        findById: findById<T, M>(ctx),
    }
}