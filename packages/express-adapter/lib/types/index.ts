import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId
export const useMongooseTypes = () => ({
    ObjectId,
    String,
    Number,
    Boolean,
    Date,
    Object,
    Array,
    Buffer,
})
const tsTypes = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Date: 'Date',
    Object: 'object',
    Buffer: 'buffer'
}
export const getTsTypes = prop => tsTypes[prop]
export const capitalize = (ref) => ref.charAt(0).toUpperCase() + ref.slice(1)


const generateTypeScriptDefinitions = (schemaData, modelName, tab = 0) => {
    const isNested = modelName !== 'NestedType'
    let tsDefinitions = isNested ? `type ${modelName} = {\n` : '{\n'
    const tb = Array.from({ length: tab }, () => '\t')
    for (const key in schemaData) {
        if (schemaData.hasOwnProperty(key)) {
            const type = getTypeScriptType(schemaData[key], tab)
            tsDefinitions += `${tb}  ${key}: ${type}\n`
        }
    }
    tsDefinitions += `${tb}} \n`


    return tsDefinitions
}

const getTypeScriptType = (field, tab) => {
    if (typeof field === 'function') {
        return getTsTypes(field.name)
    }
    if (typeof field === 'object' && field !== null) {
        if (Array.isArray(field)) {
            const arrayType = getTypeScriptType(field[0], tab)
            return `${arrayType}[]`
        }
        if (field.ref) {
            return capitalize(field.ref)
        }
        else {
            return generateTypeScriptDefinitions(field, 'NestedType', tab + 1)
        }
    }
    return 'any'
}

export const createTypes = ({ app, compiled }: Context) => {
    app.use('/ts-types', (_, res) => {
        const { schema, types } = compiled.reduce((acc, c) => {
            const { schema: { props, name }, ast } = c
            const modelName = capitalize(name)
            acc.types += '\n\n' + generateTypeScriptDefinitions(props.obj, modelName)
            acc.types += `\ntype ${modelName}Doc = ${modelName} & DocType`
            acc.schema += `\n  ${name}: ${modelName}`
            return acc
        }, {
            types: 'type DocType = { _id: string, createdAt: Date, updatedAt: Date }',
            schema: '\n\ntype MySchema = {'
        })
        const modelSchema = types + schema + '\n} \n\ntype ModelType<T extends keyof MySchema> = MySchema[T]'
        res.send(modelSchema)
    })
}