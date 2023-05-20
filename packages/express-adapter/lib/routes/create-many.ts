import { getRequestOptions } from "./utils/get-request-options"

export const createMany = <T>(context: CreateRouteContext<T>) => {
    const { router, model } = context
    router.post('/', async (req, res) => {
        const { data } = getRequestOptions(req)
        const result = await model.insertMany(data)
        res.json(result)
    })
}