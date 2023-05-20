import { getRequestOptions } from "./utils/get-request-options"

export const updateOne = <T>(context: CreateRouteContext<T>) => {
    const { router, model } = context
    router.put('/one', async (req, res) => {
        const { query, data, options } = getRequestOptions(req)
        const response = await model.updateOne(query, data, options).exec()
        res.json(response)
    })
}