import { FilterQuery } from 'mongoose';
import { handleRequest } from '../utils/handle-request';
import { ModelDoc } from '..';
type Options<T, M extends keyof T> = {
    query?: FilterQuery<T[M]>,
    limit?: number,
    sort?: any
}

export type FindManyType<T> = Array<ModelDoc<T>>

export const findMany = <T, M extends keyof T>(context: Context<M>) => async (options: Options<T, M> = {}) => {
    const { http, model } = context
    const { query, limit, sort } = options
    
    return handleRequest<FindManyType<T[M]>>(http.get(`/${String(model)}`, {
        params: { query, sort, limit }
    }))
}