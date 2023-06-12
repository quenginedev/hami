import { handlePostHooks, handlePreHooks } from "../plugin/hooks"
import { getRequestOptions } from "./utils/get-request-options"

const action = 'updateById'

export const updateById = <T>(context: CreateRouteContext<T>) => {
    const { router, model, plugins } = context
    router.put('/:_id', async (req, res) => {
        req = await handlePreHooks({ req, res, plugins, action })
        const { param, data, options } = getRequestOptions(req)
        const { _id } = param
        const result = await model.findByIdAndUpdate(_id, data, options).exec()
        res.json(result)
        return await handlePostHooks({
            payload: { action, result, model },
            plugins,
            action
        })
    })
}