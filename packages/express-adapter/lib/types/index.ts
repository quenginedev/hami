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

const mongooseType = {
    ObjectId: 'ObjectId',
    String: 'String',
    Number: 'Number',
    Boolean: 'Boolean',
    Date: 'Date',
    Object: 'Object',
    Buffer: 'Buffer',
    Array: 'Array'
}

const tsTypes = {
    [mongooseType.ObjectId]: 'string',
    [mongooseType.String]: 'string',
    [mongooseType.Number]: 'number',
    [mongooseType.Boolean]: 'boolean',
    [mongooseType.Date]: 'Date',
    [mongooseType.Object]: 'object',
    [mongooseType.Buffer]: 'buffer',
}
export const getTsTypes = prop => tsTypes[prop]
export const capitalize = (ref) => ref.charAt(0).toUpperCase() + ref.slice(1)


const generateTypeScriptDefinitions = (ast: AST, tab = 1) => {
    const typeName = ast.type
    const props = ast.properties
    const isNested = Object.keys(tsTypes).includes(typeName)
    let tsDefinitions = isNested ? '{\n' : `type ${typeName} = {\n`
    const tb = Array.from({ length: tab }).fill('\t').join('')
    for (const key in props) {
        const prop = props[key]
        if (prop.type === mongooseType.ObjectId) {
            tsDefinitions += `${tb}${key}: ${capitalize(prop.ref)} | string\n`
        } else if (prop.type === mongooseType.Array) {
            tsDefinitions += `${tb}${key}: ${getType(prop.items[0].type)}[]\n`
        } else if (prop.type === mongooseType.Object) {
            tsDefinitions += `${tb}${key}: ${generateTypeScriptDefinitions(prop, tab + 1)}`
        } else {
            tsDefinitions += `${tb}${key}: ${getType(prop.type)}\n`
        }
    }

    tsDefinitions += `${Array.from({ length: tab - 1 }).fill('\t').join('')}}\n`
    return tsDefinitions
}

const getType = (type: string) => {
    return tsTypes[type] || 'unknown'
}

export const createTypesGenRoute = ({ app, compiled }: Context) => {
    app.use('/ts-types', (_, res) => {
        const { schema, types } = compiled.reduce((acc, c) => {
            const { schema: { name }, ast } = c
            const typeName = ast.type
            acc.types += '\n\n' + generateTypeScriptDefinitions(ast)
            acc.types += `\ntype ${typeName}Doc = ${typeName} & DocType`
            acc.schema += `\n  ${name}: ${typeName}`
            return acc
        }, {
            types: 'type DocType = { _id: string, createdAt: Date, updatedAt: Date }',
            schema: '\n\ntype MySchema = {'
        })
        const modelSchema = types + schema + '\n} \n\ntype ModelType<T extends keyof MySchema> = MySchema[T]'
        res.send(modelSchema)
    })
}