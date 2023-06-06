import { FilterQuery } from 'mongoose';
import { handleRequest } from '../utils/handle-request';
import { ModelDoc } from '..';

type Options<T> = {
    query: FilterQuery<ModelDoc<T>>,
    body: Partial<T>
}

export type UpdateOneType<T> = ModelDoc<T> | null

export const updateOne = <S, M extends keyof S>(context: Context<M>) => async (options: Options<S[M]>) => {
    const { http, model } = context
    const { query, body } = options
    return handleRequest<UpdateOneType<S[M]>>(http.request({
        url: `/${String(model)}/one`,
        method: 'PUT',
        params: { query },
        data: body
    }))
}