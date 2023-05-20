import { ModelDoc } from './../index';
import { handleRequest } from "../utils/handle-request"

type Options<T> = { body: T }

export const createOne = <T, M extends keyof T>(context: Context<M>) => async (options: Options<T[M]>) => {
    const { http, model } = context
    const { body } = options
    return handleRequest<ModelDoc<T[M]>>(http.post(`/${String(model)}/one`, body))
}