import { Props, ID } from '../../lib'

const userSchema = {
    name: 'user',
    props: Props({
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
    props: Props({
        user: { type: ID, ref: 'user' },
        title: String
    })
}

const postSchema = {
    name: 'post',
    props: Props({
        user: { type: ID, ref: 'user' },
        title: String,
        body: String
    })
}

const chrisSchema = {
    name: 'chris',
    props: Props({
        money: String,
        game: Date,
        talent: [String]
    })
}

export const schema: Schema[] = [
    userSchema,
    postSchema,
    albumSchema,
    chrisSchema
]