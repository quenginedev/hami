import { handlePostHooks, handlePreHooks } from "../plugin/hooks"
import { getRequestOptions } from "./utils/get-request-options"

const action = 'findOne'

export const findOne = <T>(context: CreateRouteContext<T>) => {
    const { router, model, plugins } = context
    router.get('/one', async (req, res) => {
        try {
            req = await handlePreHooks({ req, res, plugins, action })
            const { query, skip } = getRequestOptions(req)
            console.log('query', query)
            const result = await model.findOne(query, {}, { skip }).exec()
            res.json(result)
            return await handlePostHooks({
                payload: { action, result, model },
                plugins,
                action
            })
        } catch (error) {
            res.status(500).json(error)
        }
    })
}