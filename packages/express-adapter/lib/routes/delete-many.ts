import { handlePostHooks, handlePreHooks } from "../plugin/hooks"
import { getRequestOptions } from "./utils/get-request-options"

const action = 'deleteMany'

export const deleteMany = <T>(context: CreateRouteContext<T>) => {
    const { router, model, plugins } = context
    router.delete('/', async (req, res) => {
        req = await handlePreHooks({ req, res, plugins, action })
        const { query } = getRequestOptions(req)
        const result = await model.deleteMany(query).exec()
        res.json(result)
        return await handlePostHooks({
            payload: { action, result, model },
            plugins,
            action
        })
    })
}