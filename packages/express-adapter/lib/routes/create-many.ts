import { handlePostHooks, handlePreHooks } from './../plugin/hooks/index';
import { getRequestOptions } from "./utils/get-request-options"

const action = 'createMany'

export const createMany = <T>(context: CreateRouteContext<T>) => {
    const { router, model, plugins } = context
    router.post('/', async (req, res) => {
        req = await handlePreHooks({ req, res, plugins, action })
        const { data } = getRequestOptions(req)
        const result = await model.insertMany(data)
        res.json(result)
        return await handlePostHooks({
            payload: { action, model, result },
            action,
            plugins
        })
    })
}