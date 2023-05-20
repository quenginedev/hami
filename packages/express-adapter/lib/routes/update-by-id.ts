import { getRequestOptions } from "./utils/get-request-options"

export const updateById = <T>(context: CreateRouteContext<T>) => {
    const { router, model } = context
    router.put('/:_id', async (req, res) => {
        const { param, data, options } = getRequestOptions(req)
        const { _id } = param
        const response = await model.findByIdAndUpdate(_id, data, options).exec()
        res.json(response)
    })
}