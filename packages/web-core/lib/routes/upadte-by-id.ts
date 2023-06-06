import { handleRequest } from '../utils/handle-request';
import { ModelDoc } from '..';

type Options<T> = {
    param: { _id: string },
    body: Partial<T>
}

export type UpdateByIdType<T> = ModelDoc<T> | null

export const updateById = <S, M extends keyof S>(context: Context<M>) => async (options: Options<S[M]>) => {
    const { http, model } = context
    const { param: { _id }, body } = options
    return handleRequest<UpdateByIdType<S[M]>>(http.request({
        url: `/${String(model)}/one/${_id}`,
        method: 'PUT',
        data: body
    }))
}