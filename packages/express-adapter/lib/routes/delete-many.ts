import { getRequestOptions } from "./utils/get-request-options"

export const deleteMany = <T>(context: CreateRouteContext<T>) => {
    const { router, model } = context
    router.delete('/', async (req, res) => {
        const { query } = getRequestOptions(req)
        const response = await model.deleteMany(query).exec()
        res.json(response)
    })
}