import { Application, Router } from "express"
import { Model } from "mongoose"
import { findOne } from "./find-one"
import { findMany } from "./find-many"
import { findById } from "./find-by-id"
import { createOne } from "./create-one"
import { createMany } from "./create-many"
import { deleteOne } from "./delete-one"
import { deleteMany } from "./delete-many"
import { deleteById } from "./delete-by-id"
import { updateById } from "./update-by-id"
import { updateMany } from "./update-many"
import { updateOne } from "./update-one"

type Context = {
    app: Application
}

type RouteConfig = {
    schema: Schema,
    model: Model<any>
}

const routerRouteGeneratingList = [
    createOne,
    createMany,
    deleteOne,
    deleteMany,
    deleteById,
    findById,
    findMany,
    findOne,
    updateById,
    updateOne,   
    updateMany,
]

export const createRoutes = (ctx: Context) => (cfg: RouteConfig) => {
    const { schema, model } = cfg
    const { app } = ctx
    const router = Router()
    const rtCtx = { model, router }
    routerRouteGeneratingList.forEach(r => r(rtCtx))
    app.use(`/${schema.name.toLowerCase()}`, router)
}