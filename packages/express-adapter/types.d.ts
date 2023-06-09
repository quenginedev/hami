

type Router = import('express').Router
type Application = import('express').Application
type Model<T> = import('mongoose').Model<T>

type CreateRouteContext<T> = {
    router: import('express').Router,
    model: import('mongoose').Model<T>
}

type Context = {
    app: Application,
    compiled: Array<{
        schema: Schema,
        model: Model<any>
        ast: ReturnType<typeof import('./lib/utils/schema2Ast')['schemaToAST']>
    }>,
}