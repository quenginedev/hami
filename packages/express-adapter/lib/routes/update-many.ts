import { getRequestOptions } from "./utils/get-request-options"

export const updateMany = <T>(context: CreateRouteContext<T>) => {
    const { router, model } = context
    router.put('/', async (req, res) => {
        const { query, data, options } = getRequestOptions(req)
        const response = await model.updateMany(query, data, options).exec()
        res.json(response)
    })
}