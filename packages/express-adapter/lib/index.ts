import type { Application } from 'express'
import { createSchemaModel } from './models/create-schema-models'
import { createRoutes } from './routes'
import { createDocs } from './docs'
import bodyParser from 'body-parser'
import mongoose, { type Model } from 'mongoose'

export type Compiled = Array<{
    schema: Schema,
    model: Model<any>
}>

export const createHami = (app: Application) => (schema: Schema[]) => {
    app.use(bodyParser.json())
    const compiled = schema.map(s => {
        const model = createSchemaModel(s)
        return { schema: s, model }
    })
    createRoutes({app, compiled})
    createDocs({ app, compiled})
    return app
}

export const Schema = (props: mongoose.SchemaDefinition) => new mongoose.Schema(props, {
    timestamps: true
})

export const ID =  mongoose.Types.ObjectId
export default createHami