import { FilterQuery } from 'mongoose';
import { handleRequest } from '../utils/handle-request';
import { ModelDoc } from '..';

type Options<T> = {
    query: FilterQuery<ModelDoc<T>>,
    body: Partial<T>
}

export type UpdateByIdType<T> = ModelDoc<T> | null

export const updateById = <S, M extends keyof S>(context: Context<M>) => async (options: Options<S[M]>) => {
    const { http, model } = context
    const { query, body } = options
    return handleRequest<UpdateByIdType<S[M]>>(http.request({
        url: `/${String(model)}/one`,
        method: 'PUT',
        params: { query },
        data: body
    }))
}