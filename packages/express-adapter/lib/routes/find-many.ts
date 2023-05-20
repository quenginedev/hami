import { getRequestOptions } from "./utils/get-request-options"

export const findMany = <T>(context: CreateRouteContext<T>) => {
    const { router, model } = context
    router.get('/', async (req, res) => {
        const { query, skip, limit, sort } = getRequestOptions(req)
        const result = await model.find(query, {}, { skip, limit, sort }).exec()
        res.json(result)
    })
}