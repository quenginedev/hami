import type { Application } from 'express'
import { createSchemaModel } from './models/create-schema-models'
import { createRoutes } from './routes'
import { createDocs } from './docs'
import bodyParser from 'body-parser'
import mongoose, { type Model } from 'mongoose'
import { schemaToAST } from './utils/schema2Ast'
import { createTypesGenRoute } from './types'

export type Compiled = Array<{
    schema: Schema,
    model: Model<any>
    ast: ReturnType<typeof schemaToAST>
}>

export const createHami = (app: Application) => (schema: Schema[]) => {
    app.use(bodyParser.json())
    const compiled = schema.map(s => {
        const model = createSchemaModel(s)
        const ast = schemaToAST(model)
        return { schema: s, model, ast }
    })
    createRoutes({ app, compiled })
    createDocs({ app, compiled })
    createTypesGenRoute({ app, compiled })
    return app
}

export const Props = (props: mongoose.SchemaDefinition) => new mongoose.Schema(props, {
    timestamps: true
})

export const ID = mongoose.Types.ObjectId
export default createHami