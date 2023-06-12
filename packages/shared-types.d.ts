type SchemaDefinitionProperty = import('mongoose').Schema
type Req = import('express').Request

type HookParams = {
    model: string
    action: string
    data: any
}

type Plugins = Array<{
    hooks: {
        [key: string]: {
            pre: (req: Req) => Req
            post: (params: HookParams) => void
        }
    }
}>

type Schema = {
    name: string
    props: SchemaDefinitionProperty
}

type Field = import('mongoose').SchemaDefinition