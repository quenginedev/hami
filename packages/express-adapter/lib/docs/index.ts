import { Application } from "express"

import swaggerUi from "swagger-ui-express"
import { mergeAll } from 'ramda'
import { generatePathDocs } from "./generate-path-docs"
import { Compiled } from ".."
import { getTsTypes } from "../types"

type Context = {
    app: Application,
    compiled: Compiled,
}

const capitalize = (ref) => ref.charAt(0).toUpperCase() + ref.slice(1)

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


export const createDocs = ({ app, compiled }: Context) => {
    const docsPath = "/docs"
    const docs = mergeAll(compiled.map(generatePathDocs))
    app.use(docsPath, swaggerUi.serve, swaggerUi.setup({
        openapi: "3.0.0",
        info: { title: `API Docs`, version: "1.0.0" },
        paths: docs
    }))
    app.use('/ts-types', (_, res) => {
        const { schema, types } = compiled.reduce((acc, c) => {
            const { schema: { fields, name } } = c
            const modelName = capitalize(name)
            acc.types += '\n\n' + generateTypeScriptDefinitions(fields.obj, modelName)
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