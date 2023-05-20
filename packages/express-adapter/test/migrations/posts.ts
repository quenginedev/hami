import mongoose, { model } from 'mongoose'
import axios, { AxiosResponse } from 'axios'
import { schema } from '../schema'
import { writeFile, readFile } from 'fs/promises'
import { resolve } from 'path'

(async () => {
    const URI = 'mongodb://127.0.0.1:27017/jsonplaceholder' as const
    await mongoose.connect(URI)
    console.log('fetching payload')
    const userIdMapper = await readFile(
        resolve(process.cwd(), './test/data/user-id-mapper.json'), 
        {encoding: 'utf-8'}
    ).then(JSON.parse)
    const posts= await axios.get('https://jsonplaceholder.typicode.com/posts')

    const postSchema = schema[1].fields
    const postModel = model('post', postSchema)

    console.log('creating posts')
    for (let { userId, ...rest } of posts.data) {
        const user = userIdMapper[userId]
        await postModel.create({...rest, user})
    }
    console.log('done')
})()