import { Request } from "express";
import { FilterQuery, QueryOptions } from "mongoose";

const toJson = (str: any) => typeof str === 'string' ? JSON.parse(str as string || '{}') : str || {}

export const getRequestOptions = (req: Request) => {
    // TODO: there shoul be a cleaner way to make this ok
    const query: FilterQuery<any> = toJson(req.query.query)
    const options: QueryOptions = toJson(req.query.options)
    console.log('query', query)
    const param = req.params
    const data = req.body
    let { 
        skip = 0,
        limit = 0,
        sort = '{}',
    } = req.query
    
    skip = Number(skip)
    limit = Number(limit)

    return {
        query,
        skip,
        limit,
        sort,
        data,
        param,
        options
    }
}