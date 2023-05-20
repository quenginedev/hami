import { Schema } from 'mongoose'
const ObjectId = Schema.Types.ObjectId
export const useMongooseTypes =  () => ({
    ObjectId,
    String,
    Number,
    Boolean,
    Date,
    Object,
    Array,
    Buffer,
})