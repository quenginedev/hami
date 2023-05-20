import { getRequestOptions } from "./utils/get-request-options"

export const deleteOne = <T>(context: CreateRouteContext<T>) => {
    const { router, model } = context
    router.delete('/one', async (req, res) => {
        const { query } = getRequestOptions(req)
        const response = await model.deleteOne(query).exec()
        res.json(response)
    })
}