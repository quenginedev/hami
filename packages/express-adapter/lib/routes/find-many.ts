import { handlePostHooks, handlePreHooks } from "../plugin/hooks"
import { getRequestOptions } from "./utils/get-request-options"

const action = 'findMany'

export const findMany = <T>(context: CreateRouteContext<T>) => {
    const { router, model, plugins } = context
    router.get('/', async (req, res) => {
        req = await handlePreHooks({ req, res, plugins, action })
        const { query, skip, limit, sort } = getRequestOptions(req)
        const result = await model.find(query, {}, { skip, limit, sort }).exec()
        res.json(result)
        return await handlePostHooks({
            payload: { action, result, model },
            plugins,
            action
        })
    })
}