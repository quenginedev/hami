import { Schema as S, model as m } from 'mongoose'
export const createSchemaModel = (schema: Schema) => {
    const { props, name } = schema
    return m(name, props)
}