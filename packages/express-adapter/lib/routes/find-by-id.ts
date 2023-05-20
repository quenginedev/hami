import { getRequestOptions } from "./utils/get-request-options"

export const findById = <T>(context: CreateRouteContext<T>) => {
    const { router, model } = context
    router.get('/one/:_id', async (req, res) => {
        try {
            const { param } = getRequestOptions(req)
            const { _id } = param
            const result = await model.findById(_id).exec()
            res.json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    })
}