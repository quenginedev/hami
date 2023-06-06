import { FilterQuery } from 'mongoose';
import { handleRequest } from '../utils/handle-request';
import { ModelDoc } from '..';

type Options<T> = {
    query: FilterQuery<ModelDoc<T>>,
    body: Partial<T>
}

export type UpdateManyType<T> = Array<ModelDoc<T>>

export const updateMany = <S, M extends keyof S>(context: Context<M>) => async (options: Options<S[M]>) => {
    const { http, model } = context
    const { query, body } = options
    return handleRequest<UpdateManyType<S[M]>>(http.request({
        url: `/${String(model)}`,
        method: 'PUT',
        params: { query },
        data: body
    }))
}