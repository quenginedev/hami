import express from 'express'
import mongoose from 'mongoose'
import { createHami } from '../lib'
import { schema } from './schema'
import cors from 'cors'
const URI = 'mongodb://127.0.0.1:27017/jsonplaceholder' as const

const startServer = async () => {
    await mongoose.connect(URI)
    const app = express()
    app.use(cors())
    const generateSchema = createHami(app)
    const hami = generateSchema(schema)
    hami.listen(3000, () => {
        console.log('server is running on port 3000')
    })
}

startServer()

