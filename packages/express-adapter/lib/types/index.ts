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
const tsTypes = {
    String: 'string',
    Number: 'number',
    Boolean: 'boolean',
    Date: 'Date',
    Object: 'object',
    Buffer: 'buffer'
}
export const getTsTypes = prop => tsTypes[prop]