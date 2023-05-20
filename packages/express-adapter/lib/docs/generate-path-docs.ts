import { Model } from "mongoose";
import m2s from "mongoose-to-swagger";
import { compose, dissocPath } from "ramda";

type GeneratePathDocs = {
    schema: Schema,
    model: Model<any>
}

export const generatePathDocs = ({model, schema}: GeneratePathDocs) => {
    const existingRecord = m2s(model);
    const newRecord =  compose(
        dissocPath(['properties', '_id']),
        dissocPath(['properties', '__v']),
        dissocPath(['properties', 'createdAt']),
        dissocPath(['properties', 'updatedAt']),
    )(existingRecord)
    const queryQuery = {
        in: "query",
        name: "query",
        description: `Get ${schema.name} using mongodb query`,
        required: false,
        type: "object",
        schema: {
            type: "object",
            properties: {
                query: existingRecord,
            }
        }
    }
    const queryPopulate = {
        in: "query",
        name: "populate",
        description: `Get opulate ${schema.name} relations using mongodb populate`,
        required: false,
        type: "string",
    }
    const querySort = {
        in: "query",
        name: "sort",
        description: `Get ${schema.name} using mongodb sort`,
        required: false,
        type: "object",
    }
    const queryLimit = {
        in: "query",
        name: "limit",
        description: `Get ${schema.name} using mongodb limit`,
        required: false,
        type: "number",
    }
    const bodyMany = {
        in: "body",
        name: "body",
        description: `Create ${schema.name}`,
        required: true,
        content: {
            [`application/json`]: {
                schema: {
                    type: "array",
                    items: newRecord,
                },
            }
        }
    }
    const bodyOne = {
        in: "body",
        name: "body",
        description: `Create ${schema.name}`,
        required: true,
        content: {
            [`application/json`]: {
                schema: newRecord,
            }
        }
    }
    const pathId = {
        in: "path",
        name: "id",
        description: `Get ${schema.name} using mongodb query`,
        required: true,
        type: "string",
    }
    return { 
        //Many
        [`/${schema.name}`] : {
            get: {
                tags: [schema.name],
                summary: `Get many ${schema.name}`,
                description: `Get ${schema.name}`,
                produces: ["application/json"],
                parameters: [
                    queryQuery,
                    queryPopulate,
                    querySort,
                    queryLimit,
                ],
                responses: {
                    200: {
                        description: `Get ${schema.name}`,
                        schema: {
                            type: "array",
                            items: existingRecord,
                        },
                    },
                },
            },
            post: {
                tags: [schema.name],
                summary: `Create ${schema.name}`,
                description: `Create ${schema.name}`,
                produces: ["application/json"],
                requestBody: bodyMany,
                responses: {
                    200: {
                        description: `Create ${schema.name}`,
                        schema: existingRecord,
                    },
                },
            },
            put: {
                tags: [schema.name],
                summary: `Update ${schema.name}`,
                description: `Update ${schema.name}`,
                produces: ["application/json"],
                requestBody: bodyOne,
                parameters: [
                    queryQuery,
                ],
                responses: {
                    200: {
                        description: `Update ${schema.name}`,
                        schema: existingRecord,
                    },
                },
                
            },
            delete: {
                tags: [schema.name],
                summary: `Delete ${schema.name}`,
                description: `Delete ${schema.name}`,
                produces: ["application/json"],
                parameters: [
                    queryQuery,
                ],
                responses: {
                    200: {
                        description: `Delete ${schema.name}`,
                        schema: existingRecord,
                    },
                },
            }
        },
        //One
        [`/${schema.name}/one`]: {
            get: {
                tags: [schema.name],
                summary: `Get ${schema.name} by id`,
                description: `Get ${schema.name} by id`,
                produces: ["application/json"],
                parameters: [
                    queryQuery,
                    queryPopulate,
                ],
                responses: {
                    200: {
                        description: `Get ${schema.name} by id`,
                        schema: existingRecord,
                    },
                },
            },
            post: {
                tags: [schema.name],
                summary: `Create ${schema.name}`,
                description: `Create ${schema.name}`,
                produces: ["application/json"],
                requestBody: bodyOne,
                responses: {
                    200: {
                        description: `Create ${schema.name}`,
                        schema: existingRecord,
                    }
                }
            },
            put: {
                tags: [schema.name],
                summary: `Update ${schema.name} by id`,
                description: `Update ${schema.name} by id`,
                produces: ["application/json"],
                requestBody: bodyOne,
                parameters: [
                    queryQuery
                ],
                responses: {
                    200: {
                        description: `Update ${schema.name} by id`,
                        schema: existingRecord,
                    },
                },
            },
            delete: {
                tags: [schema.name],
                summary: `Delete ${schema.name} by id`,
                description: `Delete ${schema.name} by id`,
                produces: ["application/json"],
                parameters: [
                    queryQuery
                ],
                responses: {
                    200: {
                        description: `Delete ${schema.name} by id`,
                        schema: existingRecord,
                    },
                },
            },
        },
        //ID
        [`/${schema.name}/one/{id}`]: {
            get: {
                tags: [schema.name],
                summary: `Get ${schema.name} by id`,
                description: `Get ${schema.name} by id`,
                produces: ["application/json"],
                parameters: [
                    pathId
                ],
                responses: {
                    200: {
                        description: `Get ${schema.name} by id`,
                        schema: existingRecord,
                    },
                },
            },
            put: {
                tags: [schema.name],
                summary: `Update ${schema.name} by id`,
                description: `Update ${schema.name} by id`,
                produces: ["application/json"],
                parameters: [
                    pathId,
                    bodyOne,
                ],
                responses: {
                    200: {
                        description: `Update ${schema.name} by id`,
                        schema: existingRecord,
                    },
                },
            },
            delete: {
                tags: [schema.name],
                summary: `Delete ${schema.name} by id`,
                description: `Delete ${schema.name} by id`,
                produces: ["application/json"],
                parameters: [
                    pathId,
                ],
                responses: {
                    200: {
                        description: `Delete ${schema.name} by id`,
                        schema: existingRecord,
                    },
                },
            },
        },
    }
}