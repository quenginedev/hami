import { FilterQuery } from 'mongoose';
import { handleRequest } from '../utils/handle-request';
import { ModelDoc } from '..';
type Options<T> = {
    query?: FilterQuery<T>,
}

export type FindOneType<T> = ModelDoc<T> | null

export const findOne = <T, M>(context: Context<M>) => async (options: Options<T> = {}) => {
    const { http, model } = context
    const { query } = options

    return handleRequest<FindOneType<T>>(http.get(`/${String(model)}/one`, {
        params: { query }
    }))
}