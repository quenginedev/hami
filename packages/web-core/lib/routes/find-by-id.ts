import { handleRequest } from '../utils/handle-request';
import { ModelDoc } from '..';
type Options = {
    param: { _id: string },
}

export type FindByIdType<T> = ModelDoc<T> | null

export const findById = <S, M extends keyof S>(context: Context<M>) => async (options: Options) => {
    const { http, model } = context
    const { param: { _id } } = options
    return handleRequest<FindByIdType<S[M]>>(http.get(`/${String(model)}/one/${_id}`))
}