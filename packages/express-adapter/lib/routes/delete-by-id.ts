import { handlePostHooks, handlePreHooks } from "../plugin/hooks"
import { getRequestOptions } from "./utils/get-request-options"

const action = 'deleteById'

export const deleteById = <T>(context: CreateRouteContext<T>) => {
    const { router, model, plugins } = context
    router.delete('/:_id', async (req, res) => {
        req = await handlePreHooks({ req, res, plugins, action })
        const { param } = getRequestOptions(req)
        const { _id } = param
        const result = await model.findByIdAndDelete(_id).exec()
        res.json(result)
        return await handlePostHooks({
            payload: { action, result, model },
            plugins,
            action
        })
    })
}