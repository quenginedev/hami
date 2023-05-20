import { handleRequest } from '../utils/handle-request';
import { ModelDoc } from '..';
type Options<T, M extends keyof T> = {
    param?: {_id: string},
}

export type FindByIdType<T> = ModelDoc<T> | null

export const findById = <T, M extends keyof T>(context: Context<M>) => async (options: Options<T, M> = {}) => {
    const { http, model } = context
    const { param: {_id} } = options
    return handleRequest<FindByIdType<T[M]>>(http.get(`/${String(model)}/${_id}`))
}