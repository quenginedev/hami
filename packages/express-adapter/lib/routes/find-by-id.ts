import { handlePostHooks, handlePreHooks } from "../plugin/hooks"
import { getRequestOptions } from "./utils/get-request-options"

const action = 'findById'

export const findById = <T>(context: CreateRouteContext<T>) => {
    const { router, model, plugins } = context
    router.get('/one/:_id', async (req, res) => {
        try {
            req = await handlePreHooks({ req, res, plugins, action })
            const { param } = getRequestOptions(req)
            const { _id } = param
            const result = await model.findById(_id).exec()
            res.json(result)
            return await handlePostHooks({
                payload: { action, result, model },
                plugins,
                action
            })
        } catch (error) {
            res.status(500).json(error)
            return
        }
    })
}