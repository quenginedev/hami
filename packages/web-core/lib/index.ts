import axios from 'axios'
import { updateMany } from './routes/update-many';
import { updateOne } from './routes/update-one';
import { updateById } from './routes/upadte-by-id';
import { createOne } from './routes/create-one'
import { findMany } from './routes/find-many'
import { findOne } from './routes/find-one'
import { findById } from './routes/find-by-id'
import { createMany } from './routes/create-many'

export type { FindManyType } from './routes/find-many'

type CreateClientOptions<M> = {
    endpoint: string,
    models: Array<M>
}

export type ModelDoc<T> = T & { createdAt: Date, updatedAt: Date, _id: string }

export const createClient = <S, M extends keyof S = keyof S>(option: CreateClientOptions<M>) => {
    const { endpoint, models } = option
    const http = axios.create({ baseURL: endpoint })
    return models.reduce((acc, model) => {
        const ctx = { http, model }
        acc[model] = createOperations(ctx)
        return acc
    }, {} as { [key in M]: ReturnType<typeof createOperations<S, key>> })
}

const createOperations = <S, M extends keyof S>(ctx: Context<M>) => {
    return {
        createMany: createMany<S, M>(ctx),
        createOne: createOne<S, M>(ctx),
        findById: findById<S, M>(ctx),
        findMany: findMany<S, M>(ctx),
        findOne: findOne<S, M>(ctx),
        updateById: updateById<S, M>(ctx),
        updateMany: updateMany<S, M>(ctx),
        updateOne: updateOne<S, M>(ctx),
    }
}