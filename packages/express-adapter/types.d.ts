

type Router = import('express').Router
type Application = import('express').Application
type Model<T> = import('mongoose').Model<T>

type CreateRouteContext<T> = {
    router: import('express').Router,
    model: import('mongoose').Model<T>
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