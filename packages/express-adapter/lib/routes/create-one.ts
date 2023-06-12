import { getRequestOptions } from "./utils/get-request-options"
import { handlePostHooks, handlePreHooks } from "../plugin/hooks"

const action = 'createOne'

export const createOne = <T>(context: CreateRouteContext<T>) => {
    const { router, model, plugins } = context
    router.post('/one', async (req, res) => {
        req = await handlePreHooks({ req, res, plugins, action })
        const { data } = getRequestOptions(req)
        const result = await model.create(data)
        res.json(result)
        return await handlePostHooks({
            payload: { action, result, model },
            plugins,
            action
        })
    })
}