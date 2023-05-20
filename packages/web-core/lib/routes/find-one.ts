import { FilterQuery } from 'mongoose';
import { handleRequest } from '../utils/handle-request';
import { ModelDoc } from '..';
type Options<T, M extends keyof T> = {
    query?: FilterQuery<T[M]>,
}

export type FindOneType<T> = ModelDoc<T> | null

export const findOne = <T, M extends keyof T>(context: Context<M>) => async (options: Options<T, M> = {}) => {
    const { http, model } = context
    const { query } = options
    
    return handleRequest<FindOneType<T[M]>>(http.get(`/${String(model)}`, {
        params: { query }
    }))
}