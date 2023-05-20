import { Application } from "express";
import { Model } from "mongoose";

import swaggerUi from "swagger-ui-express";
import { mergeAll } from 'ramda'

type Context = {
    app: Application,
    docsList: any[],
}

export const createDocs = ({ app, docsList }: Context) => {
    const docsPath = "/docs"
    const docs = mergeAll(docsList)
    app.use(docsPath, swaggerUi.serve, swaggerUi.setup({
        openapi: "3.0.0",
        info: {
            title: `API Docs`,
            version: "1.0.0",
        },
        paths: docs
    }))
}