import { ModelDoc } from './../index';
import { handleRequest } from "../utils/handle-request"

type Options<T> = { body: Array<T> }
type CreateManyType<T> = ModelDoc<Array<T>>

export const createMany = <S, M extends keyof S>(context: Context<M>) => async (options: Options<S[M]>) => {
    const { http, model } = context
    const { body } = options
    return handleRequest<CreateManyType<S[M]>>(http.post(`/${String(model)}`, body))
}