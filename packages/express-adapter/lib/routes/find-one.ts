import { getRequestOptions } from "./utils/get-request-options"

export const findOne = <T>(context: CreateRouteContext<T>) => {
    const { router, model } = context
    router.get('/one', async (req, res) => {
        try {
            const { query, skip } = getRequestOptions(req)
            console.log('query', query)
            const result = await model.findOne(query, {}, { skip }).exec()
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    })
}