import { handlePostHooks, handlePreHooks } from "../plugin/hooks"
import { getRequestOptions } from "./utils/get-request-options"

const action = 'updateMany'

export const updateMany = <T>(context: CreateRouteContext<T>) => {
    const { router, model, plugins } = context
    router.put('/', async (req, res) => {
        req = await handlePreHooks({ req, res, plugins, action })
        const { query, data, options } = getRequestOptions(req)
        const result = await model.updateMany(query, data, options).exec()
        res.json(result)
        return await handlePostHooks({
            payload: { action, result, model },
            plugins,
            action
        })
    })
}