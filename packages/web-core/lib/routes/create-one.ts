import { ModelDoc } from './../index';
import { handleRequest } from "../utils/handle-request"

type Options<T> = { body: T }

export const createOne = <S, M extends keyof S = keyof S>(context: Context<M>) => async (options: Options<S[M]>) => {
    const { http, model } = context
    const { body } = options
    return handleRequest<ModelDoc<S[M]>>(http.post(`/${String(model)}/one`, body))
}