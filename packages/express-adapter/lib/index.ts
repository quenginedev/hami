import type { Application } from 'express'
import { createSchemaModel } from './models/create-schema-models'
import { createRoutes } from './routes'
import { createDocs } from './docs'
import { generatePathDocs } from './docs/generate-path-docs'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

export const createHami = (app: Application) => (schema: Schema[]) => {
    app.use(bodyParser.json())
    const docs = schema.map(s => {
        const model = createSchemaModel(s)
        createRoutes({app})({ schema: s, model })
        return generatePathDocs({ schema: s, model })
    })
    createDocs({ app, docsList: docs })
    return app
}

export const Schema = (props: mongoose.SchemaDefinition) => new mongoose.Schema(props, {
    timestamps: true
})
export const ID =  mongoose.Schema.Types.ObjectId
export default createHami