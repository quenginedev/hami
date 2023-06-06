import { Schema, ID } from '../../lib'
const userSchema = {
    name: 'user',
    fields: Schema({
        name: String,
        username: String,
        email: String,
        address: {
            street: String,
            city: String,
            zipCode: String
        },
        phone: String
    })
}

const albumSchema = {
    name: 'album',
    fields: Schema({
        user: { type: ID, ref: 'user' },
        title: String
    })
}

const postSchema = {
    name: 'post',
    fields: Schema({
        user: { type: ID, ref: 'user' },
        title: String,
        body: String
    })
}

const chrisSchema = {
    name: 'chris',
    fields: Schema({
        money: String,
        game: String,
        talent: String
    })
}

export const schema: Schema[] = [
    userSchema,
    postSchema,
    albumSchema,
    chrisSchema
]