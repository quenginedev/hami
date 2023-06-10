import { Application } from "express"

import swaggerUi from "swagger-ui-express"
import { mergeAll } from 'ramda'
import { generatePathDocs } from "./generate-path-docs"
import { Compiled } from ".."

type Context = {
    app: Application,
    compiled: Compiled,
}

export const createDocs = ({ app, compiled }: Context) => {
    const docsPath = "/docs"
    const docs = mergeAll(compiled.map(generatePathDocs))
    app.use(docsPath, swaggerUi.serve, swaggerUi.setup({
        openapi: "3.0.0",
        info: { title: `API Docs`, version: "1.0.0" },
        paths: docs
    }))
}