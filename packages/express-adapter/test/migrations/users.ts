import mongoose, { model } from 'mongoose'
import axios, { AxiosResponse } from 'axios'
import { schema } from '../schema'
import { writeFile } from 'fs/promises'
import { resolve } from 'path'

(async () => {
    const URI = 'mongodb://127.0.0.1:27017/jsonplaceholder' as const
    await mongoose.connect(URI)
    console.log('fetching payload')
    const users= await axios.get<any, AxiosResponse<{id: string}[]>>('https://jsonplaceholder.typicode.com/users')

    const userIdMapper = {}
    const userSchema = schema[0].fields
    const userModel = model('user', userSchema)

    console.log('creating users')
    for (let { id, ...rest } of users.data) {
        console.log(id)
        const userRes = await userModel.create(rest)
        userIdMapper[id] = userRes._id
    }
    console.log('creating file')
    await writeFile(resolve(process.cwd(), './test/data/user-id-mapper.json'), JSON.stringify(userIdMapper))
    console.log('done')
})()