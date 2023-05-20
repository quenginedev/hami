import { Schema as S, model as m } from 'mongoose'
export const createSchemaModel = (schema: Schema) => {
    const { fields, name } = schema
    return m(name, fields)
}