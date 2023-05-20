import { getRequestOptions } from "./utils/get-request-options"

export const deleteById = <T>(context: CreateRouteContext<T>) => {
    const { router, model } = context
    router.delete('/:_id', async (req, res) => {
        const { param } = getRequestOptions(req)
        const { _id } = param
        const response = await model.findByIdAndDelete(_id).exec()
        res.json(response)
    })
}