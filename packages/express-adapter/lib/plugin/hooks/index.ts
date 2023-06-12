import { Request } from "express"

type PreHookParams = {
    req: ExpressRequest
    res: ExpressResponse
    plugins: Array<HamiPlugin>
    action: string
}

type PostHookParams = {
    payload: PostHookPayload
    plugins: Array<HamiPlugin>
    action: string
}

export const handlePreHooks = async ({ req, res, action, plugins }: PreHookParams) => {
    for (let { hooks } of plugins) {
        const { pre } = hooks[action] || {}
        req = pre ? await pre({ req, res }) : req
    }
    return req
}

export const handlePostHooks = async ({ payload, plugins, action }: PostHookParams) => {
    await Promise.all(plugins.map(async ({ hooks }) => {
        const { post } = hooks[action] || {}
        const response = {
            ...payload,
            model: payload.model.modelName
        }
        post && post(response)
    }))
}

