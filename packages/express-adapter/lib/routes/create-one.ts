import { getRequestOptions } from "./utils/get-request-options"

export const createOne = <T>(context: CreateRouteContext<T>) => {
    const { router, model } = context
    router.post('/one', async (req, res) => {
        const { data } = getRequestOptions(req)
        const result = await model.create(data)
        res.json(result)
    })
}