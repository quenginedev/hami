type Router = import('express').Router
type Application = import('express').Application
type Model<T> = import('mongoose').Model<T>
type ExpressRequest = import('express').Request<any>
type ExpressResponse = import('express').Response<any>

type PostHookPayload = {
    model: Model<any>
    action: string
    result: any
}

type PreHookParams = {
    req: ExpressRequest
    res: ExpressResponse
}

type HamiPlugin = {
    hooks: {
        [key: string]: {
            pre: (options: PreHookParams) => Req
            post: (params: Omit<PostHookPayload, 'model'> & { model: string }) => void
        }
    }
}


type CreateRouteContext<T> = {
    router: import('express').Router,
    model: import('mongoose').Model<T>,
    plugins: Array<HamiPlugin>
}

type AST = {
    type: 'String' | 'Number' | 'ObjectId' | 'Object' | 'Array' | 'Date' | string,
    items?: Array<AST>
    properties?: { [key: string]: AST }
    default?: any,
    required?: boolean,
    unique?: boolean,
    ref?: string,
}

type Context = {
    app: Application,
    compiled: Array<{
        schema: Schema,
        model: Model<any>
        ast: AST
    }>,
}