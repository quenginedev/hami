import { handlePostHooks, handlePreHooks } from "../plugin/hooks"
import { getRequestOptions } from "./utils/get-request-options"

const action = 'deleteMany'

export const deleteOne = <T>(context: CreateRouteContext<T>) => {
    const { router, model, plugins } = context
    router.delete('/one', async (req, res) => {
        try {
            req = await handlePreHooks({ req, res, plugins, action })
            const { query } = getRequestOptions(req)
            const result = await model.deleteOne(query).exec()
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